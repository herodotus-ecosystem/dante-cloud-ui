<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		row-key="catalogId"
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
		<template #top-left>
			<q-btn color="primary" label="新建数据库" :to="toCreate" />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-dense-icon-button color="brown" icon="mdi-database-lock" tooltip="配置用户" :to="toAuthorize(props.row)"></h-dense-icon-button>
				<h-edit-button :to="toEdit(props.row)"></h-edit-button>
				<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row.catalogId)"></h-delete-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { DatabaseCatalog, DatabaseCatalogConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useCmdbApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HDenseIconButton, HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_SCOPE,

	components: {
		HDeleteButton,
		HDenseIconButton,
		HEditButton,
		HTable,
	},

	setup() {
		const api = useCmdbApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } = useTableItems<
			DatabaseCatalog,
			DatabaseCatalogConditions
		>(api.dbCatalog, ComponentNameEnum.DATABASE_CATALOG);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'catalogName', field: 'catalogName', align: 'center', label: '数据库名称' },
			{ name: 'purpose', field: 'purpose', align: 'center', label: '用途' },
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		return {
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			toAuthorize,
			findItems,
			deleteItemById,
		};
	},
});
</script>
