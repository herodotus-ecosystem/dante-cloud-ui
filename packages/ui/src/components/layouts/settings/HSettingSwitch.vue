<template>
	<q-item tag="label">
		<q-item-section>
			<q-item-label>{{ label }}</q-item-label>
		</q-item-section>
		<q-item-section avatar>
			<q-toggle color="primary" v-model="switchValue" :val="falseValue" :true-value="trueValue" :false-value="falseValue" />
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
	name: 'HSettingSwitch',

	props: {
		modelValue: { type: [String, Number, Boolean, Array, Object] },
		trueValue: { type: [String, Number, Boolean, Array, Object], default: true },
		falseValue: { type: [String, Number, Boolean, Array, Object], default: false },
		label: String,
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
