<template>
	<v-row justify="space-between" dense>
		<v-col cols="8" align-self="center">
			<h-label :text="label" manner="button" align="left"></h-label>
		</v-col>
		<v-col cols="4" align-self="center">
			<v-switch
				v-model="newModelValue"
				:true-value="trueValue"
				:false-value="falseValue"
				hide-details
				inset
				density="compact"
				color="primary"
				class="ml-8"
			></v-switch>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { HLabel } from '../HLabel';

export default defineComponent({
	name: 'HSettingSwitch',
	components: {
		HLabel,
	},
	props: {
		modelValue: {
			type: [String, Boolean],
			default: false,
		},
		trueValue: {
			type: [String, Boolean],
			default: true,
		},
		falseValue: {
			type: [String, Boolean],
			default: false,
		},
		label: String,
	},
	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const newModelValue = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});
		return {
			newModelValue,
		};
	},
});
</script>
