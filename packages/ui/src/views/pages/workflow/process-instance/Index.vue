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
      <q-btn color="primary" label="新建单位" @click="toCreate()" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="positive"
          icon="mdi-progress-check"
          tooltip="当前进度"
          @click="viewProgress = true"
        ></h-dense-icon-button>
        <h-delete-button
          v-if="!props.row.reserved"
          @click="onDeleteItemById(props.row[rowKey])"
        ></h-delete-button>
        <h-bpmn-view-diagram-dialog
          v-model="viewProgress"
          :definition-id="props.row['definitionId']"
          :definition-tenant-id="props.row['tenantId']"
          :instance-id="props.row['id']"
        ></h-bpmn-view-diagram-dialog>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  ProcessInstanceEntity,
  ProcessInstanceQueryParams,
  ProcessInstanceSortBy,
  ProcessInstanceDeleteQueryParams,
  QTableProps,
} from '@/composables/declarations';

import { API } from '@/configurations';
import { HDenseIconButton } from '@/components';
import { useBpmnTableItems, HBpmnViewDiagramDialog } from '@/composables/bpmn';

export default defineComponent({
  name: 'WorkflowProcessInstance',

  components: {
    HDenseIconButton,
    HBpmnViewDiagramDialog,
  },

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
      ProcessInstanceEntity,
      ProcessInstanceQueryParams,
      ProcessInstanceSortBy,
      ProcessInstanceDeleteQueryParams
    >(API.bpmn.processInstance(), {
      sortBy: 'businessKey',
      sortOrder: 'desc',
    });

    const selected = ref([]);
    const rowKey = 'id' as keyof ProcessInstanceEntity;
    const viewProgress = ref(false);

    const columns: QTableProps['columns'] = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'definitionId', field: 'definitionId', align: 'center', label: '定义ID' },
      { name: 'businessKey', field: 'businessKey', align: 'center', label: 'BusinessKey' },
      {
        name: 'suspended',
        field: 'suspended',
        align: 'center',
        label: '是否挂起',
        format: (value) => (value ? '是' : '否'),
      },
      {
        name: 'ended',
        field: 'ended',
        align: 'center',
        label: '是否结束',
        format: (value) => (value ? '是' : '否'),
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
      viewProgress,
    };
  },
});
</script>
