<template>
	<h-button flat round :color="color" :icon="icon" :tooltip="tooltip"></h-button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, reactive } from 'vue';
import type { ConstantDictionary } from '/@/lib/declarations';

import { useConstantsStore } from '/@/stores';
import { DATA_ITEM_STATUS } from '/@/settings';
import { HButton } from '/@/components';

export default defineComponent({
	name: 'HStatusColumn',

	components: {
		HButton,
	},

	props: {
		type: { type: Number, required: true },
	},

	setup(props) {
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
			return DATA_ITEM_STATUS[props.type].color;
		});

		const icon = computed(() => {
			return DATA_ITEM_STATUS[props.type].icon;
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
