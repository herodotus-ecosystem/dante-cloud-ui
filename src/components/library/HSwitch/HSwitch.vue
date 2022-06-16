<template>
	<q-toggle v-model="switchValue" color="primary" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HSwitch',

	props: {
		modelValue: { type: [Boolean, Number, String, Array, Object], defalut: false },
		trueValue: { type: [Boolean, Number, String, Array, Object], default: true },
		falseValue: { type: [Boolean, Number, String, Array, Object], default: false },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const switchValue = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		return {
			switchValue,
		};
	},
});
</script>
