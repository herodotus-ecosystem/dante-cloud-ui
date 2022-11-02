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
        <h-delete-button v-if="!props.row.reserved" @click="onDeleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { ProcessDefinition, ProcessDefinitionQueryParams, QTableProps } from '/@/lib/declarations';

import { useBpmnTableItems } from '/@/hooks';
import { bpmnApi } from '/@/lib/utils';

export default defineComponent({
  name: 'WorkflowProcessDefinition',

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, onDeleteItemById, conditions } =
      useBpmnTableItems<ProcessDefinition, ProcessDefinitionQueryParams>(bpmnApi.processDefinition());

    const selected = ref([]);
    const rowKey = 'id' as keyof ProcessDefinition;

    const columns: QTableProps['columns'] = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'key', field: 'key', align: 'center', label: 'KEY' },
      { name: 'name', field: 'name', align: 'center', label: '模型名称' },
      { name: 'versionTag', field: 'versionTag', align: 'center', label: '版本标签' },
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
      { name: 'historyTimeToLive', field: 'historyTimeToLive', align: 'center', label: '历史数据保留时长' }
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
      onDeleteItemById
    };
  }
});
</script>
