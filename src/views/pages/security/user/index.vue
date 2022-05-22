<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #actions="{ item }">
				<h-tooltip-button
					color="purple"
					icon
					icon-name="mdi-clipboard-check-multiple"
					tooltip="编辑"
					:to="{ name: 'SysUserContent', params: { item: JSON.stringify(item) } }"
				></h-tooltip-button>
				<h-tooltip-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除"></h-tooltip-button>
			</template>
		</h-table>
		<v-btn :to="{ name: 'SysUserContent', params: { ddd: 'aaa' } }">编辑</v-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { SysUser } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useTableItem } from '/@/hooks';
import { HTable, HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'SysUser',

	components: {
		HTable,
		HTooltipButton,
	},

	setup() {
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
		const { tableItems, totalPages } = useTableItem<SysUser>(api.user);

		return {
			pageNumber,
			tableItems,
			totalPages,
			tableHeaders,
		};
	},
});
</script>
