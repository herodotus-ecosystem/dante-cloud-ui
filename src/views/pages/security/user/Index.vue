<template>
	<div>
		<q-table
			:rows="tableRows"
			:columns="columns"
			row-key="userId"
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
				<q-btn color="primary" label="新建用户" :to="toCreate" />
			</template>

			<template #pagination>
				<h-pagination v-model="pagination.page" :max="totalPages" />
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
					<h-button flat round color="orange" icon="mdi-key-chain" tooltip="设置/修改密码" @click="onChangePassword(props.row)"></h-button>
					<h-button flat round color="brown" icon="mdi-badge-account-alert" tooltip="配置角色" :to="toAuthorize(props.row)"></h-button>
					<h-button flat round color="purple" icon="mdi-clipboard-edit" tooltip="编辑" :to="toEdit(props.row)"></h-button>
					<h-button
						v-if="!props.row.reserved"
						flat
						round
						color="red"
						icon="mdi-delete"
						tooltip="删除"
						@click="deleteItemById(props.row.userId)"
					></h-button>
				</q-td>
			</template>
		</q-table>
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
import { HButton, HPagination, HStatusColumn, HReservedColumn, HChangePassword } from '/@/components';

export default defineComponent({
	name: ComponentNameEnum.SYS_USER,

	components: {
		HButton,
		HChangePassword,
		HPagination,
		HStatusColumn,
		HReservedColumn,
	},

	setup() {
		const api = useSecurityApi();
		const { tableRows, totalPages, pagination, loading, toEdit, toCreate, toAuthorize, deleteItemById } = useTableItems<SysUser, SysUserConditions>(
			api.user,
			ComponentNameEnum.SYS_USER
		);

		const selected = ref([]);
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
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			toCreate,
			toEdit,
			toAuthorize,
			deleteItemById,
			showChangePasswordDialog,
			currentUserId,
			onChangePassword,
		};
	},
});
</script>
