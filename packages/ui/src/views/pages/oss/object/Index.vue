<template>
  <q-card>
    <h-row gutter="md" gutter-col horizontal>
      <h-column lg="2" md="2" sm="6" xs="12">
        <h-oss-bucket-list v-model="bucketName" v-model:version="version"></h-oss-bucket-list>
      </h-column>
      <h-column lg="10" md="10" sm="6" xs="12">
        <h-oss-object-list
          v-if="bucketName"
          :bucket-name="bucketName"
          :version="version"
        ></h-oss-object-list>
      </h-column>
    </h-row>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { CONSTANTS } from '@/configurations';

import { HOssBucketList, HOssObjectList } from '@/composables/oss';

export default defineComponent({
  name: CONSTANTS.ComponentName.OSS_OBJECT,

  components: {
    HOssBucketList,
    HOssObjectList,
  },

  setup() {
    const bucketName = ref<string>('');
    const version = ref<number>(0);

    return {
      bucketName,
      version,
    };
  },
});
</script>
