<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.applicationName"
      name="applicationName"
      label="应用系统名称名称 * "
      placeholder="请输入应用系统名称"
      :error="v.editedItem.applicationName.$error"
      :error-message="v.editedItem.applicationName.$errors[0] ? v.editedItem.applicationName.$errors[0].$message : ''"
      @blur="v.editedItem.applicationName.$validate()"></h-text-field>
    <h-text-field v-model="editedItem.department" label="管理部门" placeholder="请输入管理部门"></h-text-field>
    <h-text-field
      v-model="editedItem.employee"
      label="管理部门负责人"
      placeholder="请输入管理部门负责人"></h-text-field>
    <h-text-field v-model="editedItem.protectionGrade" label="等保定级" placeholder="请输入等保定级"></h-text-field>
    <h-text-field
      v-model="editedItem.protectionFilingNo"
      label="等保备案编号"
      placeholder="请输入等保备案编号"></h-text-field>
    <h-text-field v-model="editedItem.constructionUnit" label="建设单位" placeholder="请输入建设单位"></h-text-field>
    <h-text-field
      v-model="editedItem.contacts"
      label="建设单位负责人"
      placeholder="请输入建设单位负责人"></h-text-field>
    <h-text-field
      v-model="editedItem.phoneNumber"
      label="建设单位负责人联系电话"
      placeholder="请输入建设单位负责人联系电话"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { AssetApplicationEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout } from '/@/components';

export default defineComponent({
  name: 'AssetApplicationContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<AssetApplicationEntity>(api.assetApplication());

    const rules = {
      editedItem: {
        applicationName: {
          required: helpers.withMessage('应用系统名称', required)
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
      onSave
    };
  }
});
</script>
