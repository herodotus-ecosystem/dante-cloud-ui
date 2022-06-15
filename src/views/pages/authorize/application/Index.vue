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

		<template #body-cell-authorizationGrantTypes="props">
			<q-td key="authorizationGrantTypes" :props="props">
				<h-grant-type-column :items="props.row.authorizationGrantTypes"></h-grant-type-column>
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
import { moment } from '/@/lib/utils';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HButton, HPagination, HStatusColumn, HReservedColumn, HGrantTypeColumn } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_APPLICATION,

	components: {
		HButton,
		HGrantTypeColumn,
		HPagination,
		HStatusColumn,
		HReservedColumn,
	},

	setup() {
		const api = useAuthorizeApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, remove } = useTableItems<OAuth2Application>(
			api.application,
			ComponentNameEnum.OAUTH2_APPLICATION
		);

		const selected = ref([]);

		const columns: QTableProps['columns'] = [
			{ name: 'applicationName', field: 'applicationName', align: 'center', label: '应用名称' },
			{ name: 'abbreviation', field: 'abbreviation', align: 'center', label: '应用简称' },
			{ name: 'authorizationGrantTypes', field: 'authorizationGrantTypes', align: 'center', label: '认证模式' },
			{
				name: 'accessTokenValidity',
				field: 'accessTokenValidity',
				align: 'center',
				label: 'Token 有效期',
				format: (value) => formatDuration(value),
			},
			{
				name: 'refreshTokenValidity',
				field: 'refreshTokenValidity',
				align: 'center',
				label: 'RefreshToken 有效期',
				format: (value) => formatDuration(value),
			},
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		const formatDuration = (date: string): string => {
			return moment.duration(date, 'seconds').humanize();
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
			toAuthorize,
			remove,
		};
	},
});
</script>
