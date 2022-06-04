<template>
	<q-page-container>
		<q-card class="q-ma-md">
			<router-view v-slot="{ Component, route }" :key="$route.fullPath">
				<transition
					mode="out-in"
					appear
					:duration="200"
					enter-active-class="animate__animated animate__fadeIn"
					leave-active-class="animate__animated animate__fadeOut"
				>
					<keep-alive :include="cachedRoutes">
						<component :is="Component" :key="route.path" />
					</keep-alive>
				</transition>
			</router-view>
		</q-card>
	</q-page-container>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { RouteRecordRaw } from 'vue-router';

import { useRouteStore } from '/@/stores';

export default defineComponent({
	name: 'HAppContainer',

	setup() {
		const route = useRoute();

		const store = useRouteStore();
		const { cachedRoutes } = storeToRefs(store);

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
		};
	},
});
</script>
