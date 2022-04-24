<template>
	<v-app>
		<h-app-settings-drawer></h-app-settings-drawer>

		<h-app-toolbar></h-app-toolbar>

		<h-app-aside-drawer></h-app-aside-drawer>

		<v-main>
			<v-container class="pa-4 pa-sm-6 pa-md-8" fluid tag="section">
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppSettingsDrawer, HAppToolbar, HAppAsideDrawer } from '../components';

export default defineComponent({
	name: 'DefaultLayout',
	components: {
		HAppToolbar,
		HAppAsideDrawer,
		HAppSettingsDrawer,
	},
});
</script>
