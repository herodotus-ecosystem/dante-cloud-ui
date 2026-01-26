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
    <template #top-left>
      <h-button color="primary" label="新建数据源" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
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
  SysTenantDataSourceEntity,
  SysTenantDataSourceConditions,
  SysTenantDataSourceProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useTable } from '@/composables/hooks';

import { HDeleteButton, HEditButton, HDenseIconButton, HTable } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_TENANT_DATA_SOURCE,

  components: { HDeleteButton, HEditButton, HDenseIconButton, HTable },

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
    } = useTable<SysTenantDataSourceEntity, SysTenantDataSourceConditions>(
      API.core.sysTenantDataSource(),
      CONSTANTS.ComponentName.SYS_TENANT_DATA_SOURCE,
    );

    const selected = ref([]);
    const rowKey: SysTenantDataSourceProps = 'datasourceId';

    const columns: QTableColumnProps = [
      { name: 'tenantId', field: 'tenantId', align: 'center', label: '租户标识ID' },
      { name: 'username', field: 'username', align: 'center', label: '数据库用户名' },
      { name: 'password', field: 'password', align: 'center', label: '数据库密码' },
      { name: 'driverClassName', field: 'driverClassName', align: 'center', label: '驱动' },
      { name: 'url', field: 'url', align: 'center', label: 'url' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
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
