<template>
	<q-dialog v-model="showDialog" persistent>
		<q-card class="q-py-none" style="min-width: 500px">
			<q-card-section class="row items-center">
				<div class="text-h6">设置/修改密码</div>
				<q-space />
				<q-btn icon="close" flat round dense v-close-popup />
			</q-card-section>

			<q-card-section>
				<validation-observer ref="formRef">
					<validation-provider
						v-model="newPassword"
						name="newPassword"
						validate-on-blur
						label="新密码"
						rules="required"
						v-slot="{ errorMessage, field }"
					>
						<h-text-field
							v-model="newPassword"
							v-bind="field"
							label="新密码"
							placeholder="请输入新密码"
							:type="showNewPassword ? 'text' : 'password'"
							:error-message="errorMessage"
						>
							<template #append>
								<h-visibility-button v-model="showNewPassword"></h-visibility-button>
							</template>
						</h-text-field>
					</validation-provider>
					<validation-provider
						v-model="confirmPassword"
						name="confirmPassword"
						validate-on-model-update
						label="确认密码"
						rules="required|confirmed:@newPassword"
						v-slot="{ errorMessage, field }"
					>
						<h-text-field
							v-model="confirmPassword"
							v-bind="field"
							label="确认密码"
							placeholder="请再次输入新密码"
							:type="showConfirmPassword ? 'text' : 'password'"
							:error-message="errorMessage"
						>
							<template #append>
								<h-visibility-button v-model="showConfirmPassword"></h-visibility-button>
							</template>
						</h-text-field>
					</validation-provider>
				</validation-observer>
			</q-card-section>

			<q-card-actions align="right" class="text-primary">
				<q-btn label="取消" color="red" v-close-popup />
				<q-btn label="确认" color="primary" @click="onSave()" />
			</q-card-actions>

			<q-inner-loading :showing="loading">
				<q-spinner-grid size="50px" color="primary" />
			</q-inner-loading>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import type { QForm } from 'quasar';

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
		const formRef = ref(null);

		const api = useSecurityApi();
		const crypto = useCryptoStore();

		const showDialog = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const onSave = () => {
			const refs = formRef.value as unknown as InstanceType<typeof QForm>;

			if (refs) {
				refs.validate().then((result: any) => {
					if (result && result.valid) {
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
			}
		};

		return {
			showDialog,
			newPassword,
			confirmPassword,
			showNewPassword,
			showConfirmPassword,
			loading,
			onSave,
			formRef,
		};
	},
});
</script>
