<template>
	<span class="v-app-tooltip-btn d-inline-block">
		<v-btn :aria-label="label" :icon="icon" variant="text" v-bind="$attrs">
			<slot v-if="$slots.icon" name="icon" />

			<v-icon v-else-if="iconName" :icon="iconName" />

			<v-tooltip :anchor="tooltipAnchor" class="v-app-tooltip-btn__content" :open-delay="tooltipOpenDelay" activator="parent">
				{{ tooltip }}
			</v-tooltip>
		</v-btn>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

import type { Anchor } from 'vuetify/dist';

export default defineComponent({
	name: 'HTooltipButton',

	props: {
		icon: { type: Boolean, default: false },
		iconName: { type: String, default: '' },
		label: String,
		tooltip: String,
		tooltipAnchor: {
			type: String as PropType<typeof Anchor>,
			default: 'bottom',
		},
		tooltipOpenDelay: {
			type: Number,
			default: 200,
		},
	},

	setup() {
		const anchor = computed(() => {});
	},
});
</script>

<style lang="sass">
.v-app-tooltip-btn__content p
  margin: 0
</style>
