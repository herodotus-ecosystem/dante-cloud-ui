<template>
  <h-full-width-layout title="配置人员归属" :overlay="overlay">
    <div class="q-gutter-y-md">
      <h-employee-condition v-model:conditions="conditions"></h-employee-condition>

      <h-table
        :rows="tableRows"
        :columns="columns"
        row-key="employeeId"
        selection="multiple"
        v-model:selected="selectedItems"
        v-model:pagination="pagination"
        v-model:pageNumber="pagination.page"
        :totalPages="totalPages"
        :loading="loading"
        status
        reserved
        @request="findItems"
      >
        <template #body-cell-gender="props">
          <q-td key="gender" :props="props">
            {{ getDictionaryItemDisplay('Gender', props.row.identity) }}
          </q-td>
        </template>

        <template #body-cell-identity="props">
          <q-td key="identity" :props="props">
            {{ getDictionaryItemDisplay('Identity', props.row.identity) }}
          </q-td>
        </template>
      </h-table>
    </div>

    <template #button>
      <q-btn color="primary" class="q-ml-sm" @click="onSave()">保存</q-btn>
    </template>
  </h-full-width-layout>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';

import type {
  SysEmployeeEntity,
  SysEmployeeConditions,
  SysEmployeeAllocatable,
  HttpResult,
  QTableColumnProps,
} from '@/lib/declarations';

import { CONSTANTS, API } from '@/configurations';
import { lodash, toast } from '@/lib/utils';
import { useTable, useTableItem, useEditFinish } from '@/hooks';

import { HFullWidthLayout, HTable } from '@/components';
import { HEmployeeCondition } from '../components';
import { useDictionary } from '@/composables/constants';

export default defineComponent({
  name: 'SysOwnershipContent',

  components: {
    HEmployeeCondition,
    HFullWidthLayout,
    HTable,
  },

  setup(props) {
    const { onFinish } = useEditFinish();
    const { getDictionaryItemDisplay } = useDictionary('Gender', 'identity');
    const { editedItem, title, overlay } = useTableItem<SysEmployeeAllocatable>(
      API.core.sysEmployeeAllocatable(),
    );
    const { tableRows, totalPages, pagination, loading, conditions, findItems } = useTable<
      SysEmployeeEntity,
      SysEmployeeConditions
    >(API.core.sysEmployee(), CONSTANTS.ComponentName.SYS_EMPLOYEE);

    const selectedItems = ref([]) as Ref<Array<SysEmployeeEntity>>;

    const columns: QTableColumnProps = [
      { name: 'employeeName', field: 'employeeName', align: 'center', label: '人员姓名' },
      { name: 'gender', field: 'gender', align: 'center', label: '性别' },
      { name: 'identity', field: 'identity', align: 'center', label: '身份' },
      { name: 'description', field: 'description', align: 'center', label: '备注' },
      { name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
      { name: 'status', field: 'status', align: 'center', label: '状态' },
    ];

    const onSave = () => {
      if (lodash.isEmpty(selectedItems.value)) {
        toast.warning('您还没有选择任何人员！');
      } else {
        overlay.value = true;
        API.core
          .sysEmployee()
          .saveAllocatable({
            organizationId: editedItem.value.organizationId,
            departmentId: editedItem.value.departmentId,
            employees: selectedItems.value,
          })
          .then((response) => {
            const result = response as HttpResult<string>;
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
      }
    };

    return {
      conditions,
      tableRows,
      totalPages,
      pagination,
      loading,
      columns,
      selectedItems,
      getDictionaryItemDisplay,
      findItems,
      onSave,
      title,
      overlay,
    };
  },
});
</script>
