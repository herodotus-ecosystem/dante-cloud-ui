<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
		<h-text-field v-model="editedItem.dbVersion" label="数据库版本" placeholder="请输入数据库版本"></h-text-field>
		<h-text-field
			v-model="editedItem.dbPorts"
			name="dbPorts"
			label="数据库端口 * "
			placeholder="请输入数据库端口"
			:error="v.editedItem.dbPorts.$error"
			:error-message="v.editedItem.dbPorts.$errors[0] ? v.editedItem.dbPorts.$errors[0].$message : ''"
			@blur="v.editedItem.dbPorts.$validate()"
		></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import type { DatabaseInstance } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useCmdbApi } from '/@/apis';
import { HCenterFormLayout, HTextField } from '/@/components';

export default defineComponent({
	name: 'DatabaseInstanceContent',

	components: {
		HTextField,
		HCenterFormLayout,
	},

	setup(props) {
		const api = useCmdbApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<DatabaseInstance>(api.dbInstance);

		const rules = {
			editedItem: {
				dbPorts: {
					required: helpers.withMessage('数据库端口不能为空', required),
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
