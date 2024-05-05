<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.departmentName"
      name="departmentName"
      label="部门名称 * "
      placeholder="请输入部门名称"
      :error="v.editedItem.departmentName.$error"
      :error-message="v.editedItem.departmentName.$errors[0] ? v.editedItem.departmentName.$errors[0].$message : ''"
      @blur="v.editedItem.departmentName.$validate()"></h-text-field>

    <h-text-field
      v-model="editedItem.partitionCode"
      label="部门分区码"
      placeholder="请输入部门分区码名称"></h-text-field>
    <h-text-field v-model="editedItem.shortName" label="部门简称" placeholder="请输入部门简称"></h-text-field>
    <h-organization-select
      v-model="editedItem.organizationId"
      label="所属单位"
      placeholder="请设置所属单位"></h-organization-select>
    <h-department-select
      v-model="editedItem.parentId"
      :organizationId="editedItem.organizationId"
      label="上级部门"
      placeholder="请选择上级部门"></h-department-select>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysDepartmentEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HOrganizationSelect, HDepartmentSelect } from '/@/components';

export default defineComponent({
  name: 'SysDepartmentContent',

  components: {
    HCenterFormLayout,
    HOrganizationSelect,
    HDepartmentSelect
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysDepartmentEntity>(api.sysDepartment());

    const rules = {
      editedItem: {
        departmentName: {
          required: helpers.withMessage('单位不能为空', required)
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
