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

import type { SysDepartment } from '/@/lib/declarations';

import { useHrApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';

import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.SYS_DEPARTMENT,

	components: {
		HTable,
		HButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '部门名称', align: 'center', value: 'departmentName' },
			{ text: '部门简称', align: 'center', value: 'shortName' },
			{ text: '分区代码', align: 'center', value: 'partitionCode' },
			{ text: '备注', align: 'center', value: 'description' },
			{ text: '保留数据', align: 'center', value: 'reserved' },
			{ text: '状态', align: 'center', value: 'status' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useHrApi();
		const { tableItems, totalPages, pagination } = useTableItems<SysDepartment>(api.department, ComponentName.SYS_DEPARTMENT);

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
