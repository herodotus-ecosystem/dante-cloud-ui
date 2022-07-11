<template>
	<div class="q-gutter-y-md">
		<h-compliance-condition v-model:conditions="conditions"></h-compliance-condition>
		<h-table
			:rows="tableRows"
			:columns="columns"
			row-key="employeeId"
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
		</h-table>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Compliance, OAuth2ComplianceConditions } from '/@/lib/declarations';

import { moment } from '/@/lib/utils';
import { ComponentNameEnum } from '/@/lib/enums';

import { useAuthorizeApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HTable, HComplianceCondition } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.OAUTH2_COMPLIANCE,

	components: {
		HComplianceCondition,
		HTable,
	},

	setup() {
		const api = useAuthorizeApi();
		const { tableRows, totalPages, pagination, loading, conditions, findItems } = useTableItems<OAuth2Compliance, OAuth2ComplianceConditions>(
			api.compliance,
			ComponentNameEnum.OAUTH2_COMPLIANCE,
			false,
			{ direction: 'DESC', properties: ['createTime'] }
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
			{ name: 'principalName', field: 'principalName', align: 'center', label: '用户名' },
			{ name: 'clientId', field: 'clientId', align: 'center', label: '客户端ID' },
			{ name: 'ip', field: 'ip', align: 'center', label: 'IP地址' },

			{
				name: 'osName',
				field: 'osName',
				align: 'center',
				label: '操作系统',
			},
			{
				name: 'browserName',
				field: 'browserName',
				align: 'center',
				label: '浏览器',
			},
			{
				name: 'mobile',
				field: 'mobile',
				align: 'center',
				label: '移动端？',
			},
			{
				name: 'operation',
				field: 'operation',
				align: 'center',
				label: '操作',
			},
			{
				name: 'createTime',
				field: 'createTime',
				align: 'center',
				label: '时间',
				format: (value) => dateFormat(value),
			},
		];

		return {
			selected,
			pagination,
			columns,
			conditions,
			tableRows,
			totalPages,
			loading,
			findItems,
		};
	},
});
</script>
