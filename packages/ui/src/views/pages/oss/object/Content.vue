<template>
  <h-detail-container :title="title">
    <h-oss-object-list v-if="isShowObjects" :bucket-name="bucketName" :folder-name="folderName"></h-oss-object-list>
  </h-detail-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { ObjectDomain } from '/@/lib/declarations';

import { useBaseTableItem } from '/@/hooks';
import { HOssObjectList } from '/@/components';
import { lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'OssObjectContent',

  components: {
    HOssObjectList
  },

  setup() {
    const { editedItem, additional } = useBaseTableItem<ObjectDomain>();

    const bucketName = ref<string>('');
    const folderName = ref<string>('');

    const isShowObjects = computed(() => {
      return bucketName.value && folderName.value;
    });

    const title = computed(() => {
      if (bucketName.value && folderName.value) {
        return bucketName.value + '/' + lodash.trimEnd(folderName.value, '/');
      } else {
        return '文件夹';
      }
    });

    onMounted(() => {
      bucketName.value = additional.value.bucketName as string;
      folderName.value = editedItem.value.objectName;
    });

    return {
      bucketName,
      folderName,
      isShowObjects,
      title
    };
  }
});
</script>
