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
    @request="findItems"
  >
    <template #top-left>
      <q-btn color="primary" label="新建模型" to="/widgets/bpmn-designer" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-delete-button
          v-if="!props.row.reserved"
          @click="onDeleteItemById(props.row[rowKey])"
        ></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  DeploymentEntity,
  DeploymentQueryParams,
  DeploymentSortBy,
  DeploymentDeleteQueryParams,
  QTableProps,
} from '@/composables/declarations';

import { moment } from '@herodotus-cloud/core';
import { API } from '@/configurations';
import { useBpmnTableItems } from '@/composables/bpmn';

export default defineComponent({
  name: 'WorkflowDeployment',

  setup() {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      findItems,
      onDeleteItemById,
      conditions,
    } = useBpmnTableItems<
      DeploymentEntity,
      DeploymentQueryParams,
      DeploymentSortBy,
      DeploymentDeleteQueryParams
    >(API.bpmn.deployment(), {
      sortBy: 'id',
      sortOrder: 'desc',
    });

    const selected = ref([]);
    const rowKey = 'id' as keyof DeploymentEntity;

    const columns: QTableProps['columns'] = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'name', field: 'name', align: 'center', label: '模型名称' },
      { name: 'source', field: 'source', align: 'center', label: '部署渠道' },
      {
        name: 'deploymentTime',
        field: 'deploymentTime',
        align: 'center',
        label: '部署时间',
        format: (value) => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      { name: 'tenantId', field: 'tenantId', align: 'center', label: '租户ID' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
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
    };
  },
});
</script>
