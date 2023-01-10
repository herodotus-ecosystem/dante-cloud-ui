<template>
  <div class="q-gutter-y-md">
    <h-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="single"
      v-model:selected="selected"
      v-model:pagination="pagination"
      v-model:pageNumber="pagination.page"
      :totalPages="totalPages"
      :loading="loading"
      status
      reserved
      @request="findItems">
      <template #top-left>
        <q-btn color="primary" label="新建菜单" @click="toCreate" />
      </template>

      <template #body-cell-icon="props">
        <q-td key="icon" :props="props">
          <h-dense-icon-button color="primary" :icon="props.row.icon" :tooltip="props.row.icon"></h-dense-icon-button>
        </q-td>
      </template>

      <template #body-cell-isHaveChild="props">
        <q-td key="isHaveChild" :props="props">
          <h-boolean-column :value="props.row.isHaveChild"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isNotKeepAlive="props">
        <q-td key="isNotKeepAlive" :props="props">
          <h-boolean-column :value="props.row.isNotKeepAlive"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isHideAllChild="props">
        <q-td key="isHideAllChild" :props="props">
          <h-boolean-column :value="props.row.isHideAllChild"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isDetailContent="props">
        <q-td key="isDetailContent" :props="props">
          <h-boolean-column :value="props.row.isDetailContent"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isIgnoreAuth="props">
        <q-td key="isIgnoreAuth" :props="props">
          <h-boolean-column :value="props.row.isIgnoreAuth"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-dense-icon-button
            color="green"
            icon="mdi-play-circle"
            tooltip="提交"
            @click="start(props.row.flowId)"></h-dense-icon-button>
          <h-dense-icon-button
            color="brown"
            icon="mdi-badge-account-alert"
            tooltip="配置角色"
            @click="toAuthorize(props.row)"></h-dense-icon-button>
          <h-edit-button @click="toEdit(props.row)"></h-edit-button>
          <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
        </q-td>
      </template>
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { LeaveFlow, LeaveFlowConditions, QTableProps } from '/@/lib/declarations';

import { useFlowApi } from '/@/api';
import { useTableItems } from '/@/hooks';
import { bpmnApi, toast } from '/@/lib/utils';

import { HDeleteButton, HEditButton, HTable, HBooleanColumn, HDenseIconButton, HElementCondition } from '/@/components';

export default defineComponent({
  name: 'LeaveFlow',

  components: {
    HBooleanColumn,
    HDenseIconButton,
    HDeleteButton,
    HEditButton,
    HTable
  },

  setup() {
    const api = useFlowApi();

    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      toAuthorize,
      findItems,
      deleteItemById,
      conditions
    } = useTableItems<LeaveFlow, LeaveFlowConditions>(api.leave, 'LeaveFlow', false);

    const selected = ref([]);
    const rowKey = 'flowId' as keyof LeaveFlow;

    const columns: QTableProps['columns'] = [
      { name: 'flowId', field: 'flowId', align: 'center', label: '流程ID' },
      { name: 'beginTime', field: 'beginTime', align: 'center', label: '开始日期' },
      { name: 'endTime', field: 'endTime', align: 'center', label: '结束日期' },
      { name: 'days', field: 'days', align: 'center', label: '请假天数' },
      { name: 'reason', field: 'reason', align: 'center', label: '请假事由' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const start = (businessKey: string) => {
      bpmnApi
        .processDefinition()
        .start({ key: 'Process_Leave' }, { variables: {}, businessKey: businessKey })
        .then(result => {
          console.log(result);
          toast.success('提交成功！');
        })
        .catch(error => {
          console.log(error);
          toast.error('提交失败！');
        });
    };

    return {
      rowKey,
      selected,
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      toCreate,
      toEdit,
      toAuthorize,
      findItems,
      deleteItemById,
      conditions,
      start
    };
  }
});
</script>
