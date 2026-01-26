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
    @request="findItems"
  >
    <template #body-cell-actions="props">
      <q-td key="actions" :props="props">
        <h-delete-button @click="deleteItemById(props.row[rowKey])"></h-delete-button>
      </q-td>
    </template>
  </h-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type {
  OAuth2AuthorizationEntity,
  OAuth2AuthorizationConditions,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { useTable } from '@/composables/hooks';
import { moment } from '@/lib/utils';

import { HDeleteButton, HTable } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.OAUTH2_TOKEN,

  components: {
    HDeleteButton,
    HTable,
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, findItems, deleteItemById } = useTable<
      OAuth2AuthorizationEntity,
      OAuth2AuthorizationConditions
    >(API.core.oauth2Authorization(), CONSTANTS.ComponentName.OAUTH2_TOKEN, false, {
      direction: 'DESC',
      properties: ['accessTokenIssuedAt'],
    });

    const selected = ref([]);
    const rowKey = 'id' as keyof OAuth2AuthorizationEntity;

    const dateFormat = (date: string) => {
      if (date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '';
      }
    };

    const columns: QTableColumnProps = [
      {
        name: 'registeredClientId',
        field: 'registeredClientId',
        align: 'center',
        label: '客户端ID',
      },
      { name: 'principalName', field: 'principalName', align: 'center', label: '用户名' },
      {
        name: 'authorizationGrantType',
        field: 'authorizationGrantType',
        align: 'center',
        label: '认证模式',
      },
      {
        name: 'accessTokenIssuedAt',
        field: 'accessTokenIssuedAt',
        align: 'center',
        label: '访问Token颁发时间',
        format: (value) => dateFormat(value),
      },
      {
        name: 'accessTokenExpiresAt',
        field: 'accessTokenExpiresAt',
        align: 'center',
        label: '访问Token过期时间',
        format: (value) => dateFormat(value),
      },
      {
        name: 'refreshTokenIssuedAt',
        field: 'refreshTokenIssuedAt',
        align: 'center',
        label: '刷新Token颁发时间',
        format: (value) => dateFormat(value),
      },
      {
        name: 'refreshTokenExpiresAt',
        field: 'refreshTokenExpiresAt',
        align: 'center',
        label: '刷新Token过期时间',
        format: (value) => dateFormat(value),
      },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];
    onMounted(() => {
      pagination.value.sortBy = 'accessTokenIssuedAt';
    });

    return {
      rowKey,
      selected,
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      findItems,
      deleteItemById,
    };
  },
});
</script>
