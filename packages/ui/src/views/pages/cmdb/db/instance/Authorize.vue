<template>
  <h-authorize-layout :title="title" :overlay="overlay">
    <q-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="multiple"
      v-model:selected="selectedItems"
      v-model:pagination="pagination"
      :loading="loading"
      class="q-mr-md"></q-table>

    <template #right>
      <h-authorize-list
        v-model="selectedItems"
        prepend-title="catalogId"
        append-title="catalogName"
        :row-key="rowKey"
        class="q-ml-md"
        @save="onSave()"></h-authorize-list>
    </template>
  </h-authorize-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';

import type {
  DatabaseCatalogEntity,
  DatabaseCatalogConditions,
  DatabaseInstanceEntity,
  DatabaseCatalogProps,
  QTableColumnProps
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTableItem, useTable } from '/@/hooks';

import { HAuthorizeList, HAuthorizeLayout } from '/@/components';

export default defineComponent({
  name: 'DatabaseInstanceAuthorize',

  components: {
    HAuthorizeList,
    HAuthorizeLayout
  },

  setup(props) {
    const { editedItem, title, assign, overlay } = useTableItem<DatabaseInstanceEntity>(api.dbInstance());
    const { tableRows, pagination, loading } = useTable<DatabaseCatalogEntity, DatabaseCatalogConditions>(
      api.dbCatalog(),
      ComponentNameEnum.DATABASE_CATALOG,
      true
    );

    const selectedItems = ref([]) as Ref<Array<DatabaseCatalogEntity>>;
    const rowKey: DatabaseCatalogProps = 'catalogId';

    const columns: QTableColumnProps = [
      { name: 'catalogName', field: 'catalogName', align: 'center', label: '数据库名称' }
    ];

    onMounted(() => {
      selectedItems.value = editedItem.value.catalogs;
    });

    const onSave = () => {
      let instanceId = editedItem.value.instanceId;
      let catalogs = selectedItems.value.map(item => item[rowKey]);
      assign({ instanceId: instanceId, catalogs: catalogs });
    };

    return {
      title,
      overlay,
      tableRows,
      columns,
      rowKey,
      selectedItems,
      pagination,
      loading,
      onSave
    };
  }
});
</script>
