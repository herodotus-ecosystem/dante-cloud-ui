<template>
	<q-table :rows="tableRows" :columns="columns" row-key="userId" selection="single" v-model:selected="selected" v-model:pagination="pagination">
		<template #top-right="props">
			<q-toolbar>
				<q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen" class="q-ml-md" />
			</q-toolbar>
		</template>

		<template #top-left>
			<q-btn color="primary" label="新建应用" :to="toCreate" />
		</template>

		<template #pagination>
			<q-pagination v-model="pagination.page" :max="totalPages" direction-links />
		</template>

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<q-btn flat round color="purple" icon="mdi-clipboard-edit" :to="toEdit(props.row)">
					<q-tooltip>编辑</q-tooltip>
				</q-btn>
				<q-btn flat round color="red" icon="mdi-delete" @click="remove(props.row.userId)">
					<q-tooltip>删除</q-tooltip>
				</q-btn>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Token } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

export default defineComponent({
	name: 'OAuth2Scope',

	setup(props) {
		const api = useAuthorizeApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<OAuth2Token>(
			api.token,
			ComponentNameEnum.OAUTH2_TOKEN
		);

		const selected = ref([]);
		const pagesNumber = ref(1);

		const columns: QTableProps['columns'] = [
			{ name: 'registeredClientId', field: 'registeredClientId', align: 'center', label: '客户端ID' },
			{ name: 'principalName', field: 'principalName', align: 'center', label: '用户名' },
			{ name: 'authorizationGrantType', field: 'authorizationGrantType', align: 'center', label: '认证模式' },
			{ name: 'accessTokenIssuedAt', field: 'accessTokenIssuedAt', align: 'center', label: '访问Token颁发时间' },
			{ name: 'accessTokenExpiresAt', field: 'accessTokenExpiresAt', align: 'center', label: '访问Token过期时间' },
			{ name: 'refreshTokenIssuedAt', field: 'refreshTokenIssuedAt', align: 'center', label: '刷新Token颁发时间' },
			{ name: 'refreshTokenExpiresAt', field: 'refreshTokenExpiresAt', align: 'center', label: '刷新Token过期时间' },
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
