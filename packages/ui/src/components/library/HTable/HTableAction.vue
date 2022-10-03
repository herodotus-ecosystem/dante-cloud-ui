<template>
	<q-toolbar>
		<h-icon-button
			:icon="settings.display.table.dense ? 'mdi-arrow-expand-vertical' : 'mdi-arrow-collapse-vertical'"
			:tooltip="settings.display.table.dense ? '宽松' : '紧凑'"
			@click="settings.display.table.dense = !settings.display.table.dense"
		></h-icon-button>
		<q-btn flat round icon="mdi-view-grid-outline">
			<q-tooltip>表格边框</q-tooltip>
			<h-table-separator-menu></h-table-separator-menu>
		</q-btn>
		<h-icon-button
			:icon="inFullscreen ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'"
			:tooltip="inFullscreen ? '退出全屏' : '全屏显示'"
			@click="toggleFullscreen()"
		>
		</h-icon-button>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '/@/stores';

import { HTableSeparatorMenu } from '../HMenu';
import { HIconButton } from '../HButton';

export default defineComponent({
	name: 'HTableAction',

	components: {
		HIconButton,
		HTableSeparatorMenu,
	},

	props: {
		inFullscreen: { type: Boolean, default: false },
	},

	emits: ['toggleFullscreen'],

	setup(props, { emit }) {
		const settings = useSettingsStore();

		const toggleFullscreen = () => {
			emit('toggleFullscreen');
		};

		return {
			settings,
			toggleFullscreen,
		};
	},
});
</script>
