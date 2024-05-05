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
    <template #top-left>
      <q-btn color="primary" label="新建表单" @click="toCreate(false)" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-edit-button @click="toEdit(props.row, false)"></h-edit-button>
        <h-delete-button @click="onDeleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import type {
  SweetAlertResult,
  HttpResult,
  Page,
  QTableColumnProps,
  QTableOnRequestProps,
  QTableOnRequestParameter,
  DynamicFormEntity,
  DynamicFormConditions
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { formApi, Swal, toast, standardDeleteNotify } from '/@/lib/utils';
import { useBaseTable } from '/@/hooks';

export default defineComponent({
  name: ComponentNameEnum.WORKFLOW_DYNAMIC_FORM,

  setup(props) {
    const rowKey = 'id' as keyof DynamicFormEntity;
    const selected = ref([]);

    const {
      loading,
      tableRows,
      totalPages,
      pagination,
      toEdit,
      toCreate,
      setPagination,
      setPageData,
      showLoading,
      hideLoading
    } = useBaseTable<DynamicFormEntity, DynamicFormConditions>(
      ComponentNameEnum.WIDGETS_DYNAMIC_FORM,
      'updateTime',
      true
    );

    const columns: QTableColumnProps = [
      { name: 'id', field: 'id', align: 'center', label: '业务ID' },
      { name: 'name', field: 'name', align: 'center', label: '名称' },
      { name: 'activityName', field: 'activityName', align: 'center', label: '适用节点' },
      { name: 'createTime', field: 'createTime', align: 'center', label: '创建时间' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const fetchDynamicFormByPage = (pageNumber = 1) => {
      showLoading();
      formApi
        .dynamicForm()
        .fetchByPage({
          pageNumber: pageNumber - 1,
          pageSize: pagination.value.rowsPerPage
        })
        .then(result => {
          const data = result.data as Page<DynamicFormEntity>;
          setPageData(data);
          hideLoading();
        })
        .catch(() => {
          hideLoading();
        });
    };

    const findItems: QTableOnRequestProps = (props: QTableOnRequestParameter) => {
      setPagination(props);
      fetchDynamicFormByPage(pagination.value.page);
    };

    const onDeleteItemById = (id: string) => {
      standardDeleteNotify(() => {
        formApi
          .dynamicForm()
          .delete(id)
          .then(response => {
            const result = response as HttpResult<string>;
            if (result.message) {
              toast.success(result.message);
            } else {
              toast.success('删除成功');
            }

            fetchDynamicFormByPage(pagination.value.page);
          })
          .catch(() => {
            toast.error('删除失败');
          });
      });
    };

    watch(
      () => pagination.value.page,
      newValue => {
        fetchDynamicFormByPage(newValue);
      }
    );

    onMounted(() => {
      fetchDynamicFormByPage(pagination.value.page);
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
      toEdit,
      toCreate,
      onDeleteItemById
    };
  }
});
</script>
