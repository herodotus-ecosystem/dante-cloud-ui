<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.roleName"
			name="roleName"
			validate-on-blur
			label="角色名称"
			rules="required"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.roleName"
				v-bind="field"
				label="角色名称"
				placeholder="请输入角色名称"
				:error-message="errorMessage"
				:error="errorMessage ? true : false"
			></h-text-field>
		</validation-provider>
		<validation-provider
			v-model="editedItem.roleCode"
			name="roleCode"
			validate-on-model-update
			label="角色代码"
			:rules="uniqueRoleCode"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.roleCode"
				v-bind="field"
				name="roleCode"
				label="角色代码 * "
				placeholder="请输入角色代码"
				:error-message="errorMessage"
				:error="errorMessage ? true : false"
			></h-text-field>
		</validation-provider>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysRole } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';
import { HCenterFormLayout, HTextField } from '/@/components';

export default defineComponent({
	name: 'SysRoleContent',

	components: {
		HTextField,
		HCenterFormLayout,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysRole>(api.role);

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		const uniqueRoleCode = async () => {
			let roleCode = editedItem.value.roleCode;
			if (roleCode && roleCode.trim()) {
				const result = await api.role.fetchByRoleCode(roleCode);
				let role = result.data as SysRole;
				if (!(role && role.roleId)) {
					return true;
				} else {
					return '角色代码已存在，请更换其它名称';
				}
			}

			return '角色代码不能为空';
		};

		return {
			editedItem,
			operation,
			title,
			onVerify,
			uniqueRoleCode,
		};
	},
});
</script>
