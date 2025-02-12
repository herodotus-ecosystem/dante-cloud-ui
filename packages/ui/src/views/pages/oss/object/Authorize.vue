<template>
  <h-simple-center-form-layout :title="title" :operation="operation" hide-save>
    <h-text-field
      v-model="editedItem.objectName"
      name="objectName"
      label="名称"
      readonly
    ></h-text-field>
    <h-text-field v-model="size" name="size" label="大小" readonly></h-text-field>
    <h-text-field
      v-model="lastModified"
      name="lastModified"
      label="最后修改时间"
      readonly
    ></h-text-field>
    <h-dictionary-select
      v-model="objectSetting.retentionMode"
      dictionary="retentionMode"
      label="保留模式"
    ></h-dictionary-select>
    <h-text-field
      v-if="objectSetting.retentionRetainUntilDate"
      v-model="objectSetting.retentionRetainUntilDate"
      name="retentionRetainUntilDate"
      label="保留截止时间"
      readonly
    ></h-text-field>
    <div class="column q-mb-md">
      <h-switch v-model="objectSetting.legalHold" label="Legal Hold"></h-switch>
    </div>
    <h-label text="标签：" size="subtitle-1" weight="bolder" align="left" class="q-mb-sm"></h-label>
    <h-oss-tags
      v-model="objectSetting.tags"
      :bucket-name="bucketName"
      :object-name="editedItem.objectName"
      @tag-change="refresh()"
    ></h-oss-tags>
  </h-simple-center-form-layout>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, ref } from 'vue';
import { format } from 'quasar';

import type { ObjectDomain, ObjectSettingBusiness } from '/@/lib/declarations';

import { ossApi, moment } from '/@/lib/utils';
import { useBaseTableItem } from '/@/hooks';

import { HSimpleCenterFormLayout } from '/@/components';

import { HOssTags } from '../components';

export default defineComponent({
  name: 'OssObjectAuthorize',

  components: {
    HSimpleCenterFormLayout,
    HOssTags,
  },

  setup(props) {
    const { editedItem, operation, title, additional } = useBaseTableItem<ObjectDomain>();

    const { humanStorageSize } = format;

    const bucketName = ref<string>('');
    const objectSetting = ref({}) as Ref<ObjectSettingBusiness>;

    const size = computed(() => {
      return objectSetting.value.size ? humanStorageSize(objectSetting.value.size) : 0;
    });

    const lastModified = computed(() => {
      return moment(objectSetting.value.lastModified).fromNow();
    });

    const loadObjectSetting = async () => {
      if (bucketName.value && editedItem.value.objectName) {
        const result = await ossApi
          .minioObjectSetting()
          .get(bucketName.value, editedItem.value.objectName);
        objectSetting.value = result.data;
      }
    };

    const onRetentionChange = (bucketName: string, policy: number) => {
      ossApi.minioBucketPolicy().set({ bucketName: bucketName, type: policy });
    };

    const onLegalHoldChange = (bucketName: string, objectName: string, status: boolean) => {
      if (status) {
        ossApi.minioObjectLegalHold().enable({ bucketName: bucketName, objectName: objectName });
      } else {
        ossApi.minioObjectLegalHold().disable({ bucketName: bucketName, objectName: objectName });
      }
    };

    watch(
      () => objectSetting.value.legalHold,
      (oldValue, newValue) => {
        console.log('--oldValue', oldValue);
        console.log('--newValue', newValue);
        // 避免首次加载就执行
        if (typeof newValue !== 'undefined') {
          onLegalHoldChange(bucketName.value, editedItem.value.objectName, newValue);
        }
      },
      {
        immediate: false,
      },
    );

    // watch(
    //   () => bucketSetting.value.sseConfiguration,
    //   newValue => {
    //     // 避免首次加载就执行
    //     if (typeof newValue !== 'undefined') {
    //       onSseConfigurationChange(bucketName.value, newValue);
    //     }
    //   },
    //   {
    //     immediate: false
    //   }
    // );

    const refresh = () => {
      loadObjectSetting();
    };

    onMounted(() => {
      bucketName.value = additional.value.bucketName as string;
      loadObjectSetting();
    });

    return {
      bucketName,
      objectSetting,
      size,
      lastModified,
      editedItem,
      operation,
      title,
      refresh,
    };
  },
});
</script>
