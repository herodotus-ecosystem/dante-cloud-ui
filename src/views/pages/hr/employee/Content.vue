<template>
	<h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @verify="onVerify($event)">
		<validation-provider
			v-model="editedItem.employeeName"
			name="employeeName"
			validate-on-model-update
			label="人员姓名"
			:rules="uniqueEmployeeName"
			v-slot="{ errorMessage, field }"
		>
			<h-text-field
				v-model="editedItem.employeeName"
				v-bind="field"
				name="employeeName"
				label="人员姓名 * "
				placeholder="请输入姓名"
				debounce="1000"
				:error-message="errorMessage"
			></h-text-field>
		</validation-provider>
		<h-text-field v-model="editedItem.employeeNo" label="人员编号" placeholder="请输入人员编号"></h-text-field>
		<h-dictionary-select v-model="editedItem.gender" dictionary="gender" label="性别"></h-dictionary-select>
		<h-dictionary-select v-model="editedItem.identity" dictionary="identity" label="身份"></h-dictionary-select>
		<h-text-field v-model="editedItem.email" label="电子邮件" placeholder="请输入电子邮件"></h-text-field>
		<h-text-field v-model="editedItem.mobilePhoneNumber" label="手机号码" placeholder="请输入手机号码"></h-text-field>
		<h-text-field v-model="editedItem.officePhoneNumber" label="办公电话" placeholder="请输入办公电话"></h-text-field>
	</h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysEmployee } from '/@/lib/declarations';

import { useTableItem } from '/@/hooks';
import { useHrApi } from '/@/apis';
import { HCenterFormLayout, HTextField, HDictionarySelect } from '/@/components';

export default defineComponent({
	name: 'SysEmployeeContent',

	components: {
		HTextField,
		HCenterFormLayout,
		HDictionarySelect,
	},

	setup(props) {
		const api = useHrApi();
		const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysEmployee>(api.employee);

		const onVerify = ($event: boolean) => {
			if ($event) {
				saveOrUpdate();
			}
		};

		const uniqueEmployeeName = async () => {
			let employeeName = editedItem.value.employeeName;
			if (employeeName && employeeName.trim()) {
				const result = await api.employee.fetchByEmployeeName(employeeName);
				let employee = result.data as SysEmployee;
				if (!(employee && employee.employeeId)) {
					return true;
				} else {
					return '该人员已存在';
				}
			}

			return '人员姓名不能为空';
		};

		return {
			editedItem,
			operation,
			title,
			onVerify,
			uniqueEmployeeName,
		};
	},
});
</script>
