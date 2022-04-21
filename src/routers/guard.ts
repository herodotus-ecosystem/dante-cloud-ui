import type { RouteRecordRaw, Router } from 'vue-router';
import { useAuthenticationStore, useRouteStore } from '/@/stores';
import { Path } from '/@/lib/declarations';

export const createRouteGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = authStore.accessToken;

		console.log('token---', token);

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

					const path = (from.query.redirect || to.path) as string;
					console.log(' to -- ', to);
					console.log(' from -- ', from);
					console.log(' path -- ', path);
					const redirect = decodeURIComponent(path);
					const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
					console.log(nextData);
					next(Path.HOME);
					return;
				}
			}
		}
	});
};
