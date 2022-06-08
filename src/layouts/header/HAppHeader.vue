<template>
	<q-header elevated :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']" height-hint="58" style="z-index: 0">
		<q-toolbar>
			<h-app-left-drawer-control></h-app-left-drawer-control>

			<h-app-breadcrumbs></h-app-breadcrumbs>

			<q-space />

			<h-app-toolbar-actions></h-app-toolbar-actions>
		</q-toolbar>
		<q-separator />

		<h-app-tabs-view></h-app-tabs-view>
	</q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppLeftDrawerControl } from '../drawer';
import HAppBreadcrumbs from './HAppBreadcrumbs.vue';
import HAppTabsView from './HAppTabsView.vue';
import HAppToolbarActions from './HAppToolbarActions.vue';

export default defineComponent({
	name: 'HAppHeader',

	components: {
		HAppBreadcrumbs,
		HAppLeftDrawerControl,
		HAppTabsView,
		HAppToolbarActions,
	},
});
</script>
