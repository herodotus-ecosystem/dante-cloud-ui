<template>
	<q-table :rows="tableRows" :columns="columns" row-key="authorityId" selection="single" v-model:pagination="pagination" :loading="loading">
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
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysAuthority } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HPagination, HSwaggerColumn } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_AUTHORITY,

	components: {
		HPagination,
		HSwaggerColumn,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<SysAuthority>(
			api.authority,
			ComponentNameEnum.SYS_AUTHORITY
		);

		const columns: QTableProps['columns'] = [
			{ name: 'authorityCode', field: 'authorityCode', align: 'center', label: '权限代码' },
			{ name: 'requestMethod', field: 'requestMethod', align: 'center', label: '接口' },
			{ name: 'serviceId', field: 'serviceId', align: 'center', label: '服务ID' },
		];

		return {
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			remove,
		};
	},
});
</script>
