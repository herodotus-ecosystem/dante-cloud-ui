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
import { defineComponent } from 'vue';

import type { SysUser } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useSecurityApi } from '/@/apis';
import { HTableItemEditor, HTextField } from '/@/components';

export default defineComponent({
	name: 'SysUserContent',

	components: {
		HTextField,
		HTableItemEditor,
	},

	setup(props) {
		const api = useSecurityApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysUser>(api.user);

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
