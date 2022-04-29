<template>
	<v-container fluid>
		<v-card class="mr-0">
			<router-view v-slot="{ Component, route }">
				<transition
					mode="out-in"
					appear
					:duration="300"
					enter-active-class="animate__animated animate__lightSpeedInLeft"
					leave-active-class="animate__animated animate__lightSpeedOutRight"
				>
					<keep-alive :include="routes.cachedRoutes">
						<component :is="getComponent(Component, route)" :key="route.path" />
					</keep-alive>
				</transition>
			</router-view>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { defineComponent, defineAsyncComponent, ref } from 'vue';

import { useRouteStore } from '/@/stores';
import { RouteUtils } from '/@/routers/logic';

export default defineComponent({
	name: 'HAppRouterView',

	setup() {
		const routes = useRouteStore();

		const getComponent = (component: any, route: RouteLocationNormalizedLoaded) => {
			if (component.type.name !== route.name && RouteUtils.isValidDetailRoute(route)) {
				return defineAsyncComponent(routes.getDetailComponent(route.name as string));
			}
			return component;
		};

		return {
			routes,
			getComponent,
		};
	},
});
</script>
