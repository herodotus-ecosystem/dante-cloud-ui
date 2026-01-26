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
        <h-edit-button></h-edit-button>
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
} from '@/composables/declarations';

import { API } from '@/configurations';
import { useBaseTable } from '@/composables/hooks';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HCompletedTaskTable',

  setup(props) {
    const authentication = useAuthenticationStore();

    const rowKey = 'taskId' as keyof ExtendedTaskEntity;
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
      hideLoading,
    } = useBaseTable<ExtendedTaskEntity, ExtendedTaskConditions>(
      'HToDoTaskTable',
      'updateTime',
      true,
    );

    const columns: QTableColumnProps = [
      { name: 'businessKey', field: 'businessKey', align: 'center', label: '业务ID' },
      { name: 'startUsername', field: 'startUsername', align: 'center', label: '发起人' },
      { name: 'startTime', field: 'startTime', align: 'center', label: '申请时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const fetchCompletedTasksByPage = (pageNumber = 1) => {
      showLoading();
      API.core
        .task()
        .fetchCompletedTasksByPage(
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
      fetchCompletedTasksByPage(pagination.value.page);
    };

    watch(
      () => pagination.value.page,
      (newValue) => {
        fetchCompletedTasksByPage(newValue);
      },
    );

    onMounted(() => {
      fetchCompletedTasksByPage(pagination.value.page);
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
    };
  },
});
</script>
