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
        <h-edit-button @click="toAuthorize(props.row)"></h-edit-button>
        <h-delete-button
          v-if="!props.row.reserved"
          @click="deleteItemById(props.row[rowKey])"
        ></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  SysDefaultRoleEntity,
  SysDefaultRoleConditions,
  SysDefaultRoleProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { useTable } from '@/composables/hooks';

import { CONSTANTS, API } from '@/configurations';

import { HDeleteButton, HEditButton, HTable } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_DEFAULT_ROLE,

  components: {
    HDeleteButton,
    HEditButton,
    HTable,
  },

  setup() {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      toAuthorize,
      findItems,
      deleteItemById,
    } = useTable<SysDefaultRoleEntity, SysDefaultRoleConditions>(
      API.core.sysDefaultRole(),
      CONSTANTS.ComponentName.SYS_DEFAULT_ROLE,
    );

    const selected = ref([]);
    const rowKey: SysDefaultRoleProps = 'defaultId';

    const columns: QTableColumnProps = [
      { name: 'description', field: 'description', align: 'center', label: '名称' },
      { name: 'scene', field: 'scene', align: 'center', label: '代码' },
      {
        name: 'role',
        field: 'role',
        align: 'center',
        label: '角色代码',
        format: (value) => `${value.roleCode}`,
      },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
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
      deleteItemById,
    };
  },
});
</script>
