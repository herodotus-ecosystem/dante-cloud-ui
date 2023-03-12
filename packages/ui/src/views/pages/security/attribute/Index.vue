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
    <template #body-cell-requestMethod="props">
      <q-td key="requestMethod" :props="props">
        <h-swagger-column
          :method="props.row.requestMethod"
          :url="props.row.url"
          :description="props.row.description"></h-swagger-column>
      </q-td>
    </template>

    <template #body-cell-expression="props">
      <q-td key="expression" :props="props">
        {{ getText(props.row.expression) }}
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-dense-icon-button
          color="brown"
          icon="mdi-shield-key"
          tooltip="配置归属权限"
          @click="toAuthorize(props.row)"></h-dense-icon-button>
        <h-edit-button @click="toEdit(props.row)"></h-edit-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';

import type {
  ConstantDictionary,
  SysAttributeEntity,
  SysAttributeConditions,
  SysAttributeProps,
  QTableColumnProps
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { lodash, api } from '/@/lib/utils';
import { useTableItems } from '/@/hooks';
import { useConstantsStore } from '/@/stores';

import { HEditButton, HTable, HSwaggerColumn } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.SYS_ATTRIBUTE,

  components: {
    HEditButton,
    HTable,
    HSwaggerColumn
  },

  setup() {
    const constants = useConstantsStore();
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } =
      useTableItems<SysAttributeEntity, SysAttributeConditions>(
        api.sysAttribute(),
        ComponentNameEnum.SYS_ATTRIBUTE,
        false,
        { direction: 'ASC', properties: ['url'] }
      );

    const rowKey: SysAttributeProps = 'attributeId';

    const selected = ref([]);
    const index = ref({}) as Ref<Record<string, ConstantDictionary>>;

    const columns: QTableColumnProps = [
      { name: 'requestMethod', field: 'requestMethod', align: 'center', label: '权限接口' },
      { name: 'attributeCode', field: 'attributeCode', align: 'center', label: '默认权限代码' },
      { name: 'expression', field: 'expression', align: 'center', label: '特定表达式' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    onMounted(() => {
      const dictionary = constants.getDictionary('permissionExpression');
      dictionary.forEach(element => {
        index.value[element.key] = element;
      });
    });

    const getText = (key: string) => {
      let object = index.value[key];
      return lodash.get(object, 'text');
    };

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
      deleteItemById,
      findItems,
      getText
    };
  }
});
</script>
