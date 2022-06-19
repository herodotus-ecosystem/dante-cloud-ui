<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.departmentName"
			name="departmentName"
			validate-on-model-update
			label="部门名称"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.departmentName"
				v-bind="field"
				name="departmentName"
				label="部门名称 * "
				placeholder="请输入部门名称"
				debounce="600"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.partitionCode" label="部门分区码" placeholder="请输入部门分区码名称"></h-text-field>
		<h-text-field v-model="editedItem.shortName" label="部门简称" placeholder="请输入部门简称"></h-text-field>
		<h-organization-select v-model="editedItem.organizationId" label="所属单位" placeholder="请设置所属单位"></h-organization-select>
		<h-department-select
			v-model="editedItem.parentId"
			:organizationId="editedItem.organizationId"
			label="上级部门"
			placeholder="请选择上级部门"
		></h-department-select>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysDepartment } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useHrApi } from '/@/apis';
import { HCenterFormLayout, HTextField, HOrganizationSelect, HDepartmentSelect } from '/@/components';

export default defineComponent({
	name: 'SysDepartmentContent',

	components: {
		HTextField,
		HCenterFormLayout,
		HOrganizationSelect,
		HDepartmentSelect,
	},

	setup(props) {
		const api = useHrApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysDepartment>(api.department);

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
