<template>
	<h-table
		:rows="tableRows"
		:columns="columns"
		:row-key="rowKey"
		selection="single"
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
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysAuthority, SysAuthorityConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HTable, HSwaggerColumn } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_AUTHORITY,

	components: {
		HSwaggerColumn,
		HTable,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, deleteItemById } = useTableItems<
			SysAuthority,
			SysAuthorityConditions
		>(api.authority, ComponentNameEnum.SYS_AUTHORITY);

		const rowKey = 'authorityId' as keyof SysAuthority;

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
			findItems,
			deleteItemById,
			rowKey,
		};
	},
});
</script>
