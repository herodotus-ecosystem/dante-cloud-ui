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
									class="q-pb-none"
								></h-dictionary-select
							></h-column>
							<h-column :cols="2">
								<h-organization-select
									v-model="conditions.organizationId"
									:category="conditions.category"
									dense
									class="q-pb-none"
								></h-organization-select
							></h-column>
						</h-row>
					</q-card-section>
				</q-card> </q-expansion-item
		></q-list>
		<q-table
			:rows="tableRows"
			:columns="columns"
			row-key="departmentId"
			selection="single"
			v-model:selected="selected"
			v-model:pagination="pagination"
			:loading="loading"
		>
			<template #top-right="props">
				<q-toolbar>
					<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" />
				</q-toolbar>
			</template>

			<template #top-left>
				<q-btn color="primary" label="新建部门" :to="toCreate" />
			</template>

			<template #pagination>
				<h-pagination v-model="pagination.page" :max="totalPages" />
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

			<template #body-cell-actions="props">
				<q-td key="actions" :props="props">
					<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
					<h-button v-if="!props.row.reserved" flat round color="red" icon="mdi-delete" tooltip="删除" @click="remove(props.row.userId)"></h-button>
				</q-td>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysDepartment, SysDepartmentConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useHrApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HButton, HPagination, HStatusColumn, HReservedColumn, HRow, HColumn, HDictionarySelect, HOrganizationSelect } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_DEPARTMENT,

	components: {
		HButton,
		HPagination,
		HStatusColumn,
		HReservedColumn,
		HRow,
		HColumn,
		HDictionarySelect,
		HOrganizationSelect,
	},

	setup() {
		const api = useHrApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove, conditions } = useTableItems<
			SysDepartment,
			SysDepartmentConditions
		>(api.department, ComponentNameEnum.SYS_DEPARTMENT);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'departmentName', field: 'departmentName', align: 'center', label: '部门名称' },
			{ name: 'shortName', field: 'shortName', align: 'center', label: '部门简称' },
			{ name: 'partitionCode', field: 'partitionCode', align: 'center', label: '分区代码' },
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
			remove,
			conditions,
		};
	},
});
</script>
