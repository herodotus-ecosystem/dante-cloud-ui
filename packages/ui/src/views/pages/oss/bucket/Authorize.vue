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
    <h-oss-tags v-model="bucketSetting.tags"></h-oss-tags>
  </h-simple-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, computed } from 'vue';

import type { BucketResponse, BucketSettingResponse } from '/@/lib/declarations';

import { api } from '/@/lib/utils';
import { useBaseTableItem } from '/@/hooks';

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

    const isObjectLock = computed(() => {
      return bucketSetting.value && bucketSetting.value.objectLock;
    });

    const loadSettings = async () => {
      const result = await api.ossBucketSetting().get(bucketName.value);
      bucketSetting.value = result.data;
    };

    watch(
      () => bucketSetting.value.serverSideEncryption,
      newValue => {
        console.log('----', newValue);
      }
    );

    watch(
      () => bucketSetting.value.policy,
      newValue => {
        console.log('----', newValue);
      }
    );

    onMounted(() => {
      bucketName.value = editedItem.value.name;
      loadSettings();
    });

    return {
      editedItem,
      operation,
      title,
      bucketSetting,
      isObjectLock
    };
  }
});
</script>
