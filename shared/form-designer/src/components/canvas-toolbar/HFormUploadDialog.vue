<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 20vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">上传表单</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-card-section>
        <h-form-information ref="infoRef"></h-form-information>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="取消" color="red" @click="isOpen = false" />
        <q-btn label="保存" color="primary" @click="onSave()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, computed, ref } from 'vue';

import type { SweetAlertResult } from '@/declarations';

import { toast, Swal } from '@/lib/utils';
import { useFormResourceStore, useFormCanvasStore } from '@/stores';

import HFormInformation from './HFormInformation.vue';

export default defineComponent({
  name: 'HFormUploadDialog',

  components: {
    HFormInformation,
  },

  props: {
    modelValue: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'update:open', 'save'],

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const infoRef = ref(null) as Ref<typeof HFormInformation | null>;
    const resource = useFormResourceStore();
    const canvas = useFormCanvasStore();

    const showComfirm = () => {
      Swal.fire({
        title: '保存成功！',
        text: '您是否需要关闭设计器？',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '确定!',
        cancelButtonText: '取消',
        showClass: {
          popup: 'animate__animated animate__fadeIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      }).then((confirm: SweetAlertResult) => {
        if (confirm.value) {
          canvas.isClosed = true;
        }
      });
    };

    const onSave = () => {
      if (infoRef.value) {
        const isValid = infoRef.value.validate();
        if (isValid) {
          const entity = canvas.compose();
          resource.dynamicForm
            .saveOrUpdate(entity)
            .then((result) => {
              isOpen.value = false;
              showComfirm();
            })
            .catch((error) => {
              isOpen.value = false;
              toast.error('保存失败！');
            });
        }
      }
    };

    return {
      isOpen,
      onSave,
      infoRef,
    };
  },
});
</script>
