<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.username"
      name="username"
      label="用户名 * "
      placeholder="请输入用户名"
      :error="v.editedItem.username.$error"
      :error-message="v.editedItem.username.$errors[0] ? v.editedItem.username.$errors[0].$message : ''"
      @blur="v.editedItem.username.$validate()"></h-text-field>
    <h-text-field
      v-model="editedItem.credentials"
      label="密码"
      placeholder="请输入密码"
      :type="showPassword ? 'text' : 'password'"
      :error="v.editedItem.credentials.$error"
      :error-message="v.editedItem.credentials.$errors[0] ? v.editedItem.credentials.$errors[0].$message : ''"
      @blur="v.editedItem.credentials.$validate()">
      <template #append>
        <h-visibility-button v-model="showPassword"></h-visibility-button>
      </template>
    </h-text-field>
    <h-text-field
      v-model="editedItem.credentialsExpireAt"
      label="密码过期日期"
      placeholder="请输入密码过期日期"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { DatabaseAccountEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'DatabaseAccountContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<DatabaseAccountEntity>(api.dbAccount());

    const showPassword = ref(false);

    const rules = {
      editedItem: {
        username: {
          required: helpers.withMessage('用户名不能为空', required)
        },
        credentials: {
          required: helpers.withMessage('密码不能为空', required)
        }
      }
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then(result => {
        if (result) {
          saveOrUpdate();
        }
      });
    };

    return {
      editedItem,
      operation,
      title,
      v,
      onSave,
      showPassword
    };
  }
});
</script>
