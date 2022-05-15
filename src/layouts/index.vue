<template>
	<v-app>
		<h-app-settings-drawer></h-app-settings-drawer>

		<h-app-toolbar></h-app-toolbar>

		<h-app-aside-drawer></h-app-aside-drawer>

		<v-main :class="backgroundColor">
			<h-app-tabs-view v-if="settings.display.isTabsView"></h-app-tabs-view>
			<h-app-router-view></h-app-router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { HAppSettingsDrawer, HAppToolbar, HAppAsideDrawer, HAppRouterView, HAppTabsView } from './components';

import { useRouteStore, useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'DefaultLayout',
	components: {
		HAppToolbar,
		HAppTabsView,
		HAppRouterView,
		HAppAsideDrawer,
		HAppSettingsDrawer,
	},

	setup() {
		const routes = useRouteStore();
		const settings = useSettingsStore();

		const backgroundColor = computed(() => {
			return settings.isLight ? 'bg-grey-lighten-3' : '';
		});

		return {
			routes,
			settings,
			backgroundColor,
		};
	},
});
</script>
