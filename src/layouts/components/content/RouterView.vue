<template>
	<v-container fluid tag="section">
		<router-view v-slot="{ Component, route }">
			<transition
				mode="out-in"
				appear
				:duration="300"
				enter-active-class="animate__animated animate__lightSpeedInLeft"
				leave-active-class="animate__animated animate__lightSpeedOutRight"
			>
				<keep-alive :include="routes.cachedRoutes">
					<component :is="Component" :key="route.path" />
				</keep-alive>
			</transition>
		</router-view>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useRouteStore } from '/@/stores';

export default defineComponent({
	name: 'HAppRouterView',

	setup() {
		const routes = useRouteStore();

		return {
			routes,
		};
	},
});
</script>
