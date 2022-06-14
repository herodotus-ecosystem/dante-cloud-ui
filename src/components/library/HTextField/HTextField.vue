<template>
	<q-input v-model="text" outlined clearable :bottom-slots="hasError" :error="hasError" :error-message="errorMessage" v-bind="$attrs" class="q-my-md">
		<template v-if="$slots.append" #append>
			<slot name="append"></slot>
		</template>

		<template v-if="$slots.before" #before>
			<slot name="before"></slot>
		</template>

		<template v-if="$slots.after" #after>
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
		errorMessage: { type: String },
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

		const hasError = computed(() => {
			return props.errorMessage ? true : false;
		});

		return {
			text,
			hasError,
		};
	},
});
</script>
