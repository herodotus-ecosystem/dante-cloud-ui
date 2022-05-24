<template>
	<div>
		<h-table v-model:page="pageNumber" :table-headers="tableHeaders" :table-items="tableItems" :total-pages="totalPages">
			<template #actions="{ item }">
				<h-button color="purple" icon icon-name="mdi-clipboard-check-multiple" tooltip="编辑"></h-button>
				<h-button color="error" icon icon-name="mdi-delete-sweep" tooltip="删除"></h-button>
			</template>
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

import type { OAuth2Token } from '/@/lib/declarations';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';
import { HTable, HButton } from '/@/components';

import { ComponentName } from '/@/lib/enums';

export default defineComponent({
	name: ComponentName.OAUTH2_TOKEN,

	components: {
		HTable,
		HButton,
	},

	setup() {
		const pageNumber = ref<number>(1);
		const tableHeaders = ref([
			{ text: '客户端ID', align: 'center', value: 'registeredClientId' },
			{ text: '用户名', align: 'center', value: 'principalName' },
			{ text: '认证模式', align: 'center', value: 'authorizationGrantType' },
			{ text: '访问Token颁发时间', align: 'center', value: 'accessTokenIssuedAt' },
			{ text: '访问Token过期时间', align: 'center', value: 'accessTokenExpiresAt' },
			{ text: '刷新Token颁发时间', align: 'center', value: 'refreshTokenIssuedAt' },
			{ text: '刷新Token过期时间', align: 'center', value: 'refreshTokenExpiresAt' },
			{ text: '操作', align: 'center', value: 'actions', sortable: false },
		]);

		const api = useAuthorizeApi();
		const { tableItems, totalPages, pagination } = useTableItems<OAuth2Token>(api.token, ComponentName.OAUTH2_TOKEN);

		watch(pageNumber, (newValue: number) => {
			pagination(newValue);
		});

		return {
			pageNumber,
			tableItems,
			totalPages,
			tableHeaders,
		};
	},
});
</script>
