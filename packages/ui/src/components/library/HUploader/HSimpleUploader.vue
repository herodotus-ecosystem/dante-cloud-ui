<template>
  <q-uploader
    ref="uploader"
    auto-upload
    :factory="onUpload"
    class="full-width"
    @uploaded="onFileUploaded"
  />
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent } from 'vue';
import { QUploader } from 'quasar';

import type { QUploaderFactoryObject, QUploaderInfo } from '@/lib/declarations';

import { ossApi, lodash } from '@/lib/utils';
import { useAuthenticationStore } from '@/stores';

export default defineComponent({
  name: 'HSimpleUploader',

  props: {
    modelValue: { type: Boolean, required: true },
    open: { type: Boolean },
    loading: { type: Boolean, default: false },
    bucketName: { type: String, required: true },
  },

  emits: ['update:modelValue', 'update:open', 'close'],

  setup(props, { emit }) {
    const executedUpload = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });
    const authStore = useAuthenticationStore();

    const uploader = ref(null) as Ref<QUploader | null>;

    const onUpload = (files: readonly File[]): Promise<QUploaderFactoryObject> => {
      return new Promise((resolve, reject) => {
        const token: string = authStore.token;
        resolve({
          url: ossApi.objectStream().getUploadAddress(),
          method: 'POST',
          fieldName: 'file',
          headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
          formFields: [{ name: 'bucketName', value: props.bucketName }],
        });
      });
    };

    const onFileUploaded = (info: QUploaderInfo) => {
      if (!lodash.isEmpty(info.files)) {
        executedUpload.value = true;
      } else {
        executedUpload.value = false;
      }
    };

    return {
      uploader,
      onFileUploaded,
      onUpload,
    };
  },
});
</script>
