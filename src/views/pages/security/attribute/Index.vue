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

import type { SysSecurityAttribute } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';

import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.SYS_SECURITY_ATTRIBUTE,

	components: {
		HTable,
		HButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '接口', align: 'center', value: 'requestMethod' },
			{ text: '默认权限代码', align: 'center', value: 'attributeCode' },
			{ text: '特定表达式', align: 'center', value: 'expression' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useSecurityApi();
		const { tableItems, totalPages, pagination } = useTableItems<SysSecurityAttribute>(api.securityAttribute, ComponentName.SYS_SECURITY_ATTRIBUTE);

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
