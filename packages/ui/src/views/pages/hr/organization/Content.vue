<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <h-text-field
      v-model="editedItem.organizationName"
      name="organizationName"
      label="单位名称 * "
      placeholder="请输入单位名称"
      :error="v.editedItem.organizationName.$error"
      :error-message="
        v.editedItem.organizationName.$errors[0]
          ? v.editedItem.organizationName.$errors[0].$message
          : ''
      "
      @blur="v.editedItem.organizationName.$validate()"
    ></h-text-field>

    <h-text-field
      v-model="editedItem.partitionCode"
      label="单位分区码"
      placeholder="请输入单位分区码名称"
    ></h-text-field>
    <h-text-field
      v-model="editedItem.shortName"
      label="单位简称"
      placeholder="请输入单位简称"
    ></h-text-field>
    <h-dictionary-select
      v-model="editedItem.category"
      dictionary="OrganizationCategory"
      label="组织类别"
    ></h-dictionary-select>
    <h-organization-select
      v-model="editedItem.parentId"
      :category="editedItem.category"
      label="上级单位"
      placeholder="请设置所属上级单位"
    ></h-organization-select>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { SysOrganizationEntity } from '@/lib/declarations';
import { API } from '@/configurations';
import { useTableItem } from '@/composables/hooks';
import { HCenterFormLayout } from '@/components';
import { HOrganizationSelect } from '../components';
import { HDictionarySelect } from '@/composables/constants';

export default defineComponent({
  name: 'SysOrganizationContent',

  components: {
    HCenterFormLayout,
    HOrganizationSelect,
    HDictionarySelect,
  },

  setup(props) {
    const { editedItem, operation, title, overlay, saveOrUpdate } =
      useTableItem<SysOrganizationEntity>(API.core.sysOrganization());

    const rules = {
      editedItem: {
        organizationName: {
          required: helpers.withMessage('单位名称不能为空', required),
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
