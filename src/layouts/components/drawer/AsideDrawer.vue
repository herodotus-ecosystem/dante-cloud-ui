<template>
	<v-navigation-drawer v-model="application.asideDrawer" priority="-1" width="300" color="grey lighten-2">
		<h-app-aside-menu :items="route.menu" nav></h-app-aside-menu>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useRouteStore, useApplicationStore } from '/@/stores';

import { HAppAsideMenu } from '../menu';

export default defineComponent({
	name: 'HAppAsideDrawer',

	components: {
		HAppAsideMenu,
	},

	setup() {
		const route = useRouteStore();
		const application = useApplicationStore();

		return { application, route };
	},
});
</script>
