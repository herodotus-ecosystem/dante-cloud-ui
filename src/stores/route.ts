import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { toRaw } from 'vue';

import { staticRoutes, getDynamicRoutes } from '/@/lib/logics/route';
import { lodash } from '/@/utils';

export const useRouteStore = defineStore('Route', {
	state: () => ({
		statics: staticRoutes,
		dynamics: [] as Array<RouteRecordRaw>,
		all: [] as Array<RouteRecordRaw>,
		keepAliveComponents: [],
		// Whether the route has been dynamically added
		dynamicallyAddRoute: false,
	}),

	getters: {
		menu: (state) => state.all,
		routes: (state) => state.all,
		isDynamicRouteAdded: (state) => {
			return !lodash.isEmpty(state.all);
		},
	},

	actions: {
		async createRoutes() {
			const routes = getDynamicRoutes();
			this.dynamics = routes as Array<RouteRecordRaw>;
			this.all = this.statics.concat(routes);
		},
	},
});
