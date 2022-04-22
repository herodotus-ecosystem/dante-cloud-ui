<template>
	<v-app>
		<h-app-bar></h-app-bar>

		<h-app-drawer></h-app-drawer>

		<v-main>
			<v-container class="pa-4 pa-sm-6 pa-md-8" fluid tag="section">
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppBar, HAppDrawer } from '/@/components';

export default defineComponent({
	name: 'DefaultLayout',

	components: {
		HAppBar,
		HAppDrawer,
	},
});
</script>
