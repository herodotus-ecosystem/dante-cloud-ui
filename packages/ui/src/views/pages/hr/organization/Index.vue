<template>
  <div class="q-gutter-y-md">
    <q-list>
      <q-expansion-item label="查询条件：" default-opened>
        <q-card>
          <q-card-section>
            <h-row align="center">
              <h-column :cols="2">
                <h-dictionary-select
                  v-model="conditions.category"
                  dictionary="OrganizationCategory"
                  label="组织类别"
                  dense
                  class="q-pb-none"
                ></h-dictionary-select>
              </h-column>
            </h-row>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

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
        <h-button color="primary" label="新建单位" @click="toCreate" />
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
  SysOrganizationEntity,
  SysOrganizationConditions,
  SysOrganizationProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { useTable } from '@/composables/hooks';

import { HDeleteButton, HEditButton, HTable, HDictionarySelect } from '@/components';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_ORGANIZATION,

  components: {
    HDeleteButton,
    HDictionarySelect,
    HEditButton,
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
      findItems,
      deleteItemById,
      conditions,
    } = useTable<SysOrganizationEntity, SysOrganizationConditions>(
      API.core.sysOrganization(),
      CONSTANTS.ComponentName.SYS_ORGANIZATION,
    );

    const selected = ref([]);
    const rowKey: SysOrganizationProps = 'organizationId';
    const categroy = ref('');

    const columns: QTableColumnProps = [
      { name: 'organizationName', field: 'organizationName', align: 'center', label: '单位名称' },
      { name: 'shortName', field: 'shortName', align: 'center', label: '单位简称' },
      { name: 'partitionCode', field: 'partitionCode', align: 'center', label: '分区代码' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

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
      findItems,
      deleteItemById,
      categroy,
      conditions,
    };
  },
});
</script>
