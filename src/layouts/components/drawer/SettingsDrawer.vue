<template>
	<v-navigation-drawer
		id="settings-drawer"
		v-model="application.settingsDrawer"
		disable-route-watcher
		position="right"
		fixed
		hide-overlay
		temporary
		width="300"
	>
		<v-toolbar flat>
			<v-toolbar-title text="设置" class="pl-0"></v-toolbar-title>

			<template #append>
				<v-btn icon="mdi-close" @click="application.settingsDrawer = false"></v-btn>
			</template>
		</v-toolbar>

		<v-divider></v-divider>

		<v-container>
			<v-row>
				<v-col>
					<p class="font-weight-black">全局主题</p>
					<v-switch v-model="settings.theme.mode" :true-value="ThemeMode.DARK" :false-value="ThemeMode.LIGHT" label="主题" hide-details></v-switch>
					<p class="font-weight-black">界面效果</p>
					<v-switch v-model="settings.effect.isUniqueOpened" label="菜单手风琴" hide-details></v-switch>
				</v-col>
			</v-row>
		</v-container>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore, useSettingsStore } from '/@/stores';
import { ThemeMode } from '/@/lib/declarations';

export default defineComponent({
	name: 'HAppSettingsDrawer',

	setup() {
		const application = useApplicationStore();
		const settings = useSettingsStore();

		return { application, settings, ThemeMode };
	},
});
</script>
