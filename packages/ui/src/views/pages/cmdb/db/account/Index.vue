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
      <q-btn color="primary" label="新建用户" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
        <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { DatabaseAccount, DatabaseAccountConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTableItems } from '/@/hooks';

import { HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.DATABASE_ACCOUNT,

  components: {
    HDeleteButton,
    HEditButton,
    HTable
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } =
      useTableItems<DatabaseAccount, DatabaseAccountConditions>(api.dbAccount(), ComponentNameEnum.DATABASE_ACCOUNT);

    const selected = ref([]);
    const rowKey = 'accountId' as keyof DatabaseAccount;

    const columns: QTableProps['columns'] = [
      { name: 'username', field: 'username', align: 'center', label: '用户名' },
      { name: 'credentials', field: 'credentials', align: 'center', label: '密码' },
      { name: 'credentialsExpireAt', field: 'credentialsExpireAt', align: 'center', label: '密码过期日期' },
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
