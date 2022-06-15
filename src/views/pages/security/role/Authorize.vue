<template>
	<h-detail-content :title="title" :overlay="overlay">
		<h-container column="two" :offset="3" wider="start">
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
				<template #body-cell-requestMethod="props">
					<q-td key="requestMethod" :props="props">
						<h-swagger-column :method="props.row.requestMethod" :url="props.row.url" :description="props.row.authorityName"></h-swagger-column>
					</q-td>
				</template>
			</q-table>

			<template #right>
				<h-authorize-list
					v-model="selectedItems"
					prepend-title="requestMethod"
					append-title="url"
					prepend-subtitle="authorityName"
					http-method
					http-method-key="requestMethod"
					:row-key="rowKey"
					class="q-ml-md"
					@save="onSave()"
				></h-authorize-list>
			</template>
		</h-container>
	</h-detail-content>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from 'vue';

import type { QTableProps } from 'quasar';
import type { SysRole, SysAuthority } from '/@/lib/declarations';

import { ComponentNameEnum } from '/@/lib/enums';

import { useSecurityApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HContainer, HAuthorizeList, HSwaggerColumn, HDetailContent } from '/@/components';

export default defineComponent({
	name: 'SysUserAuthorize',

	components: {
		HAuthorizeList,
		HContainer,
		HDetailContent,
		HSwaggerColumn,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, title, assign, overlay } = useTableItem<SysRole>(api.role);

		const { tableRows, totalPages, pagination, loading, findAll } = useTableItems<SysAuthority>(api.authority, ComponentNameEnum.SYS_AUTHORITY, true);

		const selectedItems = ref([]) as Ref<Array<SysAuthority>>;
		const rowKey = 'authorityId' as keyof SysAuthority;

		const columns: QTableProps['columns'] = [
			{ name: 'requestMethod', field: 'requestMethod', align: 'center', label: '服务接口' },
			{ name: 'authorityCode', field: 'authorityCode', align: 'center', label: '权限代码' },
			{ name: 'serviceId', field: 'serviceId', align: 'center', label: '服务ID' },
		];

		onMounted(() => {
			findAll();
			selectedItems.value = editedItem.value.authorities;
		});

		const onSave = () => {
			let roleId = editedItem.value.roleId;
			let authorities = selectedItems.value.map((item) => item[rowKey]);
			assign({ roleId: roleId, authorities: authorities });
		};

		return {
			editedItem,
			selectedItems,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			overlay,
			title,
			rowKey,
			findAll,
			onSave,
		};
	},
});
</script>
