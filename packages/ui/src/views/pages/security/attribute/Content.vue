<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-dictionary-select
      v-model="editedItem.webExpression"
      dictionary="permissionExpression"
      label="权限表达式"
      option-label="key"
      option-value="value"></h-dictionary-select>
    <h-text-field
      v-model="editedItem.serviceId"
      name="serviceId"
      label="服务ID * "
      placeholder="请输入服务ID"
      disable></h-text-field>
    <h-text-field v-model="editedItem.url" name="url" label="URL * " placeholder="请输URL" disable></h-text-field>
    <h-text-field
      v-model="editedItem.requestMethod"
      name="requestMethod"
      label="Request Method * "
      placeholder="请输入Request Method"
      disable></h-text-field>
    <h-text-field
      v-model="editedItem.attributeCode"
      name="attributeCode"
      label="默认权限代码 * "
      placeholder="请输入默认权限代码"
      disable></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysAttributeEntity } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HDictionarySelect } from '/@/components';

export default defineComponent({
  name: 'SysAttributeContent',

  components: {
    HCenterFormLayout,
    HDictionarySelect
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysAttributeEntity>(api.sysAttribute());

    const onSave = () => {
      saveOrUpdate();
    };

    return {
      editedItem,
      operation,
      title,
      onSave
    };
  }
});
</script>
