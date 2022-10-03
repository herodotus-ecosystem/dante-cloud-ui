<template>
	<q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
		<h-app-header></h-app-header>

		<h-app-left-drawer></h-app-left-drawer>

		<h-app-right-drawer></h-app-right-drawer>

		<h-app-container></h-app-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppHeader, HAppLeftDrawer, HAppRightDrawer, HAppContainer } from '/@/components';

export default defineComponent({
	name: 'HDefaultLayout',

	components: {
		HAppContainer,
		HAppHeader,
		HAppLeftDrawer,
		HAppRightDrawer,
	},
});
</script>
