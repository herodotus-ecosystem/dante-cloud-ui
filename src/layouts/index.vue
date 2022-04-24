<template>
	<component :is="layout" />
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'ApplicationLayout',

	components: {
		defaults: defineAsyncComponent(() => import('/@/layouts/main/Default.vue')),
		classic: defineAsyncComponent(() => import('/@/layouts/main/Classic.vue')),
		transverse: defineAsyncComponent(() => import('/@/layouts/main/Transverse.vue')),
		columns: defineAsyncComponent(() => import('/@/layouts/main/Columns.vue')),
	},

	setup() {
		const settings = useSettingsStore();
		const { layout } = settings;

		return {
			layout,
		};
	},
});
</script>
