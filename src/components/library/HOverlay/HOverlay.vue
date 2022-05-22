<template>
	<v-overlay :value="overlay">
		<v-progress-circular indeterminate :color="color" :size="size"></v-progress-circular>
	</v-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HOverlay',

	props: {
		size: { type: Number, default: 64 },
		color: { type: String, default: 'primary' },
		overlay: { type: Boolean, default: false },
	},
});
</script>
