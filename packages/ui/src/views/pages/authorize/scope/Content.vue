<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
		<h-text-field
			v-model="editedItem.scopeCode"
			name="scopeCode"
			label="范围代码 * "
			placeholder="请使用小写英文单词编写的范围代码，例如：all、read_user等"
			debounce="5000"
			:error="v.editedItem.scopeCode.$error"
			:error-message="v.editedItem.scopeCode.$errors[0] ? v.editedItem.scopeCode.$errors[0].$message : ''"
			@blur="v.editedItem.scopeCode.$validate()"
		></h-text-field>
		<h-text-field v-model="editedItem.scopeName" label="范围名称" placeholder="请输入范围名称"></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { OAuth2Scope } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useAuthorizeApi } from '/@/apis';
import { HCenterFormLayout, HTextField } from '/@/components';

export default defineComponent({
	name: 'OAuth2ScopeContent',

	components: {
		HTextField,
		HCenterFormLayout,
	},

	setup(props) {
		const api = useAuthorizeApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<OAuth2Scope>(api.scope);

		const unique = () => {
			let scopeCode = editedItem.value.scopeCode;

			return new Promise((resolve, reject) => {
				if (scopeCode) {
					api.scope.fetchByScopeCode(scopeCode).then((result) => {
						let scope = result.data as OAuth2Scope;
						resolve(!(scope && scope.scopeId));
					});
				} else {
					reject(false);
				}
			});
		};

		const rules = {
			editedItem: {
				scopeCode: {
					required: helpers.withMessage('范围代码不能为空', required),
					unique: helpers.withMessage('范围代码已存在，请使用其它代码', helpers.withAsync(unique)),
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
