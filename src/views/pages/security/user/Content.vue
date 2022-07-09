<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
		<h-text-field
			v-model="editedItem.userName"
			name="userName"
			label="用户名 * "
			placeholder="请输入用户名"
			debounce="5000"
			:error="v.editedItem.userName.$error"
			:error-message="v.editedItem.userName.$errors[0] ? v.editedItem.userName.$errors[0].$message : ''"
			@change="v.editedItem.userName.$validate()"
		></h-text-field>
		<h-text-field v-model="editedItem.nickName" label="昵称" placeholder="请输入用户昵称"></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

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

		const unique = () => {
			let userName = editedItem.value.userName;

			return new Promise((resolve, reject) => {
				if (userName) {
					api.user.fetchByUsername(userName).then((result) => {
						let user = result.data as SysUser;
						resolve(!(user && user.userId));
					});
				} else {
					reject(false);
				}
			});
		};

		const rules = {
			editedItem: {
				userName: {
          required: helpers.withMessage('用户名不能为空', required),
					unique: helpers.withMessage('用户名已存在，请使用其它名称', helpers.withAsync(unique)),
				},
			},
		};

		const v = useVuelidate(rules, { editedItem }, { $lazy: true });

		const onSave = () => {
			v.value.$validate().then((result) => {
				if (result) {
					saveOrUpdate();
				}
			});
		};

		return {
			editedItem,
			operation,
			title,
			v,
			onSave,
		};
	},
});
</script>
