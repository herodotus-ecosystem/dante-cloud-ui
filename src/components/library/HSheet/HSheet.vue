<template>
	<div>
		<h-overlay></h-overlay>
		<v-toolbar flat color="white">
			<h-button color="teal" icon icon-name="mdi-arrow-left-box" tooltip="返回"></h-button>
		</v-toolbar>
		<v-divider class="mb-2"></v-divider>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HOverlay } from '../HOverlay';
import { HButton } from '../HButton';

export default defineComponent({
	name: 'HSheet',

	components: {
		HOverlay,
	},

	props: {
		size: { type: Number, default: 64 },
		color: { type: String, default: 'primary' },
		overlay: { type: Boolean, default: false },
	},
});
</script>
