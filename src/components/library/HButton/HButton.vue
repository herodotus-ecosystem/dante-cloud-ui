<template>
	<q-btn :icon="icon" v-bind="$attrs">
		<q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
	</q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HButton',

	props: {
		tooltip: { type: String, default: '' },
		icon: { type: String },
	},
});
</script>
