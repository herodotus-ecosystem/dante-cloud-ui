<template>
  <q-uploader :factory="onUpload" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import type { QUploaderFactoryObject } from '/@/lib/declarations';

import { api } from '/@/lib/utils';
import { useAuthenticationStore, useOssStore } from '/@/stores';

export default defineComponent({
  name: 'HSimpleUploader',

  setup(props) {
    const model = ref('');

    const authStore = useAuthenticationStore();
    const ossStore = useOssStore();

    const onUpload = (files: readonly File[]): Promise<QUploaderFactoryObject> => {
      console.log(files);
      return new Promise((resolve, reject) => {
        const token: string = authStore.token;
        resolve({
          url: api.ossObjectStream().getUploadAddress(),
          method: 'POST',
          fieldName: 'file',
          headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
          formFields: [{ name: 'bucketName', value: ossStore.bucketName }]
        });
      });
    };

    return {
      onUpload,
      model
    };
  }
});
</script>
