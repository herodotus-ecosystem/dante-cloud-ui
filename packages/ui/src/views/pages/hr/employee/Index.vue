<template>
  <div class="q-gutter-y-md">
    <h-employee-condition v-model:conditions="conditions"></h-employee-condition>
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
        <h-button color="primary" label="新建人员" @click="toCreate" />
      </template>

      <template #body-cell-gender="props">
        <q-td key="gender" :props="props">
          {{ getDictionaryItemDisplay('Gender', props.row.gender) }}
        </q-td>
      </template>

      <template #body-cell-identity="props">
        <q-td key="identity" :props="props">
          {{ getDictionaryItemDisplay('Identity', props.row.identity) }}
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type {
  SysEmployeeEntity,
  SysEmployeeConditions,
  SysEmployeeProps,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { useTable } from '@/composables/hooks';

import { HDeleteButton, HEditButton, HTable } from '@/components';
import { HEmployeeCondition } from '../components';
import { useDictionary } from '@/composables/constants';

export default defineComponent({
  name: CONSTANTS.ComponentName.SYS_EMPLOYEE,

  components: {
    HDeleteButton,
    HEditButton,
    HEmployeeCondition,
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
      conditions,
      findItems,
      deleteItemById,
    } = useTable<SysEmployeeEntity, SysEmployeeConditions>(
      API.core.sysEmployee(),
      CONSTANTS.ComponentName.SYS_EMPLOYEE,
    );

    const { getDictionaryItemDisplay } = useDictionary('Gender', 'identity');

    const selected = ref([]);
    const rowKey: SysEmployeeProps = 'employeeId';

    const columns: QTableColumnProps = [
      { name: 'employeeName', field: 'employeeName', align: 'center', label: '人员姓名' },
      { name: 'gender', field: 'gender', align: 'center', label: '性别' },
      { name: 'identity', field: 'identity', align: 'center', label: '身份' },
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
      deleteItemById,
      conditions,
      findItems,
      getDictionaryItemDisplay,
    };
  },
});
</script>
