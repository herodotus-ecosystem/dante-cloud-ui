<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
		<h-text-field v-model="editedItem.serviceId" name="serviceId" label="服务ID * " placeholder="请输入服务ID" disable></h-text-field>
		<h-text-field v-model="editedItem.url" name="url" label="URL * " placeholder="请输URL" disable></h-text-field>
		<h-text-field
			v-model="editedItem.requestMethod"
			name="requestMethod"
			label="Request Method * "
			placeholder="请输入Request Method"
			disable
		></h-text-field>
		<h-text-field
			v-model="editedItem.attributeCode"
			name="attributeCode"
			label="默认权限代码 * "
			placeholder="请输入默认权限代码"
			disable
		></h-text-field>
		<h-dictionary-select
			v-model="editedItem.expression"
			dictionary="permissionExpression"
			label="权限表达式"
			option-label="key"
			option-value="key"
		></h-dictionary-select>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysSecurityAttribute } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';
import { HCenterFormLayout, HTextField, HDictionarySelect } from '/@/components';

export default defineComponent({
	name: 'SysUserContent',

	components: {
		HTextField,
		HCenterFormLayout,
		HDictionarySelect,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysSecurityAttribute>(api.securityAttribute);

		const onSave = () => {
			saveOrUpdate();
		};

		return {
			editedItem,
			operation,
			title,
			onSave,
		};
	},
});
</script>
