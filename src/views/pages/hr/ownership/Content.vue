<template>
	<h-full-width-layout title="配置人员归属">
		<div class="q-gutter-y-md">
			<h-employee-condition v-model:conditions="conditions"> </h-employee-condition>

			<h-table
				:rows="tableRows"
				:columns="columns"
				row-key="employeeId"
				selection="multiple"
				v-model:selected="selectedItems"
				v-model:pagination="pagination"
				:loading="loading"
			>
				<template #pagination>
					<h-pagination v-model="pagination.page" :max="totalPages" />
				</template>

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

				<template #body-cell-reserved="props">
					<q-td key="reserved" :props="props">
						<h-reserved-column :status="props.row.reserved"></h-reserved-column>
					</q-td>
				</template>

				<template #body-cell-status="props">
					<q-td key="status" :props="props">
						<h-status-column :type="props.row.status"></h-status-column>
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
import { defineComponent, ref, Ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysEmployee, SysEmployeeConditions, SysEmployeeAllocatable } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { lodash, toast } from '/@/lib/utils';

import { useHrApi } from '/@/apis';
import { useTableItems, useTableItem, useEmployeeDisplay, useEditFinish } from '/@/hooks';

import { HEmployeeCondition, HFullWidthLayout, HPagination, HReservedColumn, HTable, HStatusColumn } from '/@/components';

export default defineComponent({
	name: 'SysOwnershipContent',

	components: {
		HEmployeeCondition,
		HFullWidthLayout,
		HPagination,
		HReservedColumn,
		HTable,
		HStatusColumn,
	},

	setup(props) {
		const api = useHrApi();
		const { onFinish } = useEditFinish();
		const { parseGender, parseIdentity } = useEmployeeDisplay();
		const { editedItem, title, overlay } = useTableItem<SysEmployeeAllocatable>(api.allocatable);
		const { tableRows, totalPages, pagination, loading, conditions, remove } = useTableItems<SysEmployee, SysEmployeeConditions>(
			api.employee,
			ComponentNameEnum.SYS_EMPLOYEE
		);

		const selectedItems = ref([]) as Ref<Array<SysEmployee>>;

		const columns: QTableProps['columns'] = [
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
				api.employee
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
			onSave,
			title,
		};
	},
});
</script>
