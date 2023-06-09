<template>
  <h-simple-center-form-layout :title="title" :operation="operation" hide-save>
    <h-dictionary-select v-model="bucketSetting.policy" dictionary="policy" label="访问策略"></h-dictionary-select>
    <h-dictionary-select
      v-model="bucketSetting.serverSideEncryption"
      dictionary="sseConfiguration"
      label="服务端加密"></h-dictionary-select>
    <div class="column q-mb-md">
      <h-switch v-model="isObjectLock" label="是否锁定对象" disable></h-switch>
    </div>
    <h-label text="标签：" size="subtitle-1" weight="bolder" align="left" class="q-mb-sm"></h-label>
    <h-oss-tags v-model="bucketSetting.tags" :bucket-name="bucketName" @tag-change="refresh()"></h-oss-tags>
  </h-simple-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, computed } from 'vue';

import type { ConstantDictionary, BucketResponse, BucketSettingResponse } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';
import { useBaseTableItem } from '/@/hooks';
import { useConstantsStore } from '/@/stores';

import { HSimpleCenterFormLayout, HOssTags } from '/@/components';

export default defineComponent({
  name: 'OssBucketContent',

  components: {
    HSimpleCenterFormLayout,
    HOssTags
  },

  setup(props) {
    const { editedItem, operation, title, overlay, onFinish } = useBaseTableItem<BucketResponse>();

    const bucketSetting = ref({}) as Ref<BucketSettingResponse>;
    const bucketName = ref('');

    const constants = useConstantsStore();

    const isObjectLock = computed(() => {
      return bucketSetting.value && bucketSetting.value.objectLock;
    });

    const loadSettings = async () => {
      const result = await api.ossBucketSetting().get(bucketName.value);
      bucketSetting.value = result.data;
    };

    const onPolicyChange = (bucketName: string, policy: number) => {
      api.ossBucketPolicy().set({ bucketName: bucketName, type: policy });
    };

    const onServerSideEncryptionChange = (bucketName: string, serverSideEncryption: number) => {
      if (serverSideEncryption === 0) {
        api.ossBucketEncryption().delete({ bucketName: bucketName });
      } else {
        api.ossBucketEncryption().set({ bucketName: bucketName, serverSideEncryption: serverSideEncryption });
      }
    };

    watch(
      () => bucketSetting.value.policy,
      newValue => {
        // 避免首次加载就执行
        if (typeof newValue !== 'undefined') {
          onPolicyChange(bucketName.value, newValue);
        }
      }
    );

    watch(
      () => bucketSetting.value.serverSideEncryption,
      newValue => {
        // 避免首次加载就执行
        if (typeof newValue !== 'undefined') {
          onServerSideEncryptionChange(bucketName.value, newValue);
        }
      }
    );

    const refresh = () => {
      loadSettings();
    };

    onMounted(() => {
      bucketName.value = editedItem.value.name;
      loadSettings();
    });

    return {
      editedItem,
      operation,
      title,
      bucketSetting,
      isObjectLock,
      bucketName,
      refresh
    };
  }
});
</script>
