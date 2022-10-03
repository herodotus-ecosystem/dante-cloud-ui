<template>
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
		@request="findItems"
	>
		<template #body-cell-actions="props">
			<q-td key="actions" :props="props">
				<h-delete-button @click="deleteItemById(props.row[rowKey])"></h-delete-button>
			</q-td>
		</template>
	</h-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Token, OAuth2TokenConditions } from '/@/lib/declarations';

import { moment, toast } from '/@/lib/utils';
import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { useAuthenticationStore } from '/@/stores';

import { HDeleteButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_TOKEN,

	components: {
		HDeleteButton,
		HTable,
	},

	setup() {
		const api = useAuthorizeApi();
		const authentication = useAuthenticationStore();
		const { tableRows, totalPages, pagination, loading, findItems, deleteItemById } = useTableItems<OAuth2Token, OAuth2TokenConditions>(
			api.token,
			ComponentNameEnum.OAUTH2_TOKEN,
			false,
			{ direction: 'DESC', properties: ['accessTokenIssuedAt'] }
		);

		const selected = ref([]);
		const rowKey = 'id' as keyof OAuth2Token;

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

		const deleteToken = (token: string) => {
			authentication
				.signOut(token)
				.then((response) => {
					const result = response as HttpResult<string>;
					if (result.message) {
						toast.success(result.message);
					} else {
						toast.success('删除成功');
					}
					findItems({ pagination: { sortBy: 'updateTime', descending: false, page: 1, rowsPerPage: 10, rowsNumber: 0 } });
				})
				.catch(() => {
					toast.error('删除失败');
				});
		};

		onMounted(() => {
			pagination.value.sortBy = 'accessTokenIssuedAt';
		});

		return {
			rowKey,
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			findItems,
			deleteItemById,
		};
	},
});
</script>
