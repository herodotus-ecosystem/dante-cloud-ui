<template>
	<q-header :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']" height-hint="58" style="z-index: 10">
		<q-toolbar>
			<h-app-left-drawer-control></h-app-left-drawer-control>

			<h-app-breadcrumbs v-if="settings.display.showBreadcrumbs"></h-app-breadcrumbs>

			<q-space />

			<h-app-toolbar-actions></h-app-toolbar-actions>
		</q-toolbar>
		<q-separator />

		<h-app-tabs-view v-if="settings.display.isTabsView"></h-app-tabs-view>
	</q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppLeftDrawerControl } from '../drawer';
import HAppBreadcrumbs from './HAppBreadcrumbs.vue';
import HAppTabsView from './HAppTabsView.vue';
import HAppToolbarActions from './HAppToolbarActions.vue';

import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'HAppHeader',

	components: {
		HAppBreadcrumbs,
		HAppLeftDrawerControl,
		HAppTabsView,
		HAppToolbarActions,
	},

	setup(props) {
		const settings = useSettingsStore();
		return {
			settings,
		};
	},
});
</script>
