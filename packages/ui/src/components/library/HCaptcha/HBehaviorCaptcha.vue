<template>
	<q-dialog v-model="dialog">
		<q-card>
			<q-bar class="text-white">
				<q-space />

				<q-btn round dense flat icon="mdi-refresh" @click="onReset()">
					<q-tooltip>刷新</q-tooltip>
				</q-btn>

				<q-btn round dense flat icon="close" v-close-popup>
					<q-tooltip>关闭</q-tooltip>
				</q-btn>
			</q-bar>

			<q-card-section>
				<q-card>
					<component
						:is="type"
						:schema="schema"
						:canvas-width="canvasWidth"
						:canvas-height="canvasHeight"
						:slider-size="sliderDisplaySize"
						:loading="isLoading"
						@reset="onReset()"
						@verify="onVerify($event)"
					></component>
				</q-card>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, watch } from 'vue';

import { useBehaviorCaptcha } from '/@/hooks';

import HJigsawCaptcha from './HJigsawCaptcha.vue';
import HWordClickCaptcha from './HWordClickCaptcha.vue';

export default defineComponent({
	name: 'HBehaviorCaptcha',

	components: {
		WORD_CLICK: HWordClickCaptcha,
		JIGSAW: HJigsawCaptcha,
	},

	props: {
		modelValue: Boolean,
		type: { type: String as PropType<'JIGSAW' | 'WORD_CLICK'>, default: 'JIGSAW' },
		canvasWidth: { type: Number, default: 310 },
		canvasHeight: { type: Number, default: 155 },
		sliderSize: { type: Number, default: 30 },
	},

	emits: ['update:modelValue', 'update:open', 'verify'],

	setup(props, { emit }) {
		const { fetchCaptcha, canOperate, schema, isLoading } = useBehaviorCaptcha();

		const dialog = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		/**
		 * 处理一下sliderSize，弄成整数，以免计算有偏差
		 */
		const sliderDisplaySize = computed(() => {
			return Math.max(Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)), 10);
		});

		const init = () => {
			fetchCaptcha(props.type);
		};

		watch(
			() => props.modelValue,
			(newValue: boolean) => {
				if (newValue) {
					init();
				}
			},
			{
				immediate: true,
			}
		);

		const onVerify = ($event: boolean) => {
			emit('verify', $event);
		};

		const onReset = () => {
			canOperate.value = false;
			init();
		};

		return {
			dialog,
			sliderDisplaySize,
			onReset,
			onVerify,
			schema,
			isLoading,
		};
	},
});
</script>
