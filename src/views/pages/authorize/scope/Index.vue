<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #actions="{ item }">
				<h-button color="purple" icon icon-name="mdi-clipboard-check-multiple" tooltip="编辑"></h-button>
				<h-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除"></h-button>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { OAuth2Scope } from '/@/lib/declarations';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';
import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.OAUTH2_SCOPE,

	components: {
		HTable,
		HButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '范围代码', align: 'center', value: 'scopeCode' },
			{ text: '范围名称', align: 'center', value: 'scopeName' },
			{ text: '说明', align: 'center', value: 'description' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useAuthorizeApi();
		const { tableItems, totalPages, pagination } = useTableItems<OAuth2Scope>(api.scope, ComponentName.OAUTH2_SCOPE);

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
