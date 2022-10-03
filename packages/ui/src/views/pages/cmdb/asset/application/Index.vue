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
      <q-btn color="primary" label="新建应用系统" @click="toCreate" />
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-application-cog"
          tooltip="分配服务器"
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
import type { AssetApplication, AssetApplicationConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTableItems } from '/@/hooks';

import { HDenseIconButton, HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.ASSET_APPLICATION,

  components: {
    HDeleteButton,
    HDenseIconButton,
    HEditButton,
    HTable
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } =
      useTableItems<AssetApplication, AssetApplicationConditions>(
        api.assetApplication(),
        ComponentNameEnum.ASSET_APPLICATION
      );

    const selected = ref([]);
    const rowKey = 'applicationId' as keyof AssetApplication;

    const columns: QTableProps['columns'] = [
      { name: 'applicationName', field: 'applicationName', align: 'center', label: '应用系统名称' },
      { name: 'department', field: 'department', align: 'center', label: '管理部门' },
      { name: 'employee', field: 'employee', align: 'center', label: '管理部门负责人' },
      { name: 'protectionGrade', field: 'protectionGrade', align: 'center', label: '等保定级' },
      { name: 'protectionFilingNo', field: 'protectionFilingNo', align: 'center', label: '等保备案编号' },
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
