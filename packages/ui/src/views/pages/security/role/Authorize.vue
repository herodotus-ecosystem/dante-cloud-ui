<template>
  <h-authorize-layout :title="title" :overlay="overlay">
    <q-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="multiple"
      v-model:selected="selectedItems"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :loading="loading"
      class="q-mr-md"
    ></q-table>

    <template #right>
      <h-authorize-list
        v-model="selectedItems"
        prepend-title="permissionCode"
        append-title="permissionName"
        :row-key="rowKey"
        class="q-ml-md"
        @save="onSave()"
      ></h-authorize-list>
    </template>
  </h-authorize-layout>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, onMounted } from 'vue';

import type {
  SysRoleEntity,
  SysPermissionEntity,
  SysPermissionConditions,
  SysPermissionProps,
  QTableColumnProps,
} from '@/composables/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useTableItem, useTable } from '@/composables/hooks';

import { HAuthorizeList, HAuthorizeLayout } from '@/components';

export default defineComponent({
  name: 'SysRoleAuthorize',

  components: {
    HAuthorizeList,
    HAuthorizeLayout,
  },

  setup(props) {
    const { editedItem, title, assign, overlay } = useTableItem<SysRoleEntity>(API.core.sysRole());

    const { tableRows, totalPages, pagination, loading } = useTable<
      SysPermissionEntity,
      SysPermissionConditions
    >(API.core.sysPermission(), CONSTANTS.ComponentName.SYS_PERMISSION, true);

    const selectedItems = ref([]) as Ref<Array<SysPermissionEntity>>;
    const rowKey: SysPermissionProps = 'permissionId';

    const columns: QTableColumnProps = [
      { name: 'permissionName', field: 'permissionName', align: 'center', label: '权限名称' },
      { name: 'permissionCode', field: 'permissionCode', align: 'center', label: '权限代码' },
    ];

    onMounted(() => {
      selectedItems.value = editedItem.value.permissions;
    });

    const onSave = () => {
      let roleId = editedItem.value.roleId;
      let permissions = selectedItems.value.map((item) => item[rowKey]);
      assign({ roleId: roleId, permissions: permissions });
    };

    return {
      selectedItems,
      pagination,
      columns,
      tableRows,
      totalPages,
      loading,
      overlay,
      title,
      rowKey,
      onSave,
    };
  },
});
</script>
