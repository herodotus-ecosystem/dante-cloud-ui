<template>
	<q-table
		:rows="tableRows"
		:columns="columns"
		row-key="userId"
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
			<q-btn color="primary" label="新建用户" :to="toCreate" />
		</template>

		<template #pagination>
			<h-pagination v-model="pagination.page" :max="totalPages" />
		</template>

		<template #body-cell-reserved="props">
			<q-td key="reserved" :props="props">
				<h-table-item-chip :status="props.row.reserved"></h-table-item-chip>
			</q-td>
		</template>

		<template #body-cell-status="props">
			<q-td key="status" :props="props">
				<h-table-item-status :type="props.row.status"></h-table-item-status>
			</q-td>
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-button flat round color="brown" icon="mdi-shield-key" tooltip="配置角色" :to="toAuthorize(props.row)"></h-button>
				<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
				<h-button v-if="!props.row.reserved" flat round color="red" icon="mdi-delete" tooltip="删除" @click="remove(props.row.userId)"></h-button>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysUser } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HButton, HPagination, HTableItemChip, HTableItemStatus } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_USER,

	components: {
		HButton,
		HPagination,
		HTableItemChip,
		HTableItemStatus,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, remove } = useTableItems<SysUser>(
			api.user,
			ComponentNameEnum.SYS_USER
		);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'userName', field: 'userName', align: 'center', label: '用户名' },
			{ name: 'nickName', field: 'nickName', align: 'center', label: '昵称' },
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
			remove,
		};
	},
});
</script>
