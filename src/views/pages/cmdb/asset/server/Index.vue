<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		row-key="serverId"
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
			<q-btn color="primary" label="新建服务器" :to="toCreate" />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-edit-button :to="toEdit(props.row)"></h-edit-button>
				<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row.serverId)"></h-delete-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { AssetServer, AssetServerConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useCmdbApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HDenseIconButton, HDeleteButton, HEditButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.ASSET_SERVER,

	components: {
		HDeleteButton,
		HEditButton,
		HTable,
	},

	setup() {
		const api = useCmdbApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } = useTableItems<
			AssetServer,
			AssetServerConditions
		>(api.server, ComponentNameEnum.ASSET_SERVER);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'assetId', field: 'assetId', align: 'center', label: '资产编号' },
			{ name: 'actualIp', field: 'actualIp', align: 'center', label: '实际IP' },
			{ name: 'manageIp', field: 'manageIp', align: 'center', label: '实体机IP' },
			{ name: 'osPlatform', field: 'osPlatform', align: 'center', label: '操作系统' },
			{ name: 'osVersion', field: 'osVersion', align: 'center', label: '系统版本' },
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
