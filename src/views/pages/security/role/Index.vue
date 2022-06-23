<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		row-key="roleId"
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
			<q-btn color="primary" label="新建角色" :to="toCreate" />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-dense-icon-button color="brown" icon="mdi-shield-key" tooltip="配置权限" :to="toAuthorize(props.row)"></h-dense-icon-button>
				<h-edit-button :to="toEdit(props.row)"></h-edit-button>
				<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row.userId)"></h-delete-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysRole, SysRoleConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HDeleteButton, HEditButton, HDenseIconButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_ROLE,

	components: { HDeleteButton, HEditButton, HDenseIconButton, HTable },

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } = useTableItems<
			SysRole,
			SysRoleConditions
		>(api.role, ComponentNameEnum.SYS_ROLE);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'roleName', field: 'roleName', align: 'center', label: '角色名称' },
			{ name: 'roleCode', field: 'roleCode', align: 'center', label: '角色代码' },
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
			toAuthorize,
			findItems,
			deleteItemById,
		};
	},
});
</script>
