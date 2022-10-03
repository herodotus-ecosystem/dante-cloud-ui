<template>
	<div>
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
			status
			reserved
			@request="findItems"
		>
			<template #top-left>
				<q-btn color="primary" label="新建用户" @click="toCreate" />
			</template>

			<template #body-cell-actions="props">
				<q-td key="actions" :props="props">
					<h-dense-icon-button color="orange" icon="mdi-key-chain" tooltip="设置/修改密码" @click="onChangePassword(props.row)"></h-dense-icon-button>
					<h-dense-icon-button color="brown" icon="mdi-badge-account-alert" tooltip="配置角色" @click="toAuthorize(props.row)"></h-dense-icon-button>
					<h-edit-button @click="toEdit(props.row)"></h-edit-button>
					<h-delete-button v-if="!props.row.reserved" @click="deleteItemById(props.row[rowKey])"></h-delete-button>
				</q-td>
			</template>
		</h-table>
		<h-change-password v-model="showChangePasswordDialog" :user-id="currentUserId"></h-change-password>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysUser, SysUserConditions } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItems } from '/@/hooks';

import { HChangePassword, HDeleteButton, HEditButton, HDenseIconButton, HTable } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_USER,

	components: {
		HChangePassword,
		HDeleteButton,
		HEditButton,
		HDenseIconButton,
		HTable,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, findItems, deleteItemById } = useTableItems<
			SysUser,
			SysUserConditions
		>(api.user, ComponentNameEnum.SYS_USER);

		const selected = ref([]);
		const rowKey = 'userId' as keyof SysUser;
		const showChangePasswordDialog = ref(false);
		const currentUserId = ref('');

		const columns: QTableProps['columns'] = [
			{ name: 'userName', field: 'userName', align: 'center', label: '用户名' },
			{ name: 'nickName', field: 'nickName', align: 'center', label: '昵称' },
			{ name: 'description', field: 'description', align: 'center', label: '备注' },
			{ name: 'reserved', field: 'reserved', align: 'center', label: '保留数据' },
			{ name: 'status', field: 'status', align: 'center', label: '状态' },
			{ name: 'actions', field: 'actions', align: 'center', label: '操作' },
		];

		const onChangePassword = (item: SysUser) => {
			showChangePasswordDialog.value = true;
			currentUserId.value = item.userId;
		};

		return {
			rowKey,
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			toAuthorize,
			findItems,
			deleteItemById,
			showChangePasswordDialog,
			currentUserId,
			onChangePassword,
		};
	},
});
</script>
