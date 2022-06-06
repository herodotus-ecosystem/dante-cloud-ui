<template>
	<q-card>
		<q-card-section>
			<h-label size="h6" text="账号密码登录" align="left"></h-label>
		</q-card-section>

		<q-separator inset />

		<q-card-section class="q-gutter-y-lg">
			<h-text-field v-model="username" bottom-slot label="用户名" placeholder="请输入用户名" dense>
				<template #before>
					<q-icon color="primary" name="mdi-account" />
				</template>
			</h-text-field>
			<h-text-field v-model="password" label="密码" placeholder="请输入密码" dense>
				<template #before>
					<q-icon color="primary" name="mdi-key" />
				</template>
			</h-text-field>

			<q-btn rounded unelevated color="primary" class="full-width" label="登录" />

			<h-container column="two" gutter="md" horizontal-gutter>
				<template #left>
					<q-btn outline class="full-width" @click="application.switchToMobilePanel()" label="手机验证码登录" />
				</template>
				<template #right>
					<q-btn outline class="full-width" @click="application.switchToScanPanel()" label="扫码登录" />
				</template>
			</h-container>

			<h-divider label="其它登录方式"> </h-divider>

			<h-row><q-btn round color="primary" icon="mdi-wechat" /> </h-row>
		</q-card-section>
	</q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { HTextField, HContainer, HDivider, HRow, HLabel } from '/@/components';

import { useApplicationStore } from '/@/stores';

export default defineComponent({
	name: 'AccountPanel',

	components: {
		HContainer,
		HDivider,
		HLabel,
		HRow,
		HTextField,
	},

	setup(props, { slots }) {
		const application = useApplicationStore();

		const username = ref('');
		const password = ref('');

		onMounted(() => {
			console.log(slots.before);
		});

		return {
			application,
			username,
			password,
		};
	},
});
</script>
