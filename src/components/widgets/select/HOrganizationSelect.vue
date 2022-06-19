<template>
	<q-select
		v-model="selectedValue"
		:options="ogranizations"
		option-label="organizationName"
		option-value="organizationId"
		outlined
		use-chips
		clearable
		emit-value
		map-options
		transition-show="scale"
		transition-hide="scale"
		label="所属单位"
		placeholder="请选择所属单位"
		:bottom-slots="hasError"
		:error="hasError"
		:error-message="errorMessage"
		v-bind="$attrs"
	></q-select>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, Ref, onMounted } from 'vue';
import type { SysOrganization } from '/@/lib/declarations';

import { useHrApi } from '/@/apis';

export default defineComponent({
	name: 'HOrganizationSelect',

	props: {
		modelValue: { type: [Number, String] },
		category: { type: [Number, String], default: '' },
		errorMessage: { type: String },
	},

	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const api = useHrApi();

		const ogranizations = ref([]) as Ref<Array<SysOrganization>>;

		const selectedValue = computed({
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		const loadData = (category: string | number) => {
			api.organization.fetchAll({ category: category }).then((result) => {
				const data = result.data as Array<SysOrganization>;
				ogranizations.value = data;
			});
		};

		const hasError = computed(() => {
			return props.errorMessage ? true : false;
		});

		onMounted(() => {
			loadData(props.category);
		});

		watch(
			() => props.category,
			(newValue: string | number) => {
				loadData(newValue);
			},
			{
				immediate: true,
			}
		);

		return {
			ogranizations,
			selectedValue,
			hasError,
		};
	},
});
</script>
