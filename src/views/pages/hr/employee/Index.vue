<template>
	<div class="q-gutter-y-md">
		<h-employee-condition v-model:conditions="conditions"></h-employee-condition>
		<h-table
			:rows="tableRows"
			:columns="columns"
			row-key="employeeId"
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
				<q-btn color="primary" label="新建人员" :to="toCreate" />
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

			<template #body-cell-actions="props">
				<q-td key="actions" :props="props">
					<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
					<h-button
						v-if="!props.row.reserved"
						flat
						round
						color="red"
						icon="mdi-delete"
						tooltip="删除"
						@click="deleteItemById(props.row.userId)"
					></h-button>
				</q-td>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysEmployee, SysEmployeeConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useHrApi } from '/@/apis';
import { useTableItems, useEmployeeDisplay } from '/@/hooks';

import { HButton, HEmployeeCondition, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_EMPLOYEE,

	components: {
		HButton,
		HEmployeeCondition,
		HTable,
	},

	setup() {
		const api = useHrApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, conditions,findItems, deleteItemById } = useTableItems<
			SysEmployee,
			SysEmployeeConditions
		>(api.employee, ComponentNameEnum.SYS_EMPLOYEE);

		const { parseGender, parseIdentity } = useEmployeeDisplay();

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'employeeName', field: 'employeeName', align: 'center', label: '人员姓名' },
			{ name: 'gender', field: 'gender', align: 'center', label: '性别' },
			{ name: 'identity', field: 'identity', align: 'center', label: '身份' },
			{ name: 'description', field: 'description', align: 'center', label: '备注' },
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		return {
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
			parseGender,
			parseIdentity,
		};
	},
});
</script>
