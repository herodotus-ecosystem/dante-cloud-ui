<template>
	<h-dense-icon-button :color="color" :icon="icon" :tooltip="tooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, computed, reactive } from 'vue';
import type { ConstantDictionary } from '/@/lib/declarations';

import { useConstantsStore } from '/@/stores';
import { DATA_ITEM_STATUS } from '/@/settings';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
	name: 'HStatusColumn',

	components: {
		HDenseIconButton,
	},

	props: {
		type: { type: Number, required: true },
	},

	setup(props) {
		const state = reactive({
			items: [] as Array<ConstantDictionary>,
		});

		const constants = useConstantsStore();

		const initialize = () => {
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
