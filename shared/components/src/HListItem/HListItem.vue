<template>
	<q-item clickable v-close-popup v-ripple>
		<q-item-section avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>{{ label }}</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HListItem',

	props: {
		label: { type: String },
		icon: { type: String },
	},
});
</script>
