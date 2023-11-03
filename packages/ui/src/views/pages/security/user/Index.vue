<template>
  <div>
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
        <h-button color="primary" label="新建用户" @click="toCreate" />
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-dense-icon-button
            v-if="showMessageAction(props.row)"
            color="warning"
            icon="mdi-email-edit"
            tooltip="发送消息"
            @click="onSendMessageToUser(props.row)"></h-dense-icon-button>
          <h-dense-icon-button
            color="orange"
            icon="mdi-key-chain"
            tooltip="设置/修改密码"
            @click="onChangePassword(props.row)"></h-dense-icon-button>
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
    <h-change-password v-model="showChangePasswordDialog" :user-id="currentUserId"></h-change-password>
    <h-send-message-to-user
      v-model="showSendMessageToUserDialog"
      :id="currentUserId"
      :name="currentUsername"
      :avatar="currentUserAvatar"></h-send-message-to-user>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { SysUserEntity, SysUserConditions, SysUserProps, QTableColumnProps } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';

import { useAuthenticationStore } from '/@/stores';
import { useTable } from '/@/hooks';

import {
  HChangePassword,
  HDeleteButton,
  HEditButton,
  HDenseIconButton,
  HTable,
  HSendMessageToUser
} from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.SYS_USER,

  components: {
    HChangePassword,
    HDeleteButton,
    HEditButton,
    HDenseIconButton,
    HTable,
    HSendMessageToUser
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } =
      useTable<SysUserEntity, SysUserConditions>(api.sysUser(), ComponentNameEnum.SYS_USER);

    const selected = ref([]);
    const rowKey: SysUserProps = 'userId';
    const showChangePasswordDialog = ref(false);
    const showSendMessageToUserDialog = ref(false);
    const currentUserId = ref('');
    const currentUsername = ref('');
    const currentUserAvatar = ref('');
    const store = useAuthenticationStore();

    const columns: QTableColumnProps = [
      { name: 'username', field: 'username', align: 'center', label: '用户名' },
      { name: 'nickname', field: 'nickname', align: 'center', label: '昵称' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
    ];

    const onChangePassword = (item: SysUserEntity) => {
      showChangePasswordDialog.value = true;
      currentUserId.value = item.userId;
    };

    const onSendMessageToUser = (item: SysUserEntity) => {
      showSendMessageToUserDialog.value = true;
      currentUserId.value = item.userId;
      currentUsername.value = item.nickname;
      currentUserAvatar.value = item.avatar as string;
    };

    const showMessageAction = (item: SysUserEntity) => {
      return item.userId !== store.userId;
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
      showChangePasswordDialog,
      showSendMessageToUserDialog,
      showMessageAction,
      currentUserId,
      currentUsername,
      currentUserAvatar,
      onChangePassword,
      onSendMessageToUser
    };
  }
});
</script>
