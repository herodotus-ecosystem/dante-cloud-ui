<template>
	<q-page-container>
		<q-page class="q-pa-md">
			<router-view v-slot="{ Component, route }">
				<template v-if="Component">
					<transition
						appear
						mode="out-in"
						:duration="200"
						enter-active-class="animate__animated animate__fadeIn"
						leave-active-class="animate__animated animate__fadeOut"
					>
						<keep-alive :include="keepAlives">
							<suspense>
								<component :is="getComponent(Component, route)" />
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
import { defineComponent, defineAsyncComponent, watch, VNode, RendererNode, RendererElement } from 'vue';

import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useRouteStore } from '/@/stores';
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

		const keepAlives = cachedRoutes.value;

		const getComponent = (component: VNode<RendererNode, RendererElement, { [key: string]: any }>, route: RouteLocationNormalizedLoaded) => {
			// @ts-ignore
			if (component.type.name !== route.name && store.isValidDetailRoute(route)) {
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
			keepAlives,
			store,
			getComponent,
		};
	},
});
</script>
