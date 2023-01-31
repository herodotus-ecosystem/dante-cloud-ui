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
    @request="findItems">
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-file-document-edit"
          tooltip="办理"
          @click="dealWith(props.row)"></h-dense-icon-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import type {
  Page,
  QTableColumnProps,
  QTableRequestProps,
  ExtendedTask,
  ExtendedTaskConditions
} from '/@/lib/declarations';

import { api, bpmnApi } from '/@/lib/utils';
import { useTable } from '/@/hooks';
import { useAuthenticationStore } from '/@/stores';
import { HDenseIconButton } from '/@/components';

export default defineComponent({
  name: 'HToDoTaskTable',

  setup(props) {
    const authentication = useAuthenticationStore();

    const rowKey = 'taskId' as keyof ExtendedTask;
    const selected = ref([]);

    const {
      loading,
      tableRows,
      totalPages,
      pagination,
      addRoutePushParam,
      setPagination,
      setPageData,
      showLoading,
      hideLoading
    } = useTable<ExtendedTask, ExtendedTaskConditions>();

    const columns: QTableColumnProps = [
      { name: 'businessKey', field: 'businessKey', align: 'center', label: '业务ID' },
      { name: 'startUserName', field: 'startUserName', align: 'center', label: '发起人' },
      { name: 'startTime', field: 'startTime', align: 'center', label: '申请时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const fetchToDoTasksByPage = (pageNumber = 1) => {
      showLoading();
      api
        .task()
        .fetchToDoTasksByPage(
          {
            pageNumber: pageNumber - 1,
            pageSize: pagination.value.rowsPerPage
          },
          { employeeId: authentication.employeeId }
        )
        .then(result => {
          const data = result.data as Page<ExtendedTask>;
          setPageData(data);
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const findItems = (props: QTableRequestProps) => {
      setPagination(props);
      fetchToDoTasksByPage(pagination.value.page);
    };

    const dealWith = (item: ExtendedTask) => {
      if (!item.ownerId && !item.assigneeId) {
        bpmnApi
          .task()
          .claim(item.taskId, { userId: authentication.employeeId })
          .then(result => {});
      }
    };

    watch(
      () => pagination.value.page,
      newValue => {
        fetchToDoTasksByPage(newValue);
      }
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
      dealWith
    };
  }
});
</script>
