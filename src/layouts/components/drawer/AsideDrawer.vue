<template>
	<v-navigation-drawer v-model="application.asideDrawer" priority="-1" width="300" theme="dark">
		<h-app-aside-menu nav></h-app-aside-menu>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
