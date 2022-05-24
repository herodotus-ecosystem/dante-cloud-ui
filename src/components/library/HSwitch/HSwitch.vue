<template>
	<v-switch v-model="vModel" :true-value="trueValue" :false-value="falseValue" inset v-bind="$attrs"></v-switch>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HSwitch',

	props: {
		modelValue: { type: [String, Boolean] },
		trueValue: { type: [String, Boolean], default: true },
		falseValue: { type: [String, Boolean], default: false },
	},

	setup(props, { emit }) {
		const vModel = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		return {
			vModel,
		};
	},
});
</script>
