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

import type { SysOrganization } from '/@/lib/declarations';

import { useHrApi } from '/@/apis';
import { useFetchByPage } from '/@/hooks';
import { HTable, HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'SysOrganization',

	components: {
		HTable,
		HTooltipButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '单位名称', align: 'center', value: 'organizationName' },
			{ text: '单位简称', align: 'center', value: 'shortName' },
			{ text: '分区代码', align: 'center', value: 'partitionCode' },
			{ text: '备注', align: 'center', value: 'description' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useHrApi();
		const { tableItems, totalPages, pagination } = useFetchByPage<SysOrganization>(api.organization);

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
