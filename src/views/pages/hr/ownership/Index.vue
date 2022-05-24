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

import type { SysAuthority } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';

import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.SYS_OWNERSHIP,

	components: {
		HTable,
		HButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '姓名', align: 'center', value: 'employeeName' },
			{ text: '身份', align: 'center', value: 'identity' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useSecurityApi();
		const { tableItems, totalPages, pagination } = useTableItems<SysAuthority>(api.authority, ComponentName.SYS_OWNERSHIP);

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
