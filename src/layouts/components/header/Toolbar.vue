<template>
	<v-app-bar id="tool-bar" app class="border-b" flat>
		<v-app-bar-nav-icon @click="application.asideDrawer = !application.asideDrawer" />

		<v-spacer></v-spacer>

		<template v-if="mdAndUp">
			<h-tooltip-button
				icon
				icon-name="mdi-cog-outline"
				tooltip="设置"
				@click.stop="application.settingsDrawer = !application.settingsDrawer"
			></h-tooltip-button>
		</template>
	</v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useDisplay } from 'vuetify';
import { useApplicationStore } from '/@/stores';
import { HTooltipButton } from '/@/components';

export default defineComponent({
	name: 'HAppToolbar',
	components: {
		HTooltipButton,
	},

	setup() {
		const { lgAndUp, smAndUp, mdAndUp } = useDisplay();
		const application = useApplicationStore();

		return {
			lgAndUp,
			mdAndUp,
			application,
		};
	},
});
</script>
