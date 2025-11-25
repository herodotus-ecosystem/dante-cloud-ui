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
        prepend-title="roleCode"
        append-title="roleName"
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
  SysElementEntity,
  SysRoleConditions,
  SysRoleProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';

import { useTableItem, useTable } from '@/hooks';

import { HAuthorizeList, HAuthorizeLayout } from '@/composables/authorize';

export default defineComponent({
  name: 'SysElementAuthorize',

  components: {
    HAuthorizeList,
    HAuthorizeLayout,
  },

  setup(props) {
    const { editedItem, title, assign, overlay } = useTableItem<SysElementEntity>(
      API.core.sysElement(),
    );
    const { tableRows, pagination, loading } = useTable<SysRoleEntity, SysRoleConditions>(
      API.core.sysRole(),
      CONSTANTS.ComponentName.SYS_ROLE,
      true,
    );

    const selectedItems = ref([]) as Ref<Array<SysRoleEntity>>;
    const rowKey: SysRoleProps = 'roleId';

    const columns: QTableColumnProps = [
      { name: 'roleName', field: 'roleName', align: 'center', label: '角色名称' },
      { name: 'roleCode', field: 'roleCode', align: 'center', label: '角色代码' },
    ];

    onMounted(() => {
      selectedItems.value = editedItem.value.roles;
    });

    const onSave = () => {
      let elementId = editedItem.value.elementId;
      let roles = selectedItems.value.map((item) => item[rowKey]);
      assign({ elementId: elementId, roles: roles });
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
      onSave,
    };
  },
});
</script>
