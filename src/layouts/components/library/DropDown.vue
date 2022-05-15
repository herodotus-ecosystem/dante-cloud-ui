<template>
	<h-app-button variant="text">
		{{ title }}
		<v-icon class="hidden-sm-and-down" size="14" icon="mdi-chevron-down"></v-icon>
		<h-app-menu activator="parent">
			<slot></slot>
		</h-app-menu>
	</h-app-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HAppButton from './Button.vue';
import HAppMenu from './Menu.vue';

export default defineComponent({
	name: 'HAppDropDown',

	components: {
		HAppButton,
		HAppMenu,
	},

	props: {
		title: String,
	},
});
</script>
