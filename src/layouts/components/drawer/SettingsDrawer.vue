<template>
	<v-navigation-drawer
		id="settings-drawer"
		v-model="application.settingsDrawer"
		disable-route-watcher
		position="right"
		fixed
		temporary
		priority="-2"
		width="300"
	>
		<v-toolbar color="white">
			<v-toolbar-title text="设置" class="pl-0"></v-toolbar-title>

			<template #append>
				<v-btn icon="mdi-close" @click="application.settingsDrawer = false"></v-btn>
			</template>
		</v-toolbar>

		<v-divider></v-divider>

		<v-container>
			<h-text-divider justify="start" label="全局主题"></h-text-divider>
			<h-setting-switch v-model="settings.theme.mode" :true-value="ThemeMode.DARK" :false-value="ThemeMode.LIGHT" label="主题"></h-setting-switch>
			<h-text-divider justify="start" label="界面效果"></h-text-divider>
			<h-setting-switch v-model="settings.effect.isUniqueOpened" label="菜单手风琴"></h-setting-switch>
			<h-text-divider justify="start" label="界面展示"></h-text-divider>
			<h-setting-switch v-model="settings.display.isTabsView" label="开启 TabsView"></h-setting-switch>
		</v-container>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore, useSettingsStore } from '/@/stores';
import { ThemeMode } from '/@/lib/enums';
import { HTextDivider, HSettingSwitch } from '/@/components';
export default defineComponent({
	name: 'HAppSettingsDrawer',

	components: {
		HTextDivider,
		HSettingSwitch,
	},

	setup() {
		const application = useApplicationStore();
		const settings = useSettingsStore();

		return { application, settings, ThemeMode };
	},
});
</script>
