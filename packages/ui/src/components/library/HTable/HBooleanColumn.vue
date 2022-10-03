<template>
	<h-dense-icon-button v-if="value" :color="trueColor" :icon="trueIcon" :tooltip="trueTooltip"></h-dense-icon-button>
	<h-dense-icon-button v-else :color="falseColor" :icon="falseIcon" :tooltip="falseTooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
	name: 'HBooleanColumn',

	components: {
		HDenseIconButton,
	},

	props: {
		value: { type: Boolean, required: true },
		trueColor: { type: String, default: 'green' },
		falseColor: { type: String, default: 'negative' },
		trueIcon: { type: String, default: 'mdi-check-circle' },
		falseIcon: { type: String, default: 'mdi-close-circle' },
		trueTooltip: { type: String, default: 'TRUE' },
		falseTooltip: { type: String, default: 'FALSE' },
	},
});
</script>
