<template>
	<v-card class="ma-5" flat>
		<v-card-title> 账号密码登录 </v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field id="mobile" label="手机号码" name="mobile" color="primary" density="compact" variant="outlined" shaped clearable></v-text-field>

				<v-row justify="center">
					<v-col class="pt-0 pb-0" cols="7">
						<v-text-field
							id="code"
							label="短信验证码"
							name="code"
							type="password"
							color="primary"
							density="compact"
							variant="outlined"
							shaped
							clearable
						></v-text-field
					></v-col>
					<v-col class="pt-0 pb-0" cols="5"><v-btn block variant="outlined">验证码</v-btn></v-col>
				</v-row>

				<v-row justify="center">
					<v-col class="pt-0 pb-0" cols="7"
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
					<v-col class="pt-0 pb-0" cols="5"><v-btn block variant="outlined">验证码</v-btn></v-col>
				</v-row>
			</v-form>
			<v-btn block class="mb-5" color="primary" rounded="pill">登录</v-btn>
			<v-btn block class="mb-5" color="primary" variant="outlined" rounded="pill" @click="application.switchToAccountPanel()">返回</v-btn>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'HSignInMobilePanel',

	setup() {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
