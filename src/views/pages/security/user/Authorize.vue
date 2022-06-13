<template>
	<h-detail-content :title="title" :overlay="overlay">
		<h-container column="two" :offset="3" mode-for-two="right-left">
			<q-table
				:rows="tableRows"
				:columns="columns"
				:row-key="rowKey"
				selection="multiple"
				v-model:selected="selectedItems"
				v-model:pagination="pagination"
				:loading="loading"
				class="q-mr-md"
			>
			</q-table>

			<template #right>
				<h-authorize-list
					v-model="selectedItems"
					prepend-title="roleCode"
					append-title="roleName"
					:row-key="rowKey"
					class="q-ml-md"
					@save="onSave()"
				></h-authorize-list>
			</template>
		</h-container>
	</h-detail-content>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysRole, SysUser } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HContainer, HAuthorizeList, HDetailContent } from '/@/components';

export default defineComponent({
	name: 'SysUserAuthorize',

	components: {
		HAuthorizeList,
		HContainer,
		HDetailContent,
	},

	setup(props) {
		const api = useSecurityApi();

		const { editedItem, title, assign, overlay } = useTableItem<SysUser>(api.user);
		const { tableRows, pagination, loading, findAll } = useTableItems<SysRole>(api.role, ComponentNameEnum.SYS_ROLE, true);

		const selectedItems = ref([]) as Ref<Array<SysRole>>;
		const rowKey = 'roleId' as keyof SysRole;

		const columns: QTableProps['columns'] = [
			{ name: 'roleName', field: 'roleName', align: 'center', label: '角色名称' },
			{ name: 'roleCode', field: 'roleCode', align: 'center', label: '角色代码' },
		];

		onMounted(() => {
			findAll();
			selectedItems.value = editedItem.value.roles;
		});

		const onSave = () => {
			let userId = editedItem.value.userId;
			let roles = selectedItems.value.map((item) => item[rowKey]);
			assign({ userId: userId, roles: roles });
		};

		return {
			title,
			overlay,
			tableRows,
			columns,
			rowKey,
			selectedItems,
			pagination,
			loading,
			onSave,
		};
	},
});
</script>
