<template>
	<q-table
		:rows="tableRows"
		:columns="columns"
		row-key="attributeId"
		selection="single"
		v-model:selected="selected"
		v-model:pagination="pagination"
		:loading="loading"
	>
		<template #top-right="props">
			<q-toolbar>
				<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" />
			</q-toolbar>
		</template>

		<template #pagination>
			<h-pagination v-model="pagination.page" :max="totalPages" />
		</template>

		<template #body-cell-requestMethod="props">
			<q-td key="requestMethod" :props="props">
				<h-swagger-column :method="props.row.requestMethod" :url="props.row.url" :description="props.row.authorityName"></h-swagger-column>
			</q-td>
		</template>

		<template #body-cell-reserved="props">
			<q-td key="reserved" :props="props">
				<h-reserved-column :status="props.row.reserved"></h-reserved-column>
			</q-td>
		</template>

		<template #body-cell-status="props">
			<q-td key="status" :props="props">
				<h-status-column :type="props.row.status"></h-status-column>
			</q-td>
		</template>

		<!-- <template #body-cell-expression="props">
			<q-td key="expression" :props="props">
				{{ getText(props.row.expression) }}
			</q-td>
		</template> -->

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
				<!-- <h-button
					v-if="!props.row.reserved"
					flat
					round
					color="red"
					icon="mdi-delete"
					tooltip="删除"
					@click="remove(props.row.attributeId)"
				></h-button> -->
			</q-td>
		</template>
	</q-table>
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

import { HButton, HPagination, HStatusColumn, HSwaggerColumn, HReservedColumn } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_SECURITY_ATTRIBUTE,

	components: {
		HButton,
		HPagination,
		HStatusColumn,
		HSwaggerColumn,
		HReservedColumn,
	},

	setup() {
		const api = useSecurityApi();
		const constants = useConstantsStore();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<
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
			remove,
			getText,
		};
	},
});
</script>
