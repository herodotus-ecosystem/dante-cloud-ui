<template>
	<div :class="['captcha', { show: open }]">
		<div class="captcha-box">
			<component
				:is="type"
				:schema="schema"
				:loading="loading"
				:identity="identity"
				:can-operate="canOperate"
				:success-text="successText"
				:failed-text="failedText"
				:canvas-width="canvasWidth"
				:canvas-height="canvasHeight"
				:slider-size="sliderDisplaySize"
				:captcha-type="type"
				@reset="onReset()"
				@verify="onVerify($event)"
			></component>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted, watch, toRefs } from 'vue';

import { useOpenApi } from '/@/apis';
import { useCryptoStore } from '/@/stores';

import HJigsawCaptcha from './HJigsawCaptcha.vue';
import HWordClickCaptcha from './HWordClickCaptcha.vue';

export default defineComponent({
	name: 'HBehaviorCaptcha',

	components: {
		WORD_CLICK: HWordClickCaptcha,
		JIGSAW: HJigsawCaptcha,
	},

	props: {
		open: { type: Boolean, default: false },
		type: { type: String, default: 'JIGSAW' },
		canvasWidth: { type: Number, default: 310 },
		canvasHeight: { type: Number, default: 155 },
		sliderSize: { type: Number, default: 30 },
		successText: { type: String, default: '验证通过!' },
		failedText: { type: String, default: '验证失败，请重试!' },
	},

	emits: ['update:open', 'verify'],

	setup(props, { emit }) {
		const openApi = useOpenApi();
		const crypto = useCryptoStore();

		const state = reactive({
			schema: {},
			loading: false,
			canOperate: false,
			identity: '',
		});

		/**
		 * 处理一下sliderSize，弄成整数，以免计算有偏差
		 */
		const sliderDisplaySize = computed(() => {
			return Math.max(Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)), 10);
		});

		const init = () => {
			state.loading = true;
			state.identity = crypto.sessionId;
			if (state.identity) {
				openApi
					.createCaptcha(state.identity, props.type)
					.then((result) => {
						state.schema = result.data;
						state.loading = false;
						state.canOperate = true;
					})
					.catch(() => {
						state.loading = false;
					});
			}
		};

		onMounted(() => {
			init();
		});

		watch(
			() => props.open,
			(newValue: boolean) => {
				emit('update:open', newValue);
				if (newValue) {
					document.body.classList.add('captcha-overflow');
					init();
				} else {
					document.body.classList.remove('captcha-overflow');
				}
			}
		);

		const onVerify = ($event: boolean) => {
			emit('verify', $event);
		};

		const onReset = () => {
			state.canOperate = false;
			init();
		};

		return {
			...toRefs(state),
			sliderDisplaySize,
			onReset,
			onVerify,
		};
	},
});
</script>

<style lang="scss">
.captcha {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;
	opacity: 0;
	pointer-events: none;
	transition: opacity 200ms;
	&.show {
		opacity: 1;
		pointer-events: auto;
	}
}

.captcha-box {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 20px;
	background: #fff;
	user-select: none;
	border-radius: 3px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	.captcha-body {
		position: relative;
		overflow: hidden;
		border-radius: 3px;
	}
}
.captcha-overflow {
	overflow: hidden !important;
}
</style>
