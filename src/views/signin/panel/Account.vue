<template>
	<v-card class="ma-5" flat>
		<v-card-title> 账号密码登录 </v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field
					v-model="username"
					id="username"
					label="用户名"
					name="username"
					color="primary"
					density="compact"
					variant="outlined"
					shaped
					clearable
				></v-text-field>
				<v-text-field
					v-model="password"
					id="password"
					label="密码"
					name="password"
					type="password"
					color="primary"
					density="compact"
					variant="outlined"
					shaped
					clearable
				></v-text-field>

				<v-row justify="center">
					<v-col cols="7"
						><v-text-field
							id="captcha"
							label="验证码"
							name="captcha"
							color="primary"
							density="compact"
							variant="outlined"
							placeholder="点击图片刷新验证码"
							shaped
							clearable
						></v-text-field
					></v-col>
					<v-col cols="5"><v-btn block variant="outlined">验证码</v-btn></v-col>
				</v-row>
			</v-form>
			<v-btn block class="mb-5" color="primary" rounded="pill" @click="signIn()">登录</v-btn>

			<v-row justify="center">
				<v-col cols="6"><v-btn block variant="outlined" @click="application.switchToMobilePanel()">手机验证码登录</v-btn></v-col>
				<v-col cols="6"><v-btn block variant="outlined" @click="application.switchToScanPanel()">扫码登录</v-btn></v-col>
			</v-row>

			<v-row justify="center">
				<v-col cols="4" align-self="center"><v-divider></v-divider></v-col>
				<v-col cols="4"><v-btn block variant="text" size="small">其它登录方式</v-btn></v-col>
				<v-col cols="4" align-self="center"><v-divider></v-divider></v-col>
			</v-row>

			<v-row class="mt-2 mb-5" justify="center">
				<v-btn icon size="small" color="primary">
					<v-icon> mdi-wechat </v-icon>
				</v-btn>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore, useAuthenticationStore } from '/@/stores';

export default defineComponent({
	name: 'HSignInAccountPanel',

	setup() {
		const application = useApplicationStore();
		const authentication = useAuthenticationStore();
		const router = useRouter();

		const username = ref('');
		const password = ref('');

		const signIn = () => {
			authentication.signIn(username.value, password.value);
			signInSuccess();
		};

		const signInSuccess = () => {
			if (authentication.access_token) {
				router.push({
					path: '/',
				});
			}
		};

		return {
			application,
			signIn,
			username,
			password,
		};
	},
});
</script>
