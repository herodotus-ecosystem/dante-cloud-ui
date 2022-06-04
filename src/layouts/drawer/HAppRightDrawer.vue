<template>
	<q-drawer v-model="drawer" side="right" show-if-above bordered :width="240"></q-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HAppRightDrawer',

	props: {
		modelValue: { type: Boolean, required: true },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const drawer = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		return {
			drawer,
		};
	},
});
</script>
