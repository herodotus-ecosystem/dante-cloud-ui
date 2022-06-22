<template>
	<q-table :loading="loading" :separator="settings.display.table.separator" :dense="settings.display.table.dense" v-bind="$attrs">
		<template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
			<slot :name="slotName" v-bind="props" />
		</template>

		<template v-if="!$slots['top-right']" #top-right="props">
			<h-table-action :inFullscreen="props.inFullscreen" @toggle-fullscreen="props.toggleFullscreen"></h-table-action>
		</template>

		<template v-if="loading && !$slots.loading" #loading>
			<h-loading type="DOTS" size="100px"></h-loading>
		</template>
	</q-table>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import { useSettingsStore } from '/@/stores';

import { HLoading } from '../HLoading';
import HTableAction from './HTableAction.vue';

export default defineComponent({
	name: 'HTable',

	components: {
		HLoading,
		HTableAction,
	},

	props: {
		loading: { type: Boolean, default: false },
	},

	setup(props) {
		const settings = useSettingsStore();

		return {
			settings,
		};
	},
});
</script>
