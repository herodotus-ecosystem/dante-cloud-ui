<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.userName"
			name="userName"
			validate-on-input
			label="用户名"
			:rules="uniqueUsername"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.userName"
				v-bind="field"
				name="userName"
				label="用户名 * "
				placeholder="请输入用户名"
				:error-message="errorMessage"
				:error="errorMessage ? true : false"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.nickName" label="昵称" placeholder="请输入用户昵称"></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysUser } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';
import { HCenterFormLayout, HTextField } from '/@/components';

export default defineComponent({
	name: 'SysUserContent',

	components: {
		HTextField,
		HCenterFormLayout,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUser>(api.user);

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		const uniqueUsername = async () => {
			let username = editedItem.value.userName;
			if (username && username.trim()) {
				const result = await api.user.fetchByUsername(username);
				let user = result.data as SysUser;
				if (!(user && user.userId)) {
					return true;
				} else {
					return '用户名已存在，请更换其它名称';
				}
			}

			return '用户名不能为空';
		};

		return {
			editedItem,
			operation,
			title,
			onVerify,
			uniqueUsername,
		};
	},
});
</script>
