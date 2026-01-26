<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <h-text-field
      v-model.lazy="v.editedItem.permissionName.$model"
      name="permissionName"
      label="权限名称 * "
      placeholder="请输入权限名称"
      debounce="5000"
      :error="v.editedItem.permissionName.$error"
      :error-message="
        v.editedItem.permissionName.$errors[0]
          ? v.editedItem.permissionName.$errors[0].$message
          : ''
      "
    ></h-text-field>
    <h-text-field
      v-model="editedItem.permissionCode"
      name="permissionCode"
      label="权限代码"
      placeholder="请输权限代码"
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { required, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

import type { SysPermissionEntity } from '@/composables/declarations';

import { API } from '@/configurations';
import { useTableItem } from '@/composables/hooks';
import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'SysPermissionContent',

  components: {
    HCenterFormLayout,
  },

  setup() {
    const { editedItem, operation, title, overlay, saveOrUpdate } =
      useTableItem<SysPermissionEntity>(API.core.sysPermission());

    const rules = {
      editedItem: {
        permissionName: {
          required: helpers.withMessage('权限名称不能为空', required),
        },
      },
    };

    const v = useVuelidate(rules, { editedItem }, { $lazy: true });

    const onSave = () => {
      v.value.$validate().then((result) => {
        if (result) {
          saveOrUpdate();
        }
      });
    };

    return {
      editedItem,
      operation,
      title,
      overlay,
      v,
      onSave,
    };
  },
});
</script>
