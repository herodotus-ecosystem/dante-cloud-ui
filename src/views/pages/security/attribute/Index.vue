<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		row-key="attributeId"
		selection="single"
		v-model:selected="selected"
		v-model:pagination="pagination"
		v-model:pageNumber="pagination.page"
		:totalPages="totalPages"
		:loading="loading"
		status
		reserved
		@request="findItems"
	>
		<template #body-cell-requestMethod="props">
			<q-td key="requestMethod" :props="props">
				<h-swagger-column :method="props.row.requestMethod" :url="props.row.url" :description="props.row.authorityName"></h-swagger-column>
			</q-td>
		</template>

		<!-- <template #body-cell-expression="props">
			<q-td key="expression" :props="props">
				{{ getText(props.row.expression) }}
			</q-td>
		</template> -->

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-edit-button :to="toEdit(props.row)"></h-edit-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { ConstantDictionary, SysSecurityAttribute, SysSecurityAttributeConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';
import { lodash } from '/@/lib/utils';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { useConstantsStore } from '/@/stores';

import { HEditButton, HTable, HSwaggerColumn } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_SECURITY_ATTRIBUTE,

	components: {
		HEditButton,
		HTable,
		HSwaggerColumn,
	},

	setup() {
		const api = useSecurityApi();
		const constants = useConstantsStore();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, deleteItemById } = useTableItems<
			SysSecurityAttribute,
			SysSecurityAttributeConditions
		>(api.securityAttribute, ComponentNameEnum.SYS_SECURITY_ATTRIBUTE);

		const selected = ref([]);
		const index = ref({}) as Ref<Record<string, ConstantDictionary>>;

		const columns: QTableProps['columns'] = [
			{ name: 'requestMethod', field: 'requestMethod', align: 'center', label: '权限接口' },
			{ name: 'attributeCode', field: 'attributeCode', align: 'center', label: '默认权限代码' },
			{ name: 'expression', field: 'expression', align: 'center', label: '特定表达式' },
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		onMounted(() => {
			const dictionary = constants.getDictionary('permissionExpression');
			dictionary.forEach((element) => {
				index.value[element.key] = element;
			});
		});

		const getText = (key: string) => {
			let object = index.value[key];
			return lodash.get(object, 'text');
		};

		return {
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			deleteItemById,
			findItems,
			getText,
		};
	},
});
</script>
