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
        prepend-title="accountId"
        append-title="username"
        :row-key="rowKey"
        class="q-ml-md"
        @save="onSave()"></h-authorize-list>
    </template>
  </h-authorize-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';

import type {
  DatabaseAccountEntity,
  DatabaseAccountConditions,
  DatabaseCatalogEntity,
  DatabaseAccountProps,
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
    const { editedItem, title, assign, overlay } = useTableItem<DatabaseCatalogEntity>(api.dbCatalog());
    const { tableRows, pagination, loading } = useTablebaseAccountEntity, DatabaseAccountConditions>(
      api.dbAccount(),
      ComponentNameEnum.DATABASE_ACCOUNT,
      true
    );

    const selectedItems = ref([]) as Ref<Array<DatabaseAccountEntity>>;
    const rowKey: DatabaseAccountProps = 'accountId';

    const columns: QTableColumnProps = [
      { name: 'username', field: 'username', align: 'center', label: '用户名' },
      { name: 'credentialsExpireAt', field: 'credentialsExpireAt', align: 'center', label: '密码过期日期' }
    ];

    onMounted(() => {
      selectedItems.value = editedItem.value.accounts;
    });

    const onSave = () => {
      let catalogId = editedItem.value.catalogId;
      let accounts = selectedItems.value.map(item => item[rowKey]);
      assign({ catalogId: catalogId, accounts: accounts });
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
