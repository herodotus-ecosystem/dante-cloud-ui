<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="账号密码登录" align="left"></h-label>
		</q-card-section>

		<q-separator inset />

		<q-card-section>
			<q-btn v-if="hasError" align="left" outline color="negative" class="q-mb-sm full-width" :label="errorMessage" icon="mdi-close-circle-outline" />
			<validation-observer ref="formRef">
				<validation-provider v-model="username" name="username" validate-on-blur label="用户名" rules="required" v-slot="{ errorMessage, field }">
					<h-text-field
						v-model="username"
						v-bind="field"
						bottom-slot
						label="用户名"
						placeholder="请输入用户名"
						dense
						:error-message="errorMessage"
						:error="errorMessage ? true : false"
						@blur="onResetError()"
					>
						<template #before>
							<q-icon color="primary" name="mdi-account" />
						</template>
					</h-text-field>
				</validation-provider>
				<validation-provider v-model="password" name="password" validate-on-blur label="密码" rules="required" v-slot="{ errorMessage, field }">
					<h-text-field
						v-model="password"
						v-bind="field"
						label="密码"
						placeholder="请输入密码"
						bottom-slots
						dense
						:type="isShowPassword ? 'text' : 'password'"
						:error-message="errorMessage"
						:error="errorMessage ? true : false"
					>
						<template #before>
							<q-icon color="primary" name="mdi-key" />
						</template>
						<template #append>
							<q-icon :name="isShowPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="isShowPassword = !isShowPassword" />
						</template>
					</h-text-field>
				</validation-provider>

				<q-btn rounded unelevated color="primary" class="full-width q-mb-md" label="登录" @click="onShowCaptcha()" />
				<h-behavior-captcha v-model="isShowCaptcha" @verify="onCaptchaVerfiy($event)"></h-behavior-captcha>

				<h-container mode="two" gutter="md" gutter-col horizontal class="q-mb-md">
					<template #left>
						<q-btn outline class="full-width" @click="application.switchToMobilePanel()" label="手机验证码登录" />
					</template>
					<template #right>
						<q-btn outline class="full-width" @click="application.switchToScanPanel()" label="扫码登录" />
					</template>
				</h-container>

				<h-divider label="其它登录方式" class="q-mb-md"> </h-divider>

				<h-row justify="center"><q-btn round color="primary" icon="mdi-wechat" /> </h-row>
			</validation-observer>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useApplicationStore, useCryptoStore, useAuthenticationStore } from '/@/stores';
import { useRouter } from 'vue-router';

import type { QForm } from 'quasar';

import { PathEnum } from '/@/lib/enums';
import { toast, variables } from '/@/lib/utils';

import { HTextField, HContainer, HDivider, HRow, HLabel, HBehaviorCaptcha } from '/@/components';

export default defineComponent({
	name: 'AccountPanel',

	components: {
		HContainer,
		HDivider,
		HBehaviorCaptcha,
		HLabel,
		HRow,
		HTextField,
	},

	setup(props, { slots }) {
		const application = useApplicationStore();
		const authentication = useAuthenticationStore();
		const crypto = useCryptoStore();

		const router = useRouter();

		const username = ref('');
		const password = ref('');
		const errorMessage = ref('');
		const isShowPassword = ref(false);
		const isShowCaptcha = ref(false);
		const isSubmitDisabled = ref(false);
		const hasError = ref(false);

		const signIn = async () => {
			isSubmitDisabled.value = true;

			authentication
				.signIn(username.value, password.value)
				.then((response) => {
					if (response) {
						isSubmitDisabled.value = false;
						toast.success('欢迎回来！');
						router.push({
							path: PathEnum.HOME,
						});
					}
				})
				.catch((error) => {
					isSubmitDisabled.value = false;
					if (error.message) {
						errorMessage.value = error.message;
						hasError.value = true;
					}
				});
		};

		const onResetError = () => {
			errorMessage.value = '';
			hasError.value = false;
		};

		const formRef = ref(null);

		const onShowCaptcha = () => {
			const refs = formRef.value as unknown as InstanceType<typeof QForm>;

			if (refs) {
				refs.validate().then((result: any) => {
					if (result && result.valid) {
						isShowCaptcha.value = true;
					}
				});
			}
		};

		const onCaptchaVerfiy = ($event: boolean) => {
			if ($event) {
				isShowCaptcha.value = false;
				signIn();
			}
		};

		return {
			application,
			username,
			password,
			isShowPassword,
			isShowCaptcha,
			onShowCaptcha,
			onCaptchaVerfiy,
			formRef,
			errorMessage,
			hasError,
			onResetError,
		};
	},
});
</script>
