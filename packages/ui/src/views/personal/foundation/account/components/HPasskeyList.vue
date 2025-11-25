<template>
  <div>
    <div class="text-h6 q-my-md">Passkey(无密码登录)</div>
    <q-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      flat
      bordered
      hide-bottom
      :loading="loading"
    >
      <template v-slot:top>
        <h-button
          :disabled="isRegisterButtonDisable"
          color="primary"
          label="通行密钥"
          @click="openDialog = !openDialog"
        />
      </template>
      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-delete-button
            v-if="!props.row.reserved"
            @click="onDelete(props.row[rowKey])"
          ></h-delete-button>
        </q-td>
      </template>
    </q-table>
    <h-passkey-register-dialog v-model="openDialog" @save="onSave"></h-passkey-register-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, computed, ref } from 'vue';

import type {
  OAuth2CredentialRecordEntity,
  OAuth2CredentialRecordConditions,
  OAuth2CredentialRecordProps,
  QTableColumnProps,
  HttpResult,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { moment, toast, standardDeleteNotify } from '@/lib/utils';
import { useTable } from '@/hooks';
import {
  useAuthenticationStore,
  SecurityApiResources,
  usePasskey,
} from '@herodotus-cloud/framework-kernel';

import { HDeleteButton } from '@/components';

import HPasskeyRegisterDialog from './HPasskeyRegisterDialog.vue';

export default defineComponent({
  name: 'HPasskeyList',

  components: {
    HDeleteButton,
    HPasskeyRegisterDialog,
  },

  setup() {
    const store = useAuthenticationStore();

    const { tableRows, pagination, loading, findItems, conditions } = useTable<
      OAuth2CredentialRecordEntity,
      OAuth2CredentialRecordConditions
    >(API.core.oauth2CredentialRecord(), CONSTANTS.ComponentName.OAUTH2_CREDENTIAL_RECORD, true);
    const { isSupported } = usePasskey();

    const rowKey: OAuth2CredentialRecordProps = 'credentialId';

    const columns: QTableColumnProps = [
      {
        name: 'index',
        label: '序号',
        field: 'index',
      },
      { name: 'label', field: 'label', align: 'center', label: '标签' },
      {
        name: 'created',
        field: 'created',
        align: 'center',
        label: '创建时间',
        format: (value) => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      {
        name: 'lastUsed',
        field: 'lastUsed',
        align: 'center',
        label: '更新时间',
        format: (value) => (value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''),
      },
      { name: 'signatureCount', field: 'signatureCount', align: 'center', label: '签名数量' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const openDialog = ref(false);

    const fetchItems = () => {
      conditions.value.username = store.username;
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
    };

    const onDelete = (id: string) => {
      standardDeleteNotify(() => {
        SecurityApiResources.getInstance()
          .passkey()
          .delete(id)
          .then((response) => {
            const result = response as HttpResult<string>;
            if (result.message) {
              toast.success(result.message);
            } else {
              toast.success('删除成功');
              fetchItems();
            }
          })
          .catch((error) => {
            if (error.message) {
              toast.error(error.message);
            } else {
              toast.error('删除失败');
            }
          });
      });
    };

    const onSave = () => {
      openDialog.value = false;
      fetchItems();
    };

    const isRegisterButtonDisable = computed(() => {
      return !isSupported();
    });

    onMounted(() => {
      fetchItems();
    });

    watch(tableRows, (newValue) => {
      if (newValue) {
        newValue.forEach((row, index) => {
          //@ts-ignore
          row.index = index + 1;
        });
      }
    });

    return {
      tableRows,
      columns,
      rowKey,
      pagination,
      onDelete,
      loading,
      openDialog,
      isRegisterButtonDisable,
      onSave,
    };
  },
});
</script>
