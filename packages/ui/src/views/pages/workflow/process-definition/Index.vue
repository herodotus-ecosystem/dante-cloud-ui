<template>
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
    @request="findItems">
    <template #top-left>
      <q-btn color="primary" label="新建单位" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-delete-button @click="onDeleteItemById(props.row[rowKey])"></h-delete-button>
        <h-dense-icon-button
          color="red"
          icon="mdi-delete"
          tooltip="查看流程图"
          @click="viewDiagram = true"></h-dense-icon-button>
        <diagram v-model="viewDiagram" :definition-key="props.row['key']"></diagram>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type {
  ProcessDefinition,
  ProcessDefinitionQueryParams,
  ProcessDefinitionSortBy,
  QTableProps
} from '/@/lib/declarations';

import { useBpmnTableItems } from '/@/hooks';
import { bpmnApi } from '/@/lib/utils';

import Diagram from './Diagram.vue';
import { HDenseIconButton } from '/@/components';

export default defineComponent({
  name: 'WorkflowProcessDefinition',

  components: {
    Diagram,
    HDenseIconButton
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, onDeleteItemById, conditions } =
      useBpmnTableItems<ProcessDefinition, ProcessDefinitionQueryParams, ProcessDefinitionSortBy>(
        bpmnApi.processDefinition(),
        {
          sortBy: 'id',
          sortOrder: 'desc'
        }
      );

    const selected = ref([]);
    const rowKey = 'id' as keyof ProcessDefinition;
    const viewDiagram = ref(false);

    const columns: QTableProps['columns'] = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'key', field: 'key', align: 'center', label: 'KEY' },
      { name: 'name', field: 'name', align: 'center', label: '模型名称' },
      { name: 'version', field: 'version', align: 'center', label: '版本' },
      { name: 'resource', field: 'resource', align: 'center', label: '资源名称' },
      { name: 'tenantId', field: 'tenantId', align: 'center', label: '租户ID' },
      { name: 'deploymentId', field: 'deploymentId', align: 'center', label: '部署ID' },
      {
        name: 'suspended',
        field: 'suspended',
        align: 'center',
        label: '是否挂起',
        format: value => (value ? '是' : '否')
      },
      {
        name: 'startableInTasklist',
        field: 'startableInTasklist',
        align: 'center',
        label: '是否可启动',
        format: value => (value ? '是' : '否')
      },
      { name: 'historyTimeToLive', field: 'historyTimeToLive', align: 'center', label: '历史数据保留时长' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    return {
      tableRows,
      totalPages,
      pagination,
      loading,
      conditions,
      selected,
      rowKey,
      columns,
      toEdit,
      toCreate,
      findItems,
      onDeleteItemById,
      viewDiagram
    };
  }
});
</script>
