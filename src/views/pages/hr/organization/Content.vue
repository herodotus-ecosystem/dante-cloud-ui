<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.organizationName"
			name="organizationName"
			validate-on-model-update
			label="单位名称"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.organizationName"
				v-bind="field"
				name="organizationName"
				label="单位名称 * "
				placeholder="请输入单位名称"
				debounce="600"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.partitionCode" label="单位分区码" placeholder="请输入单位分区码名称"></h-text-field>
		<h-text-field v-model="editedItem.shortName" label="单位简称" placeholder="请输入单位简称"></h-text-field>
		<h-dictionary-select v-model="editedItem.category" dictionary="organizationCategory" label="组织类别"></h-dictionary-select>
		<h-organization-select
			v-model="editedItem.parentId"
			:category="editedItem.category"
			label="上级单位"
			placeholder="请设置所属上级单位"
		></h-organization-select>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysOrganization } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useHrApi } from '/@/apis';
import { HCenterFormLayout, HTextField, HOrganizationSelect, HDictionarySelect } from '/@/components';

export default defineComponent({
	name: 'SysOrganizationContent',

	components: {
		HTextField,
		HCenterFormLayout,
		HOrganizationSelect,
		HDictionarySelect,
	},

	setup(props) {
		const api = useHrApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysOrganization>(api.organization);

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		return {
			editedItem,
			operation,
			title,
			onVerify,
		};
	},
});
</script>
