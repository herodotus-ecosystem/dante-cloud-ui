<template>
	<q-card>
		<h-row gutter="md" gutter-col horizontal>
			<h-column lg="3" md="3" sm="6" xs="12">
				<h-organization-tree v-model:selected="organizationId"></h-organization-tree>
			</h-column>
			<h-column lg="3" md="3" sm="6" xs="12">
				<h-department-tree v-model:selected="departmentId" :organizationId="organizationId"></h-department-tree>
			</h-column>
			<h-column lg="6" md="6" sm="6" xs="12">
				<q-table
					:rows="tableRows"
					:columns="columns"
					row-key="organizationId"
					selection="single"
					v-model:selected="selected"
					v-model:pagination="pagination"
					:loading="loading"
				>
					<template #pagination>
						<h-pagination v-model="pagination.page" :max="totalPages" />
					</template>

					<template #body-cell-actions="props">
						<q-td key="actions" :props="props">
							<h-button flat round color="red" icon="mdi-delete" tooltip="删除归属" @click="deleteAllocatable(props.row)"></h-button>
						</q-td>
					</template>
				</q-table>
			</h-column>
		</h-row>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import type { QTableProps } from 'quasar';
import type { SysEmployee, Page } from '/@/lib/declarations';

import { useHrApi } from '/@/apis';

import { HRow, HColumn, HOrganizationTree, HDepartmentTree } from '/@/components';

export default defineComponent({
	name: 'SysOwnership',

	components: {
		HColumn,
		HDepartmentTree,
		HOrganizationTree,
		HRow,
	},

	setup(props) {
		const organizationId = ref('');
		const departmentId = ref('');
		const loading = ref(false);
		const pagination = ref({
			sortBy: 'updateTime',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: 0,
		});
		const tableRows = ref([]) as Ref<Array<SysEmployee>>;
		const totalPages = ref(0);
		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'employeeName', field: 'employeeName', align: 'center', label: '姓名' },
			{ name: 'identity', field: 'identity', align: 'center', label: '身份' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		const api = useHrApi();

		const fetchAssignedByPage = (pageNumber = 1, pageSize: number, departmentId: string) => {
			api.employee
				.fetchAssignedByPage(
					{
						pageNumber: pageNumber - 1,
						pageSize: pageSize,
					},
					{ departmentId }
				)
				.then((result) => {
					const data = result.data as Page<SysEmployee>;
					loading.value = false;
					tableRows.value = data.content;
					totalPages.value = data.totalPages;
					pagination.value.rowsNumber = parseInt(data.totalElements, 0);
				})
				.catch(() => {
					loading.value = false;
				});
		};

		const deleteAllocatable = (item: SysEmployee) => {
			api.employee
				.deleteAllocatable({
					organizationId: organizationId.value,
					departmentId: departmentId.value,
					employeeId: item.employeeId,
				})
				.then(() => {
					fetchAssignedByPage(pagination.value.page, pagination.value.rowsPerPage, departmentId.value);
				});
		};

		watch(
			() => departmentId.value,
			(newValue) => {
				fetchAssignedByPage(pagination.value.page, pagination.value.rowsPerPage, newValue);
			}
		);

		watch(
			() => pagination.value.page,
			(newValue) => {
				fetchAssignedByPage(newValue, pagination.value.rowsPerPage, departmentId.value);
			}
		);

		return {
			organizationId,
			departmentId,
			tableRows,
			columns,
			pagination,
			selected,
			loading,
			totalPages,
			deleteAllocatable,
		};
	},
});
</script>
