<template>
	<q-drawer v-model="application.rightDrawer" side="right" behavior="mobile" bordered :width="300">
		<q-toolbar>
			<q-toolbar-title>系统设置</q-toolbar-title>
			<q-btn flat @click="application.rightDrawer = !application.rightDrawer" round dense icon="mdi-close-box" />
		</q-toolbar>
		<q-separator></q-separator>
		<q-list dense>
			<h-divider label="全局主题" class="q-ma-md" wider="end" :offset="2"> </h-divider>
			<h-setting-switch
				v-model="settings.theme.mode"
				label="深色主题"
				:true-value="ThemeModeEnum.DARK"
				:false-value="ThemeModeEnum.LIGHT"
			></h-setting-switch>
		</q-list>
	</q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore, useSettingsStore } from '/@/stores';
import { ThemeModeEnum } from '/@/lib/enums';

import { HDivider, HSettingSwitch } from '/@/components';

export default defineComponent({
	name: 'HAppRightDrawer',

	components: {
		HDivider,
		HSettingSwitch,
	},

	setup() {
		const application = useApplicationStore();
		const settings = useSettingsStore();

		return {
			application,
			settings,
			ThemeModeEnum,
		};
	},
});
</script>
