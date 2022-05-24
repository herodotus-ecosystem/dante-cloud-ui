<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #top>
				<v-btn color="primary" :to="toCreate">新建用户</v-btn>
			</template>
			<template #actions="{ item }">
				<h-button color="purple" icon icon-name="mdi-clipboard-check-multiple" tootip="编辑" :to="toEdit(item)"></h-button>
				<h-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除" @click="remove(item.userId)"></h-button>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { SysUser } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';

import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.SYS_USER,

	components: {
		HTable,
		HButton,
	},

	setup(props, context) {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '用户名', align: 'center', value: 'userName' },
			{ text: '昵称', align: 'center', value: 'nickName' },
			{ text: '备注', align: 'center', value: 'description' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useSecurityApi();
		const { tableItems, totalPages, toEdit, toCreate, remove } = useTableItems<SysUser>(api.user, ComponentName.SYS_USER);

		return {
			pageNumber,
			tableItems,
			totalPages,
			tableHeaders,
			toEdit,
			toCreate,
			remove,
		};
	},
});
</script>
