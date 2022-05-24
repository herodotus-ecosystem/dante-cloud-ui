<template>
	<h-table-item-editor :entity="editedItem" :content="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider v-model="editedItem.userName" name="username" label="用户名" rules="required" v-slot="{ errors, field }">
			<h-text-field
				v-bind="field"
				:model-value="editedItem.userName"
				name="username"
				label="用户名 * "
				placeholder="请输入用户名"
				:error-messages="errors"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.nickName" label="昵称" placeholder="请输入用户昵称"></h-text-field>
	</h-table-item-editor>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import type { SysUser } from '/@/lib/declarations';

import { useRoute } from 'vue-router';

import { lodash } from '/@/lib/utils';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';

import { HSheet, HLayout, HTableItemEditor, HTextField } from '/@/components';

export default defineComponent({
	name: 'SysUserContent',

	components: {
		HSheet,
		HLayout,
		HTextField,
		HTableItemEditor,
	},

	setup() {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUser>(api.user);

		const route = useRoute();

		const getParent = (path: string) => {
			const array = lodash.split(path, '/');
			const result = lodash.dropRight(array);
			return lodash.join(result, '/');
		};

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		onMounted(() => {
			if (route.params && route.params.item) {
				const param = route.params.item as string;
				let item = JSON.parse(param);
				console.log(item);

				const destination = getParent(route.path);
				console.log(destination);
			}

			console.log(route.params);
		});

		return {
			editedItem,
			operation,
			title,
			onVerify,
		};
	},
});
</script>
