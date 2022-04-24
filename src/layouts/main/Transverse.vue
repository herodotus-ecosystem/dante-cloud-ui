<template>
	<v-app>
		<h-app-settings-drawer></h-app-settings-drawer>
		<v-main>
			<v-container>
				<div></div>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppSettingsDrawer } from '../components';

export default defineComponent({
	name: 'TransverseLayout',
	components: {
		HAppSettingsDrawer,
	},
});
</script>
