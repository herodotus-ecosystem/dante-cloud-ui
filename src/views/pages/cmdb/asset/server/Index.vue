<template>
	<div class="q-gutter-y-md">
		<h-server-condition v-model:conditions="conditions"></h-server-condition>
		<h-table
			:rows="tableRows"
			:columns="columns"
			:row-key="rowKey"
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
				<q-btn color="primary" label="新建服务器" @click="toCreate" />
			</template>

			<template #body-cell-deviceType="props">
				<q-td key="deviceType" :props="props">
					{{ parseServerDevice(props.row) }}
				</q-td>
			</template>

			<template #body-cell-actions="props">
				<q-td key="actions" :props="props">
					<h-edit-button @click="toEdit(props.row)"></h-edit-button>
					<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
				</q-td>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { AssetServer, AssetServerConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useCmdbApi } from '/@/apis';
import { useTableItems, useServerDisplay } from '/@/hooks';

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
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, conditions, findItems, deleteItemById } = useTableItems<
			AssetServer,
			AssetServerConditions
		>(api.server, ComponentNameEnum.ASSET_SERVER);

		const { parseServerDevice } = useServerDisplay();

		const selected = ref([]);
		const rowKey = 'serverId' as keyof AssetServer;

		const columns: QTableProps['columns'] = [
			{ name: 'deviceType', field: 'deviceType', align: 'center', label: '服务器类型' },
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
			rowKey,
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			toAuthorize,
			conditions,
			findItems,
			deleteItemById,
			parseServerDevice,
		};
	},
});
</script>
