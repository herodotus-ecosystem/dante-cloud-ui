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
    status
    reserved
    @request="findItems"
  >
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-file-document-edit"
          tooltip="办理"
          @click="dealWith(props.row)"
        ></h-dense-icon-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

import type {
  Page,
  QTableColumnProps,
  QTableOnRequestProps,
  QTableOnRequestParameter,
  ExtendedTaskEntity,
  ExtendedTaskConditions,
  ProcessSpecificsEntity,
  ProcessSpecificsConditions,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useBaseTable } from '@/hooks';
import { useBpmnProcess } from '@/composables/bpmn';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';
import { HDenseIconButton } from '@/components';

export default defineComponent({
  name: 'HToDoTaskTable',

  setup(props) {
    const authentication = useAuthenticationStore();

    const rowKey = 'taskId' as keyof ExtendedTaskEntity;
    const selected = ref([]);

    const {
      loading,
      tableRows,
      totalPages,
      pagination,
      setPagination,
      setPageData,
      showLoading,
      hideLoading,
    } = useBaseTable<ExtendedTaskEntity, ExtendedTaskConditions>(
      'HToDoTaskTable',
      'updateTime',
      true,
    );
    const { editedItem, fetchProcessSpecifics } = useBpmnProcess();
    const { toEdit } = useBaseTable<ProcessSpecificsEntity, ProcessSpecificsConditions>(
      CONSTANTS.ComponentName.WORKFLOW_PROCESS_APPROVE,
      'updateTime',
    );

    const columns: QTableColumnProps = [
      { name: 'businessKey', field: 'businessKey', align: 'center', label: '业务ID' },
      { name: 'startUsername', field: 'startUsername', align: 'center', label: '发起人' },
      { name: 'startTime', field: 'startTime', align: 'center', label: '申请时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const fetchToDoTasksByPage = (pageNumber = 1) => {
      showLoading();
      API.core
        .task()
        .fetchToDoTasksByPage(
          {
            pageNumber: pageNumber - 1,
            pageSize: pagination.value.rowsPerPage,
          },
          { employeeId: authentication.employeeId },
        )
        .then((result) => {
          const data = result.data as Page<ExtendedTaskEntity>;
          setPageData(data);
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const findItems: QTableOnRequestProps = (props: QTableOnRequestParameter) => {
      setPagination(props);
      fetchToDoTasksByPage(pagination.value.page);
    };

    const dealWith = async (item: ExtendedTaskEntity) => {
      if (!item.ownerId && !item.assigneeId) {
        await API.bpmn.task().claim(item.taskId, { userId: authentication.employeeId });
      }

      await fetchProcessSpecifics(item);
      toEdit(editedItem.value, {}, false);
    };

    watch(
      () => pagination.value.page,
      (newValue) => {
        fetchToDoTasksByPage(newValue);
      },
    );

    onMounted(() => {
      fetchToDoTasksByPage(pagination.value.page);
    });

    return {
      tableRows,
      columns,
      rowKey,
      selected,
      pagination,
      totalPages,
      loading,
      findItems,
      dealWith,
    };
  },
});
</script>
