<template>
	<q-toolbar>
		<q-btn
			flat
			dense
			round
			@click="settings.display.table.dense = !settings.display.table.dense"
			:icon="settings.display.table.dense ? 'mdi-arrow-expand-vertical' : 'mdi-arrow-collapse-vertical'"
			><q-tooltip>{{ settings.display.table.dense ? '宽松' : '紧凑' }}</q-tooltip>
		</q-btn>
		<q-btn flat round dense icon="mdi-view-grid-outline">
			<q-tooltip>表格边框</q-tooltip>
			<h-table-separator-menu></h-table-separator-menu>
		</q-btn>
		<q-btn flat round dense :icon="inFullscreen ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'" @click="toggleFullscreen()">
			<q-tooltip>{{ inFullscreen ? '退出全屏' : '全屏显示' }}</q-tooltip>
		</q-btn>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '/@/stores';

import { HTableSeparatorMenu } from '../HMenu';

export default defineComponent({
	name: 'HTableAction',

	components: {
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
