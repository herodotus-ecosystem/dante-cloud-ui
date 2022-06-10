<template>
	<q-table
		:rows="tableRows"
		:columns="columns"
		row-key="applicationId"
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

		<template #top-left>
			<q-btn color="primary" label="新建应用" :to="toCreate" />
		</template>

		<template #pagination>
			<h-pagination v-model="pagination.page" :max="totalPages" />
		</template>

		<template #body-cell-reserved="props">
			<q-td key="reserved" :props="props">
				<h-table-item-chip :status="props.row.reserved"></h-table-item-chip>
			</q-td>
		</template>

		<template #body-cell-status="props">
			<q-td key="status" :props="props">
				<h-table-item-status :type="props.row.status"></h-table-item-status>
			</q-td>
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
				<h-button v-if="!props.row.reserved" flat round color="red" icon="mdi-delete" tooltip="删除" @click="remove(props.row.userId)"></h-button>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Application } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HButton, HPagination, HTableItemChip, HTableItemStatus } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_APPLICATION,

	components: {
		HButton,
		HPagination,
		HTableItemChip,
		HTableItemStatus,
	},

	setup() {
		const api = useAuthorizeApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<OAuth2Application>(
			api.application,
			ComponentNameEnum.OAUTH2_APPLICATION
		);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'applicationName', field: 'applicationName', align: 'center', label: '应用名称' },
			{ name: 'abbreviation', field: 'abbreviation', align: 'center', label: '应用简称' },
			{ name: 'authorizationGrantTypes', field: 'authorizationGrantTypes', align: 'center', label: '认证模式' },
			{ name: 'state', field: 'state', align: 'center', label: '认证状态' },
			{ name: 'accessTokenValidity', field: 'accessTokenValidity', align: 'center', label: 'Token有效时间' },
			{ name: 'description', field: 'description', align: 'center', label: '备注' },
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
			remove,
		};
	},
});
</script>
