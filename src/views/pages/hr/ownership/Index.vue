<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #actions="{ item }">
				<h-tooltip-button color="purple" icon icon-name="mdi-clipboard-check-multiple" tooltip="编辑"></h-tooltip-button>
				<h-tooltip-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除"></h-tooltip-button>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { SysAuthority } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useTableItem } from '/@/hooks';
import { HTable, HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'SysOwnership',

	components: {
		HTable,
		HTooltipButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '姓名', align: 'center', value: 'employeeName' },
			{ text: '身份', align: 'center', value: 'identity' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useSecurityApi();
		const { tableItems, totalPages, pagination } = useTableItem<SysAuthority>(api.authority);

		watch(pageNumber, (newValue: number) => {
			pagination(newValue);
		});

		return {
			pageNumber,
			tableItems,
			totalPages,
			tableHeaders,
		};
	},
});
</script>
