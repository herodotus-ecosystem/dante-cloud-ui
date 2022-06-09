<template>
	<q-table :rows="tableRows" :columns="columns" row-key="userId" selection="single" v-model:selected="selected" v-model:pagination="pagination">
		<template #top-right="props">
			<q-toolbar>
				<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" />
			</q-toolbar>
		</template>

		<template #top-left>
			<q-btn color="primary" label="新建用户" :to="toCreate" />
		</template>

		<template #pagination>
			<q-pagination v-model="pagination.page" :max="totalPages" direction-links />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<q-btn flat round color="purple" icon="mdi-clipboard-edit" :to="toEdit(props.row)">
					<q-tooltip>编辑</q-tooltip>
				</q-btn>
				<q-btn flat round color="red" icon="mdi-delete" @click="remove(props.row.userId)">
					<q-tooltip>删除</q-tooltip>
				</q-btn>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysOrganization } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useHrApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

export default defineComponent({
	name: ComponentNameEnum.SYS_ORGANIZATION,

	setup(props) {
		const api = useHrApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<SysOrganization>(
			api.organization,
			ComponentNameEnum.SYS_ORGANIZATION
		);

		const selected = ref([]);
		const pagesNumber = ref(1);

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
			remove,
		};
	},
});
</script>
