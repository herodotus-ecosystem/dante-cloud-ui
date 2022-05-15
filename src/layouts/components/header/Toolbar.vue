<template>
	<v-app-bar id="tool-bar" app class="border-b" flat :priority="priority">
		<v-app-bar-nav-icon @click="application.asideDrawer = !application.asideDrawer" />

		<h-app-breadcrumbs v-if="showBreadcrumbs"></h-app-breadcrumbs>

		<v-spacer></v-spacer>

		<template v-if="mdAndUp">
			<h-tooltip-button
				icon
				icon-name="mdi-cog-outline"
				tooltip="设置"
				@click.stop="application.settingsDrawer = !application.settingsDrawer"
			></h-tooltip-button>

			<h-app-bar-user-menu></h-app-bar-user-menu>
		</template>
	</v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useDisplay } from 'vuetify';
import { useApplicationStore, useSettingsStore } from '/@/stores';
import { HTooltipButton } from '/@/components';

import HAppBreadcrumbs from './Breadcrumbs.vue';
import HAppBarUserMenu from './UserMenu.vue';

export default defineComponent({
	name: 'HAppToolbar',
	components: {
		HTooltipButton,
		HAppBreadcrumbs,
		HAppBarUserMenu,
	},

	setup() {
		const { lgAndUp, smAndUp, mdAndUp } = useDisplay();
		const application = useApplicationStore();
		const settings = useSettingsStore();

		const priority = computed(() => {
			return settings.isClassicLayout ? -2 : 0;
		});

		const showBreadcrumbs = computed(() => {
			return settings.isClassicLayout ? false : true;
		});

		return {
			settings,
			lgAndUp,
			mdAndUp,
			application,
			priority,
			showBreadcrumbs,
		};
	},
});
</script>
