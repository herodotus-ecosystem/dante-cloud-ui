import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import type { RouteRecordRaw, Router } from 'vue-router';
import { useAuthenticationStore, useRouteStore } from '/@/stores';
import { Path } from '/@/lib/declarations';

export const createRouteGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();

		const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = authStore.accessToken;

		console.log('from - ', from.path);
		console.log('to - ', to.path);

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
				if (to.meta.ignoreAuth) {
					next();
				} else {
					next(Path.SIGN_IN);
				}
			} else {
				if (routeStore.isDynamicRouteAdded) {
					next();
				} else {
					await routeStore.createRoutes();
					const routes = routeStore.routes;
					// 动态添加可访问路由表
					routes.forEach((item) => {
						router.addRoute(item as RouteRecordRaw);
					});

					const redirectPath = (from.query.redirect || to.path) as string;
					const redirect = decodeURIComponent(redirectPath);
					const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
					next(nextData);
				}
			}
		}
	});

	// 路由加载后
	router.afterEach(() => {
		NProgress.done();
	});
};
