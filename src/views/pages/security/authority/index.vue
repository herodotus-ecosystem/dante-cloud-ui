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
import { defineComponent, reactive, toRefs, watch, ref } from 'vue';

import type { SysAuthority } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useFetchByPage } from '/@/hooks';
import { HTable, HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'SysAuthority',

	components: {
		HTable,
		HTooltipButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '权限名称', align: 'center', value: 'authorityName' },
			{ text: '权限代码', align: 'center', value: 'authorityCode' },
			{ text: '权限类型', align: 'center', value: 'authorityType' },
			{ text: 'Request Method', align: 'center', value: 'requestMethod' },
			{ text: '服务ID', align: 'center', value: 'serviceId' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useSecurityApi();
		const { tableItems, totalPages, pagination } = useFetchByPage<SysAuthority>(api.authority);

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
