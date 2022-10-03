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
      <q-btn color="primary" label="新建范围" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-vector-intersection"
          tooltip="配置权限"
          @click="toAuthorize(props.row)"></h-dense-icon-button>
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
        <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2ApplicationConditions, OAuth2Scope } from '/@/lib/declarations';

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
      useTableItems<OAuth2Scope, OAuth2ApplicationConditions>(api.oauth2Scope(), ComponentNameEnum.OAUTH2_SCOPE);

    const selected = ref([]);
    const rowKey = 'scopeId' as keyof OAuth2Scope;

    const columns: QTableProps['columns'] = [
      { name: 'scopeCode', field: 'scopeCode', align: 'center', label: '范围代码' },
      { name: 'scopeName', field: 'scopeName', align: 'center', label: '范围名称' },
      { name: 'description', field: 'description', align: 'center', label: '说明' },
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
