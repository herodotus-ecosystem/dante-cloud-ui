<template>
  <h-dialog v-model="openDialog" v-model:loading="loading" title="上传文件" hide-save>
    <q-uploader ref="uploader" :factory="onUpload" class="full-width" @uploaded="onFileUploaded" />
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QUploader } from 'quasar';

import type { QUploaderFactoryObject, QUploaderInfo } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';
import { useAuthenticationStore } from '/@/stores';

export default defineComponent({
  name: 'HSimpleUploader',

  props: {
    modelValue: { type: Boolean, required: true },
    open: { type: Boolean },
    loading: { type: Boolean, default: false },
    bucketName: { type: String, required: true }
  },

  emits: ['update:modelValue', 'update:open', 'close'],

  setup(props, { emit }) {
    const executedUpload = computed({
      get: () => props.open,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const openDialog = computed({
      get: () => props.open,
      set: newValue => {
        emit('update:open', newValue);
      }
    });

    const authStore = useAuthenticationStore();

    const uploader = ref(null) as Ref<QUploader | null>;

    const onUpload = (files: readonly File[]): Promise<QUploaderFactoryObject> => {
      console.log(files);
      return new Promise((resolve, reject) => {
        const token: string = authStore.token;
        resolve({
          url: api.ossObjectStream().getUploadAddress(),
          method: 'POST',
          fieldName: 'file',
          headers: [{ name: 'Authorization', value: `Bearer ${token}` }],
          formFields: [{ name: 'bucketName', value: props.bucketName }]
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
      openDialog,
      uploader,
      onFileUploaded,
      onUpload
    };
  }
});
</script>
