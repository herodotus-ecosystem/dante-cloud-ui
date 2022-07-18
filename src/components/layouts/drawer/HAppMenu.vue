<template>
	<q-list padding>
		<h-app-menu-items :items="items" :level="0"></h-app-menu-items>
	</q-list>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { useRouteStore } from '/@/stores';

import HAppMenuItems from './HAppMenuItems.vue';

export default defineComponent({
	name: 'HAppMenu',

	components: {
		HAppMenuItems,
	},

	setup() {
		const state = reactive({
			items: [] as Array<RouteRecordRaw>,
		});

		onMounted(() => {
			const store = useRouteStore();
			state.items = store.routes;
		});

		return {
			...toRefs(state),
		};
	},
});
</script>
