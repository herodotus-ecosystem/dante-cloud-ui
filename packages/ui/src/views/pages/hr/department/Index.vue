<template>
  <div class="q-gutter-y-md">
    <q-list>
      <q-expansion-item label="查询条件：" default-opened>
        <q-card>
          <q-card-section>
            <h-row align="center" gutter="md" horizontal>
              <h-column :cols="2">
                <h-dictionary-select
                  v-model="conditions.category"
                  dictionary="organizationCategory"
                  label="组织类别"
                  dense
                  class="q-pb-none"></h-dictionary-select>
              </h-column>
              <h-column :cols="2">
                <h-organization-select
                  v-model="conditions.organizationId"
                  :category="conditions.category"
                  dense
                  class="q-pb-none"></h-organization-select>
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
      @request="findItems">
      <template #top-left>
        <h-button color="primary" label="新建部门" @click="toCreate" />
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <h-edit-button @click="toEdit(props.row)"></h-edit-button>
          <h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
        </q-td>
      </template>
    </h-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  SysDepartmentEntity,
  SysDepartmentConditions,
  SysDepartmentProps,
  QTableColumnProps
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useTable } from '/@/hooks';

import { HDeleteButton, HDictionarySelect, HEditButton, HOrganizationSelect, HTable } from '/@/components';

export default defineComponent({
  name: ComponentNameEnum.SYS_DEPARTMENT,

  components: {
    HDeleteButton,
    HDictionarySelect,
    HEditButton,
    HOrganizationSelect,
    HTable
  },

  setup() {
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, deleteItemById, conditions } =
      useTable<SysDepartmentEntity, SysDepartmentConditions>(api.sysDepartment(), ComponentNameEnum.SYS_DEPARTMENT);

    const selected = ref([]);
    const rowKey: SysDepartmentProps = 'departmentId';

    const columns: QTableColumnProps = [
      { name: 'departmentName', field: 'departmentName', align: 'center', label: '部门名称' },
      { name: 'shortName', field: 'shortName', align: 'center', label: '部门简称' },
      { name: 'partitionCode', field: 'partitionCode', align: 'center', label: '分区代码' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' }
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
      conditions
    };
  }
});
</script>
