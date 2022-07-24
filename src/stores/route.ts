import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';

import { lodash } from '/@/lib/utils';

export const useRouteStore = defineStore('Route', {
	state: () => ({
		routes: [] as Array<RouteRecordRaw>,
		cachedRoutes: [] as string[],
		details: new Map(),
		isRemote: true,
	}),

	getters: {
		isDynamicRouteAdded(): boolean {
			return !lodash.isEmpty(this.routes);
		},

		getDetailComponent(state) {
			return (key: string) => state.details.get(key);
		},
	},

	actions: {
		addDynamicRoutes(routes: Array<RouteRecordRaw>) {
			this.routes = routes;
		},

		addCachedRoute(route: RouteLocationNormalizedLoaded) {
			if (!route.meta?.isNotKeetAlive) {
				const name = route.name as string;
				if (!this.cachedRoutes.includes(name)) {
					this.cachedRoutes.push(name);
				}
			}
		},

		addDetailRoutes(item: RouteRecordRaw) {
			const children: Array<RouteRecordRaw> = item.children || [];
			if (!lodash.isEmpty(children)) {
				children.forEach((child) => {
					const componentName = child.name as string;
					if (componentName) {
						this.details.set(componentName, child.component);
					}
				});
			}
		},
	},
});
