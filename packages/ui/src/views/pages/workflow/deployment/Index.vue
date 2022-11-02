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

import type { Deployment, DeploymentQueryParams, QTableProps } from '/@/lib/declarations';

import { useBpmnTableItems } from '/@/hooks';
import { bpmnApi, moment } from '/@/lib/utils';

export default defineComponent({
  name: 'WorkflowDeployment',

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, onDeleteItemById, conditions } =
      useBpmnTableItems<Deployment, DeploymentQueryParams>(bpmnApi.deployment());

    const selected = ref([]);
    const rowKey = 'id' as keyof Deployment;

    const columns: QTableProps['columns'] = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'name', field: 'name', align: 'center', label: '模型名称' },
      { name: 'source', field: 'source', align: 'center', label: '部署渠道' },
      {
        name: 'deploymentTime',
        field: 'deploymentTime',
        align: 'center',
        label: '部署时间',
        format: value => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '')
      },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
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
      onDeleteItemById
    };
  }
});
</script>
