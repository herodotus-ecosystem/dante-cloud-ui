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
      <h-button color="primary" label="新建产品" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-shield-key"
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
  OAuth2ProductEntity,
  OAuth2ProductConditions,
  OAuth2ProductProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { ComponentNameEnum } from '@/lib/enums';
import { api } from '@/lib/utils';

import { useTable } from '@/hooks';

import { HDeleteButton, HEditButton, HDenseIconButton, HTable } from '@/components';

export default defineComponent({
  name: ComponentNameEnum.OAUTH2_PRODUCT,

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
    } = useTable<OAuth2ProductEntity, OAuth2ProductConditions>(
      api.oauth2Product(),
      ComponentNameEnum.OAUTH2_PRODUCT,
    );

    const selected = ref([]);
    const rowKey: OAuth2ProductProps = 'productId';

    const columns: QTableColumnProps = [
      { name: 'productId', field: 'productId', align: 'center', label: '产品ID' },
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
