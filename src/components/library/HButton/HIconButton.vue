<template>
	<h-button flat round :color="color" v-bind="$attrs"> </h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HButton from './HButton.vue';

export default defineComponent({
	name: 'HIconButton',

	components: {
		HButton,
	},

	props: {
		color: { type: String, default: 'grey-8' },
	},
});
</script>
