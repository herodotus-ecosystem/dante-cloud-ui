<template>
  <h-full-width-layout title="配置人员归属">
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
            {{ parseGender(props.row) }}
          </q-td>
        </template>

        <template #body-cell-identity="props">
          <q-td key="identity" :props="props">
            {{ parseIdentity(props.row) }}
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
} from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { lodash, toast, api } from '/@/lib/utils';
import { useTable, useTableItem, useEmployeeDisplay, useEditFinish } from '/@/hooks';

import { HEmployeeCondition, HFullWidthLayout, HTable } from '/@/components';

export default defineComponent({
  name: 'SysOwnershipContent',

  components: {
    HEmployeeCondition,
    HFullWidthLayout,
    HTable,
  },

  setup(props) {
    const { onFinish } = useEditFinish();
    const { parseGender, parseIdentity } = useEmployeeDisplay();
    const { editedItem, title, overlay } = useTableItem<SysEmployeeAllocatable>(
      api.sysEmployeeAllocatable(),
    );
    const { tableRows, totalPages, pagination, loading, conditions, findItems } = useTable<
      SysEmployeeEntity,
      SysEmployeeConditions
    >(api.sysEmployee(), ComponentNameEnum.SYS_EMPLOYEE);

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
        api
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
      parseGender,
      parseIdentity,
      findItems,
      onSave,
      title,
    };
  },
});
</script>
