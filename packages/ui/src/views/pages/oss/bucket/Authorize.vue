<template>
  <h-simple-center-form-layout :title="title" :overlay="overlay" :operation="operation" hide-save>
    <h-divider label="概要" class="q-mb-md"></h-divider>
    <h-dictionary-select
      v-model="bucketSetting.policy"
      dictionary="Policy"
      label="访问策略"
    ></h-dictionary-select>
    <h-dictionary-select
      v-model="bucketSetting.sseConfiguration"
      dictionary="SseConfiguration"
      label="服务端加密"
    ></h-dictionary-select>
    <h-text-field
      v-model="bucketObjectLock"
      name="isObjectLock"
      label="对象锁定"
      readonly
    ></h-text-field>
    <h-text-field
      v-model="bucketQuota"
      name="bucketQuota"
      label="存储桶容量"
      readonly
    ></h-text-field>
    <h-label text="标签：" size="subtitle-1" weight="bolder" align="left" class="q-mb-sm"></h-label>
    <h-oss-tags
      v-model="bucketSetting.tags"
      :bucket-name="bucketName"
      @tag-change="refresh()"
    ></h-oss-tags>
    <h-divider label="版本控制" class="q-my-md"></h-divider>
    <h-text-field v-model="bucketVersioning" name="bucketVersioning" label="当前状态" readonly>
      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          icon="mdi-square-edit-outline"
          @click="onVersioningConfigurationChange"
        />
      </template>
    </h-text-field>
    <template v-if="isObjectLockingEnabled">
      <h-divider label="保留配置" class="q-my-md"></h-divider>
      <h-text-field v-model="bucketVersioning" name="bucketVersioning" label="当前状态" readonly>
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            icon="mdi-square-edit-outline"
            @click="openBucketRetention = true"
          />
        </template>
      </h-text-field>
      <h-text-field
        v-model="retentionMode"
        name="retentionMode"
        label="模式"
        readonly
      ></h-text-field>
      <h-text-field
        v-model="retentionValidity"
        name="retentionValidity"
        label="有效期"
        readonly
      ></h-text-field>
    </template>
    <h-oss-bucket-retention
      v-model="bucketSetting.objectLock"
      v-model:open="openBucketRetention"
      :bucket-name="bucketName"
      @confirm="onObjectLockConfigurationChange()"
    ></h-oss-bucket-retention>
  </h-simple-center-form-layout>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { format } from 'quasar';

import type { BucketDomain, BucketSettingBusiness } from '@/lib/declarations';

import { API } from '@/configurations';
import { useBaseTableItem } from '@/composables/hooks';
import { HSimpleCenterFormLayout } from '@/components';
import { HOssTags, HOssBucketRetention } from '@/composables/oss';
import { useDictionary } from '@/composables/constants';

export default defineComponent({
  name: 'OssBucketAuthorize',

  components: {
    HSimpleCenterFormLayout,
    HOssTags,
    HOssBucketRetention,
  },

  setup(props) {
    const { editedItem, operation, title, overlay } = useBaseTableItem<BucketDomain>();
    const { humanStorageSize } = format;

    const { getDictionaryItem } = useDictionary('RetentionUnit', 'RetentionMode');

    const bucketSetting = ref({}) as Ref<BucketSettingBusiness>;
    const bucketName = ref('');
    const openBucketRetention = ref<boolean>(false);

    const isObjectLockingEnabled = computed(() => {
      return bucketSetting.value && bucketSetting.value.objectLock;
    });

    const bucketObjectLock = computed(() => {
      return isObjectLockingEnabled.value ? '开启' : '关闭';
    });

    const bucketQuota = computed(() => {
      const quota = bucketSetting.value.quota;
      return quota && Number(quota) !== 0 ? humanStorageSize(quota) : '未设置';
    });

    const bucketVersioning = computed(() => {
      return bucketSetting.value &&
        bucketSetting.value.versioning &&
        bucketSetting.value.versioning.status !== 'OFF'
        ? bucketSetting.value.versioning.status
        : '未开启';
    });

    const retentionValidity = computed(() => {
      const objectLock = bucketSetting.value.objectLock;
      const retentionDuration = getDictionaryItem('RetentionUnit', String(objectLock.unit));
      return objectLock.validity + ' ' + retentionDuration.label;
    });

    const retentionMode = computed(() => {
      const objectLock = bucketSetting.value.objectLock;
      const retentionDuration = getDictionaryItem('RetentionMode', String(objectLock.mode));
      return retentionDuration.label;
    });

    const loadSettings = async () => {
      const result = await API.oss.minioBucketSetting().get(bucketName.value);
      bucketSetting.value = result.data;
    };

    const onPolicyChange = (bucketName: string, policy: number) => {
      API.oss.minioBucketPolicy().set({ bucketName: bucketName, type: policy });
    };

    const onSseConfigurationChange = (bucketName: string, sseConfiguration: number) => {
      if (sseConfiguration === 0) {
        API.oss.minioBucketEncryption().delete({ bucketName: bucketName });
      } else {
        API.oss
          .minioBucketEncryption()
          .set({ bucketName: bucketName, sseConfiguration: sseConfiguration });
      }
    };

    const onVersioningConfigurationChange = () => {
      const status = bucketSetting.value.versioning.status;
      let newStatus = '';
      switch (status) {
        case 'ENABLED':
          newStatus = 'SUSPENDED';
          break;
        default:
          newStatus = 'ENABLED';
      }

      API.oss
        .minioBucketVersioning()
        .set({ bucketName: bucketName.value, config: { status: newStatus, mfaDelete: false } });
    };

    const onObjectLockConfigurationChange = () => {
      API.oss
        .minioObjectLock()
        .set({ bucketName: bucketName.value, objectLock: bucketSetting.value.objectLock });
    };

    watch(
      () => bucketSetting.value.policy,
      (newValue) => {
        // 避免首次加载就执行
        if (typeof newValue !== 'undefined') {
          onPolicyChange(bucketName.value, newValue);
        }
      },
      {
        immediate: false,
      },
    );

    watch(
      () => bucketSetting.value.sseConfiguration,
      (newValue) => {
        // 避免首次加载就执行
        if (typeof newValue !== 'undefined') {
          onSseConfigurationChange(bucketName.value, newValue);
        }
      },
      {
        immediate: false,
      },
    );

    const refresh = () => {
      loadSettings();
    };

    onMounted(() => {
      bucketName.value = editedItem.value.bucketName;
      loadSettings();
    });

    return {
      editedItem,
      operation,
      title,
      overlay,
      bucketSetting,
      bucketObjectLock,
      bucketName,
      bucketQuota,
      bucketVersioning,
      isObjectLockingEnabled,
      refresh,
      retentionValidity,
      retentionMode,
      openBucketRetention,
      onVersioningConfigurationChange,
      onObjectLockConfigurationChange,
    };
  },
});
</script>
