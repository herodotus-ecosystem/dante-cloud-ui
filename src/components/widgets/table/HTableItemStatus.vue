<template>
	<h-button flat round :color="color" :icon="icon" :tooltip="tooltip"></h-button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, reactive } from 'vue';
import type { ConstantDictionary } from '/@/lib/declarations';

import { useConstantsStore } from '/@/stores';

import { HButton } from '/@/components';

export default defineComponent({
	name: 'HTableItemStatus',

	components: {
		HButton,
	},

	props: {
		type: { type: Number, required: true },
	},

	setup(props) {
		const display = [
			{ color: 'green', icon: 'mdi-shield-check' },
			{ color: 'error', icon: 'mdi-shield-off' },
			{ color: 'error', icon: 'mdi-shield-lock' },
			{ color: 'warning', icon: 'mdi-shield-edit' },
		];

		const state = reactive({
			items: [] as Array<ConstantDictionary>,
		});

		const initialize = () => {
			const constants = useConstantsStore();
			state.items = constants.getDictionary('status');
		};

		onBeforeMount(() => {
			initialize();
		});

		const color = computed(() => {
			return display[props.type].color;
		});

		const icon = computed(() => {
			return display[props.type].icon;
		});

		const tooltip = computed(() => {
			return state.items[props.type].text;
		});

		return {
			color,
			icon,
			tooltip,
		};
	},
});
</script>
