import type { RouteRecordRaw } from 'vue-router';

import { defineStore } from 'pinia';

import { staticRoutes, getDynamicRoutes, getKeepAliveRoutes } from '/@/routers/logic';
import { lodash } from '/@/lib/utils';

export const useRouteStore = defineStore('Route', {
	state: () => ({
		dynamics: [] as Array<RouteRecordRaw>,
		routes: [] as Array<RouteRecordRaw>,
		cachedRoutes: [] as string[],
		// Whether the route has been dynamically added
		dynamicallyAddRoute: false,
		opend: [] as Array<string>,
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
			this.cachedRoutes = getKeepAliveRoutes(dynamicRoutes);
			this.routes = staticRoutes.concat(dynamicRoutes);
		},
	},
});
