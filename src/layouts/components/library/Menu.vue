<template>
	<v-menu close-delay="100" max-height="500" open-delay="60" :open-on-hover="false" transition="slide-x-transition" anchor="bottom">
		<template #activator="{ props }">
			<slot name="activator" v-bind="{ props }" />
		</template>
		<h-app-sheet>
			<slot></slot>
		</h-app-sheet>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HAppSheet from './Sheet.vue';

export default defineComponent({
	name: 'HAppMenu',

	components: {
		HAppSheet,
	},
});
</script>
