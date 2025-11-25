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
      <h-button color="primary" label="新建范围" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-vector-intersection"
          tooltip="配置权限"
          @click="toAuthorize(props.row)"
        ></h-dense-icon-button>
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
  OAuth2ApplicationConditions,
  OAuth2ScopeEntity,
  OAuth2ScopeProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { useTable } from '@/hooks';

import { HDenseIconButton, HDeleteButton, HEditButton, HTable } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.OAUTH2_SCOPE,

  components: {
    HDeleteButton,
    HDenseIconButton,
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
    } = useTable<OAuth2ScopeEntity, OAuth2ApplicationConditions>(
      API.core.oauth2Scope(),
      CONSTANTS.ComponentName.OAUTH2_SCOPE,
    );

    const selected = ref([]);
    const rowKey: OAuth2ScopeProps = 'scopeId';

    const columns: QTableColumnProps = [
      { name: 'scopeCode', field: 'scopeCode', align: 'center', label: '范围代码' },
      { name: 'scopeName', field: 'scopeName', align: 'center', label: '范围名称' },
      { name: 'description', field: 'description', align: 'center', label: '说明' },
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
