<template>
	<q-select
		ref="selectRef"
		v-model="selectedValue"
		:options="options"
		outlined
		clearable
		use-input
		use-chips
		emit-value
		bottom-slots
		input-debounce="300"
		transition-show="scale"
		transition-hide="scale"
		@filter="filter"
		v-bind="$attrs"
	>
		<template v-if="selectedValue" v-slot:prepend>
			<q-icon :name="selectedValue" color="primary" />
		</template>

		<template v-slot:option="scope">
			<q-item v-bind="scope.itemProps">
				<q-item-section avatar>
					<q-icon :name="scope.opt" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ scope.opt }}</q-item-label>
				</q-item-section>
			</q-item>
		</template>

		<template v-slot:no-option>
			<q-item>
				<q-item-section class="text-grey"> 没有数据 </q-item-section>
			</q-item>
		</template>
	</q-select>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, onMounted } from 'vue';
import type { QSelect, QSelectProps } from 'quasar';
import * as allIcons from '@mdi/js';

import { lodash } from '/@/lib/utils';

export default defineComponent({
	name: 'HIconSelect',

	props: {
		modelValue: { type: String },
		optionLabel: { type: String, default: 'text' },
		optionValue: { type: String, default: 'value' },
		errorMessage: { type: String },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const selectedValue = computed({
			// 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		let icons: Array<string> = [];
		const options = ref<Array<string>>(icons);

		onMounted(() => {
			icons = Object.keys(allIcons).map((icon) => {
				return lodash.kebabCase(icon);
			});
		});

		const filter = (value: string, update: (callbackFn: () => void, after?: (ref: QSelect) => void) => void, abort: () => void) => {
			if (value.length < 3) {
				abort();
				return;
			}

			update(() => {
				const needle = value.toLowerCase();
				options.value = icons.filter((v) => v.toLowerCase().match(needle));
			});
		};

		return {
			selectedValue,
			options,
			filter,
		};
	},
});
</script>
