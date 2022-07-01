<template>
	<q-dialog v-model="showDialog" persistent>
		<q-card class="q-py-none" style="min-width: 500px">
			<q-card-section class="row items-center">
				<div class="text-h6">设置/修改密码</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup />
			</q-card-section>

			<q-card-section>
				<h-text-field
					v-model="newPassword"
					label="新密码"
					placeholder="请输入新密码"
					dense
					:type="showNewPassword ? 'text' : 'password'"
					:error="v.newPassword.$error"
					:error-message="v.newPassword.$errors[0] ? v.newPassword.$errors[0].$message : ''"
					@blur="v.newPassword.$validate()"
				>
					<template #append>
						<h-visibility-button v-model="showNewPassword"></h-visibility-button>
					</template>
				</h-text-field>

				<h-text-field
					v-model="confirmPassword"
					label="确认密码"
					placeholder="请再次输入新密码"
					dense
					:type="showConfirmPassword ? 'text' : 'password'"
					:error="v.confirmPassword.$error"
					:error-message="v.confirmPassword.$errors[0] ? v.confirmPassword.$errors[0].$message : ''"
					@blur="v.confirmPassword.$validate()"
				>
					<template #append>
						<h-visibility-button v-model="showConfirmPassword"></h-visibility-button>
					</template>
				</h-text-field>
			</q-card-section>

			<q-card-actions align="right" class="text-primary">
				<q-btn label="取消" color="red" v-close-popup />
				<q-btn label="确认" color="primary" @click="onSave()" />
			</q-card-actions>

			<q-inner-loading :showing="loading">
				<q-spinner-dots size="50px" color="primary" />
			</q-inner-loading>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, sameAs, helpers } from '@vuelidate/validators';

import { useSecurityApi } from '/@/apis';
import { variables, toast } from '/@/lib/utils';
import { useCryptoStore } from '/@/stores';

import { HTextField, HVisibilityButton } from '../../library';

export default defineComponent({
	name: 'HChangePassword',

	components: {
		HTextField,
		HVisibilityButton,
	},

	props: {
		modelValue: { type: Boolean, default: false, required: true },
		userId: { type: String, required: true },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const newPassword = ref('');
		const confirmPassword = ref('');
		const showNewPassword = ref(false);
		const showConfirmPassword = ref(false);
		const loading = ref(false);

		const api = useSecurityApi();
		const crypto = useCryptoStore();

		const showDialog = computed({
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const rules = {
			newPassword: {
				required: helpers.withMessage('新密码不能为空', required),
			},
			confirmPassword: {
				required: helpers.withMessage('请输入确认密码', required),
				sameAs: helpers.withMessage('两次输入密码不一致', sameAs(newPassword)),
			},
		};

		const v = useVuelidate(rules, { newPassword, confirmPassword }, { $lazy: true });

		const onSave = () => {
			v.value.$validate().then((result) => {
				if (result) {
					loading.value = true;
					const password = variables.isUseCrypto() ? crypto.encrypt(confirmPassword.value) : confirmPassword.value;
					api.user
						.changePassword(props.userId, password)
						.then((response) => {
							if (response) {
								loading.value = false;
								showDialog.value = false;
								toast.success('设置/修改密码成功！');
							}
						})
						.catch((error) => {
							loading.value = false;
							showDialog.value = false;
							toast.error('设置/修改密码失败！');
						});
				}
			});
		};

		return {
			showDialog,
			newPassword,
			confirmPassword,
			showNewPassword,
			showConfirmPassword,
			loading,
			v,
			onSave,
		};
	},
});
</script>
