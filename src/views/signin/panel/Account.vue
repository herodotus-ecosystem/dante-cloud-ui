<template>
	<v-card class="ma-5" flat>
		<v-card-title> 账号密码登录 </v-card-title>
		<v-card-text>
			<validation-observer as="v-form" ref="formRef">
				<validation-provider v-model="username" name="username" label="用户名" rules="required" v-slot="{ errors, field }">
					<v-text-field
						v-bind="field"
						id="username"
						label="用户名"
						color="primary"
						density="compact"
						variant="outlined"
						shaped
						clearable
						:error-messages="errors"
					></v-text-field>
				</validation-provider>

				<validation-provider v-model="password" name="password" label="密码" rules="required" v-slot="{ errors, field }">
					<v-text-field
						v-bind="field"
						id="password"
						label="密码"
						type="password"
						color="primary"
						density="compact"
						variant="outlined"
						shaped
						clearable
						:error-messages="errors"
					></v-text-field>
				</validation-provider>
				<v-btn block class="mb-5" color="primary" rounded="pill" :disabled="isSubmitDisabled" @click="onShowCaptcha">登录</v-btn>
			</validation-observer>
			<!-- <h-graphic-captcha></h-graphic-captcha> -->
			<h-behavior-captcha v-model:open="isShowCaptcha" @verify="onCaptchaVerfiy($event)"></h-behavior-captcha>

			<v-row justify="center">
				<v-col cols="6"><v-btn block variant="outlined" @click="application.switchToMobilePanel()">手机验证码登录</v-btn></v-col>
				<v-col cols="6"><v-btn block variant="outlined" @click="application.switchToScanPanel()">扫码登录</v-btn></v-col>
			</v-row>

			<h-text-divider class="mt-5" label="其它登录方式"></h-text-divider>

			<v-row class="mt-2 mb-5" justify="center">
				<v-btn icon size="small" color="primary" :disabled="isSubmitDisabled">
					<v-icon> mdi-wechat </v-icon>
				</v-btn>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore, useAuthenticationStore } from '/@/stores';
import { HTextDivider, HGraphicCaptcha, HBehaviorCaptcha } from '/@/components';
import { Path } from '/@/lib/enums';
import { toast } from '/@/lib/utils';
import type { VForm } from 'vuetify/lib/components';

export default defineComponent({
	name: 'HSignInAccountPanel',
	components: {
		HTextDivider,
		HGraphicCaptcha,
		HBehaviorCaptcha,
	},

	setup() {
		const application = useApplicationStore();
		const authentication = useAuthenticationStore();
		const router = useRouter();

		const state = reactive({
			username: '',
			password: '',
			isShowCaptcha: false,
			isCaptchaValid: false,
			isSubmitDisabled: false,
		});

		const signIn = async () => {
			state.isSubmitDisabled = true;

			authentication
				.signIn(state.username, state.password)
				.then((response) => {
					if (response) {
						state.isSubmitDisabled = false;
						toast.success('欢迎回来！');
						router.push({
							path: Path.HOME,
						});
					}
				})
				.catch((error) => {
					state.isSubmitDisabled = false;
				});
		};

		const onCaptchaVerfiy = ($event: boolean) => {
			console.log('onCaptchaVerfiy');
			if ($event) {
				state.isShowCaptcha = false;
				signIn();
			}
		};

		const formRef = ref(null);

		const onShowCaptcha = () => {
			const refs = formRef.value as InstanceType<typeof VForm>;
			if (refs) {
				refs.validate().then((result: any) => {
					if (result && result.valid) {
						state.isShowCaptcha = true;
					}
				});
			}
		};

		return {
			...toRefs(state),
			application,
			signIn,
			onShowCaptcha,
			onCaptchaVerfiy,
			formRef,
		};
	},
});
</script>
