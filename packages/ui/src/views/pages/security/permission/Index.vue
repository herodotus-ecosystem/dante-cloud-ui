<template>
  <h-table
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    selection="single"
    v-model:pagination="pagination"
    v-model:pageNumber="pagination.page"
    :totalPages="totalPages"
    :loading="loading"
    status
    reserved
    @request="findItems">
    <template #top-left>
      <h-button color="primary" label="新建权限" @click="toCreate" />
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
import { defineComponent } from 'vue';

import type {
  SysPermissionEntity,
  SysPermissionConditions,
  SysPermissionProps,
  QTableColumnProps
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTable } from '/@/hooks';

import { HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.SYS_PERMISSION,

  components: {
    HTable
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, deleteItemById } = useTable<
      SysPermissionEntity,
      SysPermissionConditions
    >(api.sysPermission(), ComponentNameEnum.SYS_PERMISSION);

    const rowKey: SysPermissionProps = 'permissionId';

    const columns: QTableColumnProps = [
      { name: 'permissionName', field: 'permissionName', align: 'center', label: '权限名称' },
      { name: 'permissionCode', field: 'permissionCode', align: 'center', label: '权限代码' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    return {
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      toCreate,
      toEdit,
      findItems,
      deleteItemById,
      rowKey
    };
  }
});
</script>
