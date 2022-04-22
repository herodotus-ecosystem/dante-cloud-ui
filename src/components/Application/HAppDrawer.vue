<template>
	<v-navigation-drawer v-model="drawer" width="300" color="grey lighten-2"> <h-app-menu :items="items" nav></h-app-menu> </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useRouteStore } from '/@/stores';

import HAppMenu from './HAppMenu.vue';

export default defineComponent({
	name: 'HAppDrawer',

	components: {
		HAppMenu,
	},

	setup() {
		const store = useRouteStore();

		const items = store.menu;

		const drawer = ref(true);

		return { drawer, items };
	},
});
</script>
