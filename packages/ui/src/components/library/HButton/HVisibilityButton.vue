<template>
	<q-icon :name="isShowPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer" @click="isShowPassword = !isShowPassword" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HVisibilityButton',

	props: {
		modelValue: { type: Boolean },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const isShowPassword = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		return {
			isShowPassword,
		};
	},
});
</script>
