<template>
  <h-center-form-layout
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <h-dictionary-select
      v-model="editedItem.webExpression"
      dictionary="PermissionExpression"
      label="权限表达式"
    ></h-dictionary-select>
    <h-text-field
      v-model="editedItem.serviceId"
      name="serviceId"
      label="服务ID * "
      placeholder="请输入服务ID"
      disable
    ></h-text-field>
    <h-text-field
      v-model="editedItem.url"
      name="url"
      label="URL * "
      placeholder="请输URL"
      disable
    ></h-text-field>
    <h-text-field
      v-model="editedItem.requestMethod"
      name="requestMethod"
      label="Request Method * "
      placeholder="请输入Request Method"
      disable
    ></h-text-field>
    <h-text-field
      v-model="editedItem.attributeCode"
      name="attributeCode"
      label="默认权限代码 * "
      placeholder="请输入默认权限代码"
      disable
    ></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysAttributeEntity } from '@/lib/declarations';
import { API } from '@/configurations';
import { useTableItem } from '@/composables/hooks';
import { HCenterFormLayout, HDictionarySelect } from '@/components';

export default defineComponent({
  name: 'SysAttributeContent',

  components: {
    HCenterFormLayout,
    HDictionarySelect,
  },

  setup(props) {
    const { editedItem, operation, title, overlay, saveOrUpdate } =
      useTableItem<SysAttributeEntity>(API.core.sysAttribute());

    const onSave = () => {
      saveOrUpdate();
    };

    return {
      editedItem,
      operation,
      title,
      overlay,
      onSave,
    };
  },
});
</script>
