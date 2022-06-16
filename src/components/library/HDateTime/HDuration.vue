<template>
	<div>{{ durationValue }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';

import { moment } from '/@/lib/utils';

export default defineComponent({
	name: 'HDuration',

	props: {
		modelValue: { type: String, defalut: '' },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const durationValue = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const dataToDuration = (value: string) => {
			if (value) {
				let duration = moment.duration(value);
				console.log(duration);
				console.log(typeof duration);
			}
		};

		watch(
			() => props.modelValue,
			(newValue) => {
				if (newValue) {
					dataToDuration(newValue);
				}
			},
			{
				immediate: true,
			}
		);

		return {
			durationValue,
		};
	},
});
</script>
