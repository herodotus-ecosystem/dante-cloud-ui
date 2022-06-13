<template>
	<q-table
		:rows="tableRows"
		:columns="columns"
		row-key="id"
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

		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-button flat round color="red" icon="mdi-delete" tooltip="删除" @click="remove(props.row.userId)"></h-button>
			</q-td>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Token } from '/@/lib/declarations';

import { moment } from '/@/lib/utils';
import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HButton, HPagination } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_TOKEN,

	components: {
		HButton,
		HPagination,
	},

	setup() {
		const api = useAuthorizeApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, remove } = useTableItems<OAuth2Token>(
			api.token,
			ComponentNameEnum.OAUTH2_TOKEN
		);

		const selected = ref([]);

		const dateFormat = (date: string) => {
			if (date) {
				return moment(date).format('YYYY-MM-DD HH:mm:ss');
			} else {
				return '';
			}
		};

		const columns: QTableProps['columns'] = [
			{ name: 'registeredClientId', field: 'registeredClientId', align: 'center', label: '客户端ID' },
			{ name: 'principalName', field: 'principalName', align: 'center', label: '用户名' },
			{ name: 'authorizationGrantType', field: 'authorizationGrantType', align: 'center', label: '认证模式' },
			{
				name: 'accessTokenIssuedAt',
				field: 'accessTokenIssuedAt',
				align: 'center',
				label: '访问Token颁发时间',
				format: (value) => dateFormat(value),
			},
			{
				name: 'accessTokenExpiresAt',
				field: 'accessTokenExpiresAt',
				align: 'center',
				label: '访问Token过期时间',
				format: (value) => dateFormat(value),
			},
			{
				name: 'refreshTokenIssuedAt',
				field: 'refreshTokenIssuedAt',
				align: 'center',
				label: '刷新Token颁发时间',
				format: (value) => dateFormat(value),
			},
			{
				name: 'refreshTokenExpiresAt',
				field: 'refreshTokenExpiresAt',
				align: 'center',
				label: '刷新Token过期时间',
				format: (value) => dateFormat(value),
			},
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		onMounted(() => {
			pagination.value.sortBy = 'accessTokenIssuedAt';
		});

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
