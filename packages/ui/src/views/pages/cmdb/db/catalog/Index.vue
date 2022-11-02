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
      <q-btn color="primary" label="新建数据库" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-database-lock"
          tooltip="配置用户"
          @click="toAuthorize(props.row)"></h-dense-icon-button>
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
        <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { DatabaseCatalog, DatabaseCatalogConditions, QTableProps } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTableItems } from '/@/hooks';

import { HDenseIconButton, HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.OAUTH2_SCOPE,

  components: {
    HDeleteButton,
    HDenseIconButton,
    HEditButton,
    HTable
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } =
      useTableItems<DatabaseCatalog, DatabaseCatalogConditions>(api.dbCatalog(), ComponentNameEnum.DATABASE_CATALOG);

    const selected = ref([]);
    const rowKey = 'catalogId' as keyof DatabaseCatalog;

    const columns: QTableProps['columns'] = [
      { name: 'catalogName', field: 'catalogName', align: 'center', label: '数据库名称' },
      { name: 'purpose', field: 'purpose', align: 'center', label: '用途' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

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
      deleteItemById
    };
  }
});
</script>
