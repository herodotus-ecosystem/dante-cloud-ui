<template>
  <h-authorize-layout :title="title" :overlay="overlay">
    <h-table
      :rows="tableRows"
      :columns="columns"
      :row-key="rowKey"
      selection="multiple"
      v-model:selected="selectedItems"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :loading="loading"
      class="q-mr-md"
    ></h-table>

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
  HttpResult,
  SysPermissionEntity,
  SysPermissionConditions,
  SysPermissionProps,
  OAuth2ScopeEntity,
  OAuth2ScopeAssignedBody,
  OAuth2PermissionBody,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { toast } from '@herodotus-cloud/core';
import { useTableItem, useTable, useEditFinish } from '@/composables/hooks';

import { HTable } from '@/components';
import { HAuthorizeList, HAuthorizeLayout } from '@/components';

export default defineComponent({
  name: 'OAuth2ScopeAuthorize',

  components: {
    HAuthorizeList,
    HAuthorizeLayout,
    HTable,
  },

  setup(props) {
    const { editedItem, title, assign, overlay } = useTableItem<OAuth2ScopeEntity>(
      API.core.oauth2Scope(),
    );
    const { tableRows, pagination, loading } = useTable<
      SysPermissionEntity,
      SysPermissionConditions
    >(API.core.sysPermission(), CONSTANTS.ComponentName.SYS_PERMISSION, true);

    const selectedItems = ref([]) as Ref<Array<SysPermissionEntity>>;
    const rowKey: SysPermissionProps = 'permissionId';

    const columns: QTableColumnProps = [
      { name: 'permissionName', field: 'permissionName', align: 'center', label: '权限名称' },
      { name: 'permissionCode', field: 'permissionCode', align: 'center', label: '权限代码' },
    ];

    const { onFinish } = useEditFinish();

    onMounted(() => {
      selectedItems.value = editedItem.value.permissions;
    });

    const onSave = () => {
      let scopeId = editedItem.value.scopeId;
      let permissions: Array<OAuth2PermissionBody> = selectedItems.value.map((item) => {
        return {
          permissionId: item.permissionId,
          permissionCode: item.permissionCode,
          permissionName: item.permissionName,
        };
      });
      let data: OAuth2ScopeAssignedBody = { scopeId: scopeId, permissions: permissions };
      API.core
        .oauth2Scope()
        .assigned(data)
        .then((response) => {
          const result = response as HttpResult<OAuth2ScopeEntity>;
          overlay.value = false;
          onFinish();
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('保存成功');
          }
        })
        .catch(() => {
          overlay.value = false;
          onFinish();
          toast.error('保存失败');
        });
    };

    return {
      selectedItems,
      pagination,
      columns,
      tableRows,
      loading,
      overlay,
      title,
      rowKey,
      onSave,
    };
  },
});
</script>
