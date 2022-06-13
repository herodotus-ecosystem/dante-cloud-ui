<template>
	<h-detail-content :title="title" :overlay="overlay">
		<h-container column="two" :offset="3" mode-for-two="right-left">
			<q-table
				:rows="tableRows"
				:columns="columns"
				row-key="authorityId"
				selection="multiple"
				v-model:selected="selected"
				v-model:pagination="pagination"
				:loading="loading"
				class="q-mr-md"
			>
				<template #body-cell-requestMethod="props">
					<q-td key="requestMethod" :props="props">
						<h-swagger-item :method="props.row.requestMethod" :url="props.row.url" :description="props.row.authorityName"></h-swagger-item>
					</q-td>
				</template>
			</q-table>

			<template #right>
				<h-authorize-list
					v-model="selected"
					prepend-title="requestMethod"
					append-title="url"
					prepend-subtitle="authorityName"
					http-method
					http-method-key="requestMethod"
					item-key="authorityId"
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

import { HContainer, HAuthorizeList, HSwaggerItem, HDetailContent } from '/@/components';

export default defineComponent({
	name: 'SysUserAuthorize',

	components: {
		HAuthorizeList,
		HContainer,
		HDetailContent,
		HSwaggerItem,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, title } = useTableItem<SysRole>(api.role);

		const { tableRows, totalPages, pagination, loading, findAll } = useTableItems<SysAuthority>(api.authority, ComponentNameEnum.SYS_AUTHORITY, true);

		const selected = ref([]) as Ref<Array<SysAuthority>>;
		const overlay = ref(false);

		const columns: QTableProps['columns'] = [
			{ name: 'requestMethod', field: 'requestMethod', align: 'center', label: '服务接口' },
			{ name: 'authorityCode', field: 'authorityCode', align: 'center', label: '权限代码' },
			{ name: 'serviceId', field: 'serviceId', align: 'center', label: '服务ID' },
		];

		onMounted(() => {
			findAll();
			selected.value = editedItem.value.authorities;
		});

		const onSave = () => {
			overlay.value = true;
		};

		return {
			editedItem,
			selected,
			pagination,
			columns,
			tableRows,
			totalPages,
			loading,
			overlay,
			title,
			findAll,
			onSave,
		};
	},
});
</script>
