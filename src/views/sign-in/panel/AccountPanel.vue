<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="账号密码登录" align="left"></h-label>
		</q-card-section>

		<q-separator inset />

		<q-card-section>
			<validation-observer as="v-form" ref="formRef">
				<validation-provider v-model="username" name="username" validate-on-blur label="用户名" rules="required" v-slot="{ errorMessage, field }">
					<h-text-field
						v-model="username"
						v-bind="field"
						bottom-slot
						label="用户名"
						placeholder="请输入用户名"
						dense
						autofocus
						:error-message="errorMessage"
						:error="errorMessage ? true : false"
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
						:type="isShowPassword ? 'password' : 'text'"
						:error-message="errorMessage"
						:error="errorMessage ? true : false"
					>
						<template #before>
							<q-icon color="primary" name="mdi-key" />
						</template>
						<template #append>
							<q-icon :name="isShowPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isShowPassword = !isShowPassword" />
						</template>
					</h-text-field>
				</validation-provider>

				<h-graphic-captcha></h-graphic-captcha>

				<q-btn rounded unelevated color="primary" class="full-width q-mb-md" label="登录" />

				<h-container column="two" gutter="md" horizontal-gutter class="q-mb-md">
					<template #left>
						<q-btn outline class="full-width" @click="application.switchToMobilePanel()" label="手机验证码登录" />
					</template>
					<template #right>
						<q-btn outline class="full-width" @click="application.switchToScanPanel()" label="扫码登录" />
					</template>
				</h-container>

				<h-divider label="其它登录方式" class="q-mb-md"> </h-divider>

				<h-row><q-btn round color="primary" icon="mdi-wechat" /> </h-row>
			</validation-observer>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useApplicationStore, useCryptoStore } from '/@/stores';

import { variables } from '/@/lib/utils';

import { HTextField, HContainer, HDivider, HRow, HLabel, HGraphicCaptcha } from '/@/components';

export default defineComponent({
	name: 'AccountPanel',

	components: {
		HContainer,
		HDivider,
		HGraphicCaptcha,
		HLabel,
		HRow,
		HTextField,
	},

	setup(props, { slots }) {
		const application = useApplicationStore();
		const crypto = useCryptoStore();

		const username = ref('');
		const password = ref('');
		const isShowPassword = ref(false);

		return {
			application,
			username,
			password,
			isShowPassword,
		};
	},
});
</script>
