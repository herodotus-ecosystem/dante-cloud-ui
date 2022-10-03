<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field
      v-model="editedItem.organizationName"
      name="organizationName"
      label="单位名称 * "
      placeholder="请输入单位名称"
      :error="v.editedItem.organizationName.$error"
      :error-message="v.editedItem.organizationName.$errors[0] ? v.editedItem.organizationName.$errors[0].$message : ''"
      @blur="v.editedItem.organizationName.$validate()"></h-text-field>

    <h-text-field
      v-model="editedItem.partitionCode"
      label="单位分区码"
      placeholder="请输入单位分区码名称"></h-text-field>
    <h-text-field v-model="editedItem.shortName" label="单位简称" placeholder="请输入单位简称"></h-text-field>
    <h-dictionary-select
      v-model="editedItem.category"
      dictionary="organizationCategory"
      label="组织类别"></h-dictionary-select>
    <h-organization-select
      v-model="editedItem.parentId"
      :category="editedItem.category"
      label="上级单位"
      placeholder="请设置所属上级单位"></h-organization-select>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysOrganization } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HOrganizationSelect, HDictionarySelect } from '/@/components';

export default defineComponent({
  name: 'SysOrganizationContent',

  components: {
    HCenterFormLayout,
    HOrganizationSelect,
    HDictionarySelect
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysOrganization>(api.sysOrganization());

    const rules = {
      editedItem: {
        organizationName: {
          required: helpers.withMessage('单位名称不能为空', required)
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
