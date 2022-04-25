import type { RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';

import { staticRoutes, getDynamicRoutes, getKeepAliveRoutes } from '/@/lib/logics/route';
import { lodash } from '/@/utils';

export const useRouteStore = defineStore('Route', {
	state: () => ({
		dynamics: [] as Array<RouteRecordRaw>,
		routes: [] as Array<RouteRecordRaw>,
		keepAliveComponents: [] as string[],
		// Whether the route has been dynamically added
		dynamicallyAddRoute: false,
	}),

	getters: {
		menu(): Array<RouteRecordRaw> {
			return this.dynamics;
		},
		isDynamicRouteAdded(): boolean {
			return !lodash.isEmpty(this.routes);
		},
	},

	actions: {
		createRoutes() {
			const dynamicRoutes = getDynamicRoutes();
			this.dynamics = dynamicRoutes as Array<RouteRecordRaw>;
			this.keepAliveComponents = getKeepAliveRoutes(dynamicRoutes);
			this.routes = staticRoutes.concat(dynamicRoutes);
		},
	},
});
