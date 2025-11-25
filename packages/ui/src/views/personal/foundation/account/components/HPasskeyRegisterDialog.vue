<template>
  <h-dialog
    v-model="openDialog"
    title="注册通行密钥"
    confirm-label="注册"
    @confirm="onSave"
    external-close
  >
    <h-text-field
      v-model.lazy="v.label.$model"
      label="标签 *"
      placeholder="请输入标签"
      :error="v.label.$error"
      :error-message="v.label.$errors[0] ? v.label.$errors[0].$message : ''"
    ></h-text-field>
  </h-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import { usePasskey } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HPasskeyRegisterDialog',

  emits: ['update:modelValue', 'save'],

  props: {
    modelValue: { type: Boolean, required: true },
  },

  setup(props, { emit }) {
    const openDialog = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const { registration } = usePasskey();

    const label = ref('');

    const rules = {
      label: {
        required: helpers.withMessage('标签不能为空', required),
      },
    };

    const v = useVuelidate(rules, { label }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then((result) => {
        if (result) {
          registration(label.value).then(() => {
            openDialog.value = false;
            emit('save');
          });
        }
      });
    };

    return {
      openDialog,
      v,
      onSave,
    };
  },
});
</script>
