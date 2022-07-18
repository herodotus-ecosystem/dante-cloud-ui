<template>
	<q-page-container>
		<q-page class="q-pa-md">
			<router-view v-slot="{ Component, route }" :key="$route.fullPath">
				<template v-if="Component">
					<transition
						appear
						mode="out-in"
						:duration="200"
						enter-active-class="animate__animated animate__fadeIn"
						leave-active-class="animate__animated animate__fadeOut"
					>
						<keep-alive :include="cachedRoutes">
							<suspense>
								<component :is="getComponent(Component, route)" :key="route.path" />
								<template #fallback>
									<h-loading type="DOTS" size="100px"></h-loading>
								</template>
							</suspense>
						</keep-alive>
					</transition>
				</template>
			</router-view>
		</q-page>
	</q-page-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, watch } from 'vue';

import type { RouteLocationNormalizedLoaded, RouteComponent } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useRouteStore } from '/@/stores';
import { RouteUtils } from '/@/lib/utils';
import { HLoading } from '/@/components';

export default defineComponent({
	name: 'HAppContainer',

	components: {
		HLoading,
	},

	setup() {
		const route = useRoute();
		const store = useRouteStore();
		const { cachedRoutes } = storeToRefs(store);

		const getComponent = (component: Record<string, RouteComponent>, route: RouteLocationNormalizedLoaded) => {
			if (component.type.name !== route.name && RouteUtils.isValidDetailRoute(route)) {
				return defineAsyncComponent(store.getDetailComponent(route.name as string));
			}
			return component;
		};

		watch(
			() => route.path,
			() => {
				store.addCachedRoute(route);
			},
			{
				immediate: true,
			}
		);

		return {
			cachedRoutes,
			getComponent,
		};
	},
});
</script>
