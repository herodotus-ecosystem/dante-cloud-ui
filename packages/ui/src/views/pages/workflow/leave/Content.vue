<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-date-time v-model="editedItem.beginTime" label="开始时间"></h-date-time>
    <h-date-time v-model="editedItem.endTime" label="结束时间"></h-date-time>
    <h-text-field v-model.number="editedItem.days" label="排序值" placeholder="请输入排序值" type="number" />
    <h-text-field
      v-model="editedItem.reason"
      label="请假事由"
      type="textarea"
      placeholder="请输入请假事由"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { LeaveFlow } from '/@/lib/declarations';
import { useFlowApi } from '/@/api';
import { useTableItem } from '/@/hooks';
import { HCenterFormLayout, HOrganizationSelect, HDepartmentSelect } from '/@/components';

export default defineComponent({
  name: 'LeaveFlowContent',

  components: {
    HCenterFormLayout
  },

  setup(props) {
    const api = useFlowApi();
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<LeaveFlow>(api.leave);

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
