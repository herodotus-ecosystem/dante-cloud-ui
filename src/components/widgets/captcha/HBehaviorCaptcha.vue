<template>
	<v-dialog v-model="dialog">
		<v-card>
			<v-toolbar density="compact" class="pa-0">
				<v-spacer></v-spacer>
				<v-btn icon size="x-small" class="mr-2" @click="onReset()">
					<v-icon>mdi-refresh</v-icon>
				</v-btn>
				<v-btn icon size="x-small" class="mr-2" @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-container fluid class="pt-0">
				<v-row>
					<v-col>
						<v-card class="pa-2">
							<component
								:is="type"
								:schema="schema"
								:canvas-width="canvasWidth"
								:canvas-height="canvasHeight"
								:slider-size="sliderDisplaySize"
								@reset="onReset()"
								@verify="onVerify($event)"
							></component>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, watch, PropType } from 'vue';

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
		const { fetchCaptcha, canOperate, schema } = useBehaviorCaptcha();

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
		};
	},
});
</script>
