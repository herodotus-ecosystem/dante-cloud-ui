<template>
	<h-authorize-layout :title="title" :overlay="overlay">
		<q-table
			:rows="tableRows"
			:columns="columns"
			:row-key="rowKey"
			selection="single"
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
	</h-authorize-layout>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysRole, SysRoleConditions, SysDefaultRole } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HAuthorizeList, HAuthorizeLayout } from '/@/components';

export default defineComponent({
	name: 'SysUserAuthorize',

	components: {
		HAuthorizeList,
		HAuthorizeLayout,
	},

	setup(props) {
		const api = useSecurityApi();

		const { editedItem, title, assign, overlay } = useTableItem<SysDefaultRole>(api.defaultRole);
		const { tableRows, pagination, loading } = useTableItems<SysRole, SysRoleConditions>(api.role, ComponentNameEnum.SYS_ROLE, true);

		const selectedItems = ref([]) as Ref<Array<SysRole>>;
		const rowKey = 'roleId' as keyof SysRole;

		const columns: QTableProps['columns'] = [
			{ name: 'roleName', field: 'roleName', align: 'center', label: '角色名称' },
			{ name: 'roleCode', field: 'roleCode', align: 'center', label: '角色代码' },
		];

		onMounted(() => {
			selectedItems.value = [editedItem.value.role];
		});

		const onSave = () => {
			let defaultId = editedItem.value.defaultId;
			let role = selectedItems.value[0];
			assign({ defaultId: defaultId, roleId: role.roleId });
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
