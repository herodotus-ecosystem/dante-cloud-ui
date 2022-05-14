<template>
	<v-row justify="center">
		<v-col cols="7"
			><v-text-field
				v-model="code"
				id="captcha"
				label="验证码"
				name="captcha"
				color="primary"
				density="compact"
				variant="outlined"
				placeholder="点击图片刷新验证码"
				shaped
				clearable
				@keyup.delete="onClear()"
				@click:clear="onClear()"
				@blur.native.capture="verifyCaptcha()"
			>
				<template v-slot:append>
					<v-fade-transition>
						<v-icon v-if="isShowIcon" :icon="icon" :color="color"> </v-icon>
					</v-fade-transition>
				</template> </v-text-field
		></v-col>
		<v-col cols="5">
			<v-card flat variant="outlined" height="40" @click="onRefresh()"> <v-img :src="graphicImageBase64" cover :transition="false"></v-img> </v-card
		></v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue';
import type { GraphicCaptcha } from '/@/lib/declarations';
import { CaptchaCategory } from '/@/lib/enums';

import { useCryptoStore } from '/@/stores';
import { useOpenApi } from '/@/apis';
import { variables } from '/@/lib/utils';

export default defineComponent({
	name: 'HGraphicCaptcha',

	emits: ['verify'],

	setup(props, { emit }) {
		const openApi = useOpenApi();
		const crypto = useCryptoStore();

		const state = reactive({
			graphicImageBase64: '',
			code: '',
			isShowIcon: false,
			icon: '',
			color: '',
		});

		const createCaptcha = async () => {
			const response = await openApi.createCaptcha(crypto.sessionId, variables.getCaptcha());

			if (!(variables.getCaptcha() === CaptchaCategory.JIGSAW && variables.getCaptcha() === CaptchaCategory.WORD_CLICK)) {
				const data = response.data as GraphicCaptcha;
				state.graphicImageBase64 = data.graphicImageBase64;
			}
		};

		const emitVerify = (valid: boolean) => {
			emit('verify', valid);
		};

		const verifyCaptcha = () => {
			if (state.code) {
				openApi
					.verifyCaptcha(crypto.sessionId, variables.getCaptcha(), state.code)
					.then((response) => {
						const data = response.data as boolean;
						state.icon = 'mdi-check-circle';
						state.color = 'green';
						state.isShowIcon = true;
						emitVerify(true);
					})
					.catch((error) => {
						state.icon = 'mdi-close-circle';
						state.color = 'red';
						state.isShowIcon = true;
						emitVerify(false);
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
			state.isShowIcon = false;
		};

		return {
			...toRefs(state),
			onRefresh,
			verifyCaptcha,
			onClear,
		};
	},
});
</script>
