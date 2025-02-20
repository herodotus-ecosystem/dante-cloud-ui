<template>
  <h-table
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    selection="single"
    v-model:pagination="pagination"
    v-model:pageNumber="pagination.page"
    :totalPages="totalPages"
    :loading="loading"
    status
    reserved
    @request="findItems"
  >
    <template #top-left>
      <q-btn color="primary" label="新建应用" @click="toCreate()" />
    </template>

    <template #body-cell-authorizationGrantTypes="props">
      <q-td key="authorizationGrantTypes" :props="props">
        <h-grant-type-column :items="props.row.authorizationGrantTypes"></h-grant-type-column>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  OAuth2ApplicationEntity,
  OAuth2ApplicationConditions,
  OAuth2ApplicationProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { ComponentNameEnum } from '@/lib/enums';
import { moment, api } from '@/lib/utils';
import { useTable } from '@/hooks';

import { HDeleteButton, HEditButton, HTable, HGrantTypeColumn } from '@/components';

export default defineComponent({
  name: ComponentNameEnum.OAUTH2_APPLICATION,

  components: {
    HDeleteButton,
    HEditButton,
    HGrantTypeColumn,
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
    } = useTable<OAuth2ApplicationEntity, OAuth2ApplicationConditions>(
      api.oauth2Application(),
      ComponentNameEnum.OAUTH2_APPLICATION,
    );

    const rowKey: OAuth2ApplicationProps = 'applicationId';
    const selected = ref([]);

    const columns: QTableColumnProps = [
      { name: 'applicationName', field: 'applicationName', align: 'center', label: '应用名称' },
      { name: 'abbreviation', field: 'abbreviation', align: 'center', label: '应用简称' },
      {
        name: 'authorizationGrantTypes',
        field: 'authorizationGrantTypes',
        align: 'center',
        label: '认证模式',
      },
      {
        name: 'accessTokenValidity',
        field: 'accessTokenValidity',
        align: 'center',
        label: '令牌有效期',
        format: (value) => formatDuration(value),
      },
      {
        name: 'refreshTokenValidity',
        field: 'refreshTokenValidity',
        align: 'center',
        label: '刷新令牌有效期',
        format: (value) => formatDuration(value),
      },
      {
        name: 'authorizationCodeValidity',
        field: 'authorizationCodeValidity',
        align: 'center',
        label: '授权码有效期',
        format: (value) => formatDuration(value),
      },
      {
        name: 'deviceCodeValidity',
        field: 'deviceCodeValidity',
        align: 'center',
        label: '激活码有效期',
        format: (value) => formatDuration(value),
      },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const formatDuration = (date: string): string => {
      return moment.duration(date, 'seconds').humanize();
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
    };
  },
});
</script>
