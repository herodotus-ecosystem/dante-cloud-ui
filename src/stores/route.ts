import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '/@/lib/declarations';

import { defineStore } from 'pinia';

import { staticRoutes, getDynamicRoutes, RouteParser } from '/@/routers/logic';
import { lodash } from '/@/lib/utils';

export const useRouteStore = defineStore('Route', {
	state: () => ({
		dynamics: [] as Array<RouteRecordRaw>,
		routes: [] as Array<RouteRecordRaw>,
		cachedRoutes: [] as string[],
		// Whether the route has been dynamically added
		dynamicallyAddRoute: false,
		menuItems: [] as Array<MenuItem>,
		details: new Map(),
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
		createRoutes() {
			const dynamicRoutes = getDynamicRoutes();
			const routeParser: RouteParser = new RouteParser(dynamicRoutes);

			this.dynamics = dynamicRoutes;
			this.cachedRoutes = routeParser.getKeepAliveComponents();
			this.menuItems = routeParser.getMenuItems();
			this.details = routeParser.getDetailComponents();
			this.routes = staticRoutes.concat(dynamicRoutes);
		},
	},
});
