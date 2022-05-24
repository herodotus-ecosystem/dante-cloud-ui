<template>
	<v-text-field v-model="vModel" variant="outlined" clearable v-bind="$attrs"> </v-text-field>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HTextField',

	components: {},

	emits: ['update:modelValue'],

	props: {
		modelValue: { type: [String, Number] },
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
