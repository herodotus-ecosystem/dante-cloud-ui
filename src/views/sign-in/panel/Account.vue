<template>
	<v-card class="elevation-20 mx-auto" style="z-index: 2" rounded="lg">
		<v-toolbar color="white" rounded flat>
			<template #prepend>
				<v-avatar>
					<v-img :src="logo" alt="John"></v-img>
				</v-avatar>
			</template>
			<v-spacer></v-spacer>

			<v-btn variant="text" class="text-h6" color="primary"> 欢迎使用 Herodotus Cloud</v-btn>
		</v-toolbar>
		<v-divider></v-divider>
		<v-card class="ma-5" flat>
			<v-card-title> 账号密码登录 </v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field id="username" label="用户名" name="musername" color="primary" clearable></v-text-field>
					<v-text-field id="password" label="密码" name="password" type="password" color="primary" clearable></v-text-field>
				</v-form>
				<v-btn block class="mb-5" color="primary" rounded="pill">登录</v-btn>
				<v-btn block class="mb-5" variant="outlined">手机验证码登录</v-btn>

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
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { getVuetifyImage } from '/@/utils';

export default defineComponent({
	name: 'HSignInAccountPanel',

	setup() {
		const logo = getVuetifyImage('vuetify-logo-v3-light.svg');

		return {
			logo,
		};
	},
});
</script>
