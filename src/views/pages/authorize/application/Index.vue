<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #actions="{ item }">
				<h-tooltip-button color="purple" icon icon-name="mdi-text-box-edit" tooltip="编辑"></h-tooltip-button>
				<h-tooltip-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除"></h-tooltip-button>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { OAuth2Application } from '/@/lib/declarations';

import { useAuthorizeApi } from '/@/apis';
import { useTableItem } from '/@/hooks';
import { HTable, HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'OAuth2Application',

	components: {
		HTable,
		HTooltipButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '应用名称', align: 'center', value: 'applicationName' },
			{ text: '应用简称', align: 'center', value: 'abbreviation' },
			{ text: '认证模式', align: 'center', value: 'authorizationGrantTypes' },
			{ text: '认证状态', align: 'center', value: 'state' },
			{ text: 'Token有效时间', align: 'center', value: 'accessTokenValidity' },
			{ text: '说明', align: 'center', value: 'description' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useAuthorizeApi();
		const { tableItems, totalPages, pagination } = useTableItem<OAuth2Application>(api.application);

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
