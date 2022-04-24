import type { RouteRecordRaw, Router } from 'vue-router';
import { useAuthenticationStore, useRouteStore } from '/@/stores';
import { Path } from '/@/lib/declarations';

export const createRouteGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = authStore.accessToken;

		if (to.path === Path.SIGN_IN) {
			if (!token) {
				next();
				return;
			} else {
				next(Path.HOME);
				return;
			}
		} else {
			if (!token) {
				next(Path.SIGN_IN);
				return;
			} else {
				if (routeStore.isDynamicRouteAdded) {
					next();
					return;
				} else {
					await routeStore.createRoutes();

					const routes = routeStore.routes;

					// 动态添加可访问路由表
					routes.forEach((item) => {
						router.addRoute(item as RouteRecordRaw);
					});

					console.log(to.path);

					if (to.path) {
						next(to.path);
						return;
					} else {
						next(Path.HOME);
						return;
					}
				}
			}
		}
	});
};
