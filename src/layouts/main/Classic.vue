<template>
	<v-app>
		<h-app-settings-drawer></h-app-settings-drawer>

		<h-app-toolbar></h-app-toolbar>

		<v-main>
			<v-container>
				<div></div>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppSettingsDrawer, HAppToolbar } from '../components';

export default defineComponent({
	name: 'ClassicLayout',
	components: {
		HAppToolbar,
		HAppSettingsDrawer,
	},
});
</script>
