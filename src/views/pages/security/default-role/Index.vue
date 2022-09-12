<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		row-key="defaultId"
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
			<q-btn color="primary" label="新建默认角色" @click="toCreate" />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-edit-button @click="toAuthorize(props.row)"></h-edit-button>
				<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row.userId)"></h-delete-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysDefaultRole, SysDefaultRoleConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_DEFAULT_ROLE,

	components: {
		HDeleteButton,
		HEditButton,
		HTable,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } = useTableItems<
			SysDefaultRole,
			SysDefaultRoleConditions
		>(api.defaultRole, ComponentNameEnum.SYS_DEFAULT_ROLE);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'description', field: 'description', align: 'center', label: '名称' },
			{ name: 'scene', field: 'scene', align: 'center', label: '代码' },
			{ name: 'role', field: 'role', align: 'center', label: '角色代码', format: (value) => `${value.roleCode}` },
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
			toAuthorize,
			findItems,
			deleteItemById,
		};
	},
});
</script>
