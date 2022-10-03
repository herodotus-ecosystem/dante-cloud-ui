<template>
	<h-authorize-layout :title="title" :overlay="overlay">
		<q-table
			:rows="tableRows"
			:columns="columns"
			:row-key="rowKey"
			selection="multiple"
			v-model:selected="selectedItems"
			v-model:pagination="pagination"
			:loading="loading"
			class="q-mr-md"
		>
		</q-table>

		<template #right>
			<h-authorize-list
				v-model="selectedItems"
				prepend-title="serverId"
				append-title="actualIp"
				:row-key="rowKey"
				class="q-ml-md"
				@save="onSave()"
			></h-authorize-list>
		</template>
	</h-authorize-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { AssetServer, AssetServerConditions, AssetApplication } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useCmdbApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HAuthorizeList, HAuthorizeLayout } from '/@/components';

export default defineComponent({
	name: 'DatabaseInstanceAuthorize',

	components: {
		HAuthorizeList,
		HAuthorizeLayout,
	},

	setup(props) {
		const api = useCmdbApi();

		const { editedItem, title, assign, overlay } = useTableItem<AssetApplication>(api.application);
		const { tableRows, pagination, loading } = useTableItems<AssetServer, AssetServerConditions>(api.server, ComponentNameEnum.ASSET_SERVER, true);

		const selectedItems = ref([]) as Ref<Array<AssetServer>>;
		const rowKey = 'applicationId' as keyof AssetServer;

		const columns: QTableProps['columns'] = [
			{ name: 'actualIp', field: 'actualIp', align: 'center', label: 'IP地址' },
			{ name: 'hostName', field: 'hostName', align: 'center', label: '主机名' },
			{ name: 'osPlatform', field: 'osPlatform', align: 'center', label: '操作系统' },
			{ name: 'osVersion', field: 'osVersion', align: 'center', label: '系统版本' },
		];

		onMounted(() => {
			selectedItems.value = editedItem.value.servers;
		});

		const onSave = () => {
			let applicationId = editedItem.value.applicationId;
			let servers = selectedItems.value.map((item) => item[rowKey]);
			assign({ applicationId: applicationId, servers: servers });
		};

		return {
			title,
			overlay,
			tableRows,
			columns,
			rowKey,
			selectedItems,
			pagination,
			loading,
			onSave,
		};
	},
});
</script>
