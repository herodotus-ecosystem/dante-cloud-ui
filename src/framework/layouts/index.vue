<template>
	<v-app>
		<v-navigation-drawer v-model="showLeftSideDrawer" permanent priority="0">
			<template v-slot:prepend>
				<v-list-item two-line prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg" title="Jane Smith" subtitle="Logged in"></v-list-item>
				<v-divider class="mt-2"></v-divider>
			</template>
		</v-navigation-drawer>
		<v-navigation-drawer v-model="showRightSideDrawer" color="grey-darken-2" position="right" temporary priority="-2"></v-navigation-drawer>
		<v-app-bar color="blue-darken-3" priority="-1">
			<v-app-bar-nav-icon variant="text" @click.stop="showLeftSideDrawer = !showLeftSideDrawer"></v-app-bar-nav-icon>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon @click.stop="showRightSideDrawer = !showRightSideDrawer">
				<v-icon>mdi-cog-outline</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-card height="200px"></v-card>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from 'vue';
import { useDisplay } from 'vuetify';

export default defineComponent({
	name: 'Layout',
	setup() {
		const { mobile } = useDisplay();
		const showLeftSideDrawer = ref(true);
		const showRightSideDrawer = ref(false);

		watch(mobile, (newValue) => {
			showLeftSideDrawer.value = !newValue;
		});

		return {
			showLeftSideDrawer,
			showRightSideDrawer,
		};
	},
});
</script>
