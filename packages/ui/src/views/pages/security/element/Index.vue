<template>
  <div class="q-gutter-y-md">
    <h-element-condition v-model:conditions="conditions"></h-element-condition>
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
        <q-btn color="primary" label="新建菜单" @click="toCreate" />
      </template>

      <template #body-cell-icon="props">
        <q-td key="icon" :props="props">
          <h-dense-icon-button color="primary" :icon="props.row.icon" :tooltip="props.row.icon"></h-dense-icon-button>
        </q-td>
      </template>

      <template #body-cell-isHaveChild="props">
        <q-td key="isHaveChild" :props="props">
          <h-boolean-column :value="props.row.isHaveChild"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isNotKeepAlive="props">
        <q-td key="isNotKeepAlive" :props="props">
          <h-boolean-column :value="props.row.isNotKeepAlive"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isHideAllChild="props">
        <q-td key="isHideAllChild" :props="props">
          <h-boolean-column :value="props.row.isHideAllChild"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isDetailContent="props">
        <q-td key="isDetailContent" :props="props">
          <h-boolean-column :value="props.row.isDetailContent"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-isIgnoreAuth="props">
        <q-td key="isIgnoreAuth" :props="props">
          <h-boolean-column :value="props.row.isIgnoreAuth"></h-boolean-column>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-dense-icon-button
            color="brown"
            icon="mdi-badge-account-alert"
            tooltip="配置角色"
            @click="toAuthorize(props.row)"></h-dense-icon-button>
          <h-edit-button @click="toEdit(props.row)"></h-edit-button>
          <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
        </q-td>
      </template>
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { SysElement, SysElementConditions, QTableProps } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';

import { useTableItems } from '/@/hooks';

import { HDeleteButton, HEditButton, HTable, HBooleanColumn, HDenseIconButton, HElementCondition } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.SYS_ELEMENT,

  components: {
    HBooleanColumn,
    HElementCondition,
    HDenseIconButton,
    HDeleteButton,
    HEditButton,
    HTable
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
      conditions
    } = useTableItems<SysElement, SysElementConditions>(api.sysElement(), ComponentNameEnum.SYS_ELEMENT, false, {
      direction: 'ASC',
      properties: ['path']
    });

    const selected = ref([]);
    const rowKey = 'elementId' as keyof SysElement;

    const columns: QTableProps['columns'] = [
      { name: 'title', field: 'title', align: 'center', label: '标题' },
      { name: 'name', field: 'name', align: 'center', label: '组件名称' },
      { name: 'path', field: 'path', align: 'center', label: '请求路径' },
      { name: 'icon', field: 'icon', align: 'center', label: '图标' },
      { name: 'isHaveChild', field: 'isHaveChild', align: 'center', label: '有子节点' },
      { name: 'isHideAllChild', field: 'isHideAllChild', align: 'center', label: '隐藏下级节点' },
      { name: 'isDetailContent', field: 'isDetailContent', align: 'center', label: '三级路由' },
      { name: 'isNotKeepAlive', field: 'isNotKeepAlive', align: 'center', label: '不缓存' },
      { name: 'isIgnoreAuth', field: 'isIgnoreAuth', align: 'center', label: '忽略认证' },
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
      deleteItemById,
      conditions
    };
  }
});
</script>
