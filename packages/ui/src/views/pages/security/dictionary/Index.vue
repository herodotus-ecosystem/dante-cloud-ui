<template>
  <div class="q-gutter-y-md">
    <h-dictionary-condition v-model:conditions="conditions"></h-dictionary-condition>
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
      <template #body-cell-name="props">
        <q-td key="names" :props="props">
          <q-chip
            :color="getColor(props.row)"
            text-color="white"
            :dense="settings.display.table.dense"
          >
            {{ props.row.name }}
          </q-chip>
        </q-td>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  SysDictionaryEntity,
  SysDictionaryConditions,
  SysDictionaryProps,
  QTableColumnProps,
} from '@/composables/declarations';

import { useTable } from '@/composables/hooks';
import { CONSTANTS, API } from '@/configurations';

import { HDeleteButton, HEditButton, HTable } from '@/components';
import { useSettingsStore } from '@herodotus-cloud/framework-kernel';
import HDictionaryCondition from './Search.vue';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_DICTIONARY,

  components: {
    HDeleteButton,
    HEditButton,
    HTable,
    HDictionaryCondition,
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
      conditions,
    } = useTable<SysDictionaryEntity, SysDictionaryConditions>(
      API.core.sysDictionary(),
      CONSTANTS.ComponentName.SYS_DICTIONARY,
    );

    const selected = ref([]);
    const rowKey: SysDictionaryProps = 'dictionaryId';

    const columns: QTableColumnProps = [
      { name: 'category', field: 'category', align: 'center', label: '分类' },
      { name: 'ordinal', field: 'ordinal', align: 'center', label: '索引值' },
      { name: 'name', field: 'name', align: 'center', label: '字面量' },
      { name: 'label', field: 'label', align: 'center', label: '显示值' },
      { name: 'value', field: 'value', align: 'center', label: '实际值' },
      { name: 'ranking', field: 'ranking', align: 'center', label: '排序值' },
      { name: 'valueType', field: 'valueType', align: 'center', label: '数据类型' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const settings = useSettingsStore();

    const getColor = (item: SysDictionaryEntity) => {
      return CONSTANTS.COLOR_LIST[item.ordinal];
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
      findItems,
      deleteItemById,
      conditions,
      getColor,
      settings,
    };
  },
});
</script>
