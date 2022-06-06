<template>
	<h-container column="two" gutter="sm" :offset="1" mode-for-two="right-left">
		<h-text-field v-model="code" label="验证码" placeholder="请输入验证码" bottom-slots dense @blur="verifyCaptcha()">
			<template #before>
				<q-icon color="primary" name="mdi-barcode-scan" />
			</template>
			<template #after>
				<q-btn v-if="isShowStatusIcon" round dense flat :color="color" :icon="icon" />
			</template>
		</h-text-field>

		<template #right>
			<q-img
				:src="graphicImageBase64"
				class="rounded-borders"
				spinner-size="20px"
				spinner-color="primary"
				style="height: 40px"
				fit="fill"
				alt="点击图片刷新"
				@click="onRefresh()"
			/>
		</template>
	</h-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';

import type { GraphicCaptcha } from '/@/lib/declarations';
import { CaptchaCategoryEnum } from '/@/lib/enums';

import { useCryptoStore } from '/@/stores';
import { useOpenApi } from '/@/apis';
import { variables } from '/@/lib/utils';

import { HContainer, HTextField } from '../../library';

export default defineComponent({
	name: 'HGraphicCaptcha',

	components: {
		HContainer,
		HTextField,
	},

	setup() {
		const openApi = useOpenApi();
		const crypto = useCryptoStore();

		const state = reactive({
			graphicImageBase64: '',
			code: '',
			isShowStatusIcon: false,
			icon: '',
			color: '',
		});

		const createCaptcha = async () => {
			const response = await openApi.createCaptcha(crypto.sessionId, variables.getCaptcha());

			if (!(variables.getCaptcha() === CaptchaCategoryEnum.JIGSAW && variables.getCaptcha() === CaptchaCategoryEnum.WORD_CLICK)) {
				const data = response.data as GraphicCaptcha;
				state.graphicImageBase64 = data.graphicImageBase64;
			}
		};

		const verifyCaptcha = () => {
			if (state.code) {
				openApi
					.verifyCaptcha(crypto.sessionId, variables.getCaptcha(), state.code)
					.then((response) => {
						const data = response.data as boolean;
						state.icon = 'mdi-check-circle';
						state.color = 'green';
						state.isShowStatusIcon = true;
					})
					.catch((error) => {
						state.icon = 'mdi-close-circle';
						state.color = 'red';
						state.isShowStatusIcon = true;
					});
			}
		};

		onMounted(() => {
			createCaptcha();
		});

		const onRefresh = () => {
			createCaptcha();
		};

		const onClear = () => {
			state.isShowStatusIcon = false;
		};

		return {
			...toRefs(state),
			verifyCaptcha,
			onRefresh,
			onClear,
		};
	},
});
</script>
