<template>
	<q-input v-model="text" outlined clearable v-bind="$attrs" class="q-mb-xs">
		<template #append>
			<slot name="append"></slot>
		</template>

		<template #before>
			<slot name="before"></slot>
		</template>

		<template #after>
			<slot name="after"></slot>
		</template>
	</q-input>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';

export default defineComponent({
	name: 'HTextField',

	props: {
		modelValue: { type: [String, Number] },
	},

	emits: ['update:modelValue'],

	setup(props, { emit, slots }) {
		const text = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		onMounted(() => {
			console.log(slots.before);
		});

		return {
			text,
		};
	},
});
</script>
