<template>
  <h-row gutter="md" gutter-col horizontal>
    <h-column lg="2" md="2" sm="6" xs="12">
      <h-organization-tree v-model:selected="organizationId"></h-organization-tree>
    </h-column>
    <h-column lg="10" md="10" sm="6" xs="12">
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
        @request="findItemsWithCondition"
      >
        <template #top-left>
          <h-button
            :disable="!organizationId"
            color="primary"
            label="新建部门"
            @click="toCreate(additionalData)"
          />
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
    </h-column>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  SysDepartmentEntity,
  SysDepartmentConditions,
  SysDepartmentProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { useTable } from '@/composables/hooks';

import { HDeleteButton, HEditButton, HTable } from '@/components';
import { HOrganizationSelect } from '../components';
import { HDictionarySelect } from '@/composables/constants';

import { HOrganizationTree } from '../components';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_DEPARTMENT,

  components: {
    HDeleteButton,
    HDictionarySelect,
    HEditButton,
    HOrganizationSelect,
    HTable,
    HOrganizationTree,
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
    } = useTable<SysDepartmentEntity, SysDepartmentConditions>(
      API.core.sysDepartment(),
      CONSTANTS.ComponentName.SYS_DEPARTMENT,
      false,
      {},
      false,
    );

    const selected = ref([]);
    const rowKey: SysDepartmentProps = 'departmentId';

    const columns: QTableColumnProps = [
      { name: 'departmentName', field: 'departmentName', align: 'center', label: '部门名称' },
      { name: 'shortName', field: 'shortName', align: 'center', label: '部门简称' },
      { name: 'partitionCode', field: 'partitionCode', align: 'center', label: '分区代码' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
      { name: 'actions', field: 'actions', align: 'center', label: '操作' },
    ];

    const organizationId = shallowRef('');

    const findItemsWithCondition = () => {
      if (organizationId.value) {
        findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
      }
    };

    const additionalData = computed(() => {
      return {
        organizationId: organizationId.value,
      };
    });

    watch(organizationId, (newValue) => {
      conditions.value.organizationId = newValue;
    });

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
      conditions,
      organizationId,
      findItemsWithCondition,
      additionalData,
    };
  },
});
</script>
