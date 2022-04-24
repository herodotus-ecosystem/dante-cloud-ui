<template>
	<v-app>
		<h-app-settings-drawer></h-app-settings-drawer>

		<h-app-toolbar></h-app-toolbar>

		<h-app-aside-drawer></h-app-aside-drawer>

		<v-main>
			<v-container>
				<div></div>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppSettingsDrawer, HAppToolbar, HAppAsideDrawer } from '../components';

export default defineComponent({
	name: 'ColumnsLayout',
	components: {
		HAppToolbar,
		HAppAsideDrawer,
		HAppSettingsDrawer,
	},
});
</script>
