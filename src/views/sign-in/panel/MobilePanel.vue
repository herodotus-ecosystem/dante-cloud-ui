<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="手机验证码登录" align="left"></h-label>
		</q-card-section>

		<q-separator inset />

		<q-card-section class="q-gutter-y-lg">
			<h-text-field v-model="mobile" bottom-slot label="用户名" placeholder="请输入用户名" dense>
				<template #before>
					<q-icon color="primary" name="mdi-account" />
				</template>
			</h-text-field>
			<h-text-field v-model="verificationCode" label="密码" placeholder="请输入密码" dense>
				<template #before>
					<q-icon color="primary" name="mdi-key" />
				</template>
			</h-text-field>

			<q-btn rounded unelevated color="primary" class="full-width" label="登录" />

			<q-btn rounded unelevated outline class="full-width" label="手机验证码登录" />
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { HTextField, HContainer, HDivider, HRow, HLabel } from '/@/components';

export default defineComponent({
	name: 'MobilePanel',

	components: {
		HLabel,
		HTextField,
	},

	setup(props) {
		const mobile = ref('');
		const verificationCode = ref('');

		return {
			mobile,
			verificationCode,
		};
	},
});
</script>
