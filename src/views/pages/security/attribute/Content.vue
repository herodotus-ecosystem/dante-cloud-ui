<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.serviceId"
			name="serviceId"
			validate-on-input
			label="服务ID"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.serviceId"
				v-bind="field"
				name="serviceId"
				label="服务ID * "
				placeholder="请输入服务ID"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<validation-provider v-model="editedItem.url" name="url" validate-on-input label="URL" rules="required" v-slot="{ errorMessage, field }">
			<h-text-field
				v-model="editedItem.url"
				v-bind="field"
				name="url"
				label="URL * "
				placeholder="请输URL"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<validation-provider
			v-model="editedItem.requestMethod"
			name="requestMethod"
			validate-on-input
			label="Request Method"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.requestMethod"
				v-bind="field"
				name="requestMethod"
				label="Request Method * "
				placeholder="请输入Request Method"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<validation-provider
			v-model="editedItem.attributeCode"
			name="attributeCode"
			validate-on-input
			label="默认权限代码"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.attributeCode"
				v-bind="field"
				name="attributeCode"
				label="默认权限代码 * "
				placeholder="请输入默认权限代码"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<h-dictionary-select v-model="editedItem.expression" dictionary="permissionExpression" label="权限表达式"></h-dictionary-select>
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
