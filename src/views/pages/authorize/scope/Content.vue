<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			name="scopeCode"
			:value="editedItem.scopeCode"
			label="授权范围代码"
			:rules="uniqueScopeCode"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.scopeCode"
				v-bind="field"
				name="scopeCode"
				label="授权范围代码 * "
				placeholder="请使用小写英文单词编写的授权范围代码，例如：all、read_user等"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.scopeName" label="授权范围名称" placeholder="请输入授权范围名称"></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

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

		const debounce = ref(5000);

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		const uniqueScopeCode = async () => {
			let scopeCode = editedItem.value.scopeCode;
			if (scopeCode && scopeCode.trim()) {
				const result = await api.scope.fetchByScopeCode(scopeCode);
				let scope = result.data as OAuth2Scope;
				if (!(scope && scope.scopeId)) {
					return true;
				} else {
					return '范围代码已存在，请更换其它名称';
				}
			}

			return '范围代码不能为空';
		};

		return {
			editedItem,
			operation,
			title,
			debounce,
			onVerify,
			uniqueScopeCode,
		};
	},
});
</script>
