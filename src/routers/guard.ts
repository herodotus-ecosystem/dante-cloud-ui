import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import type { RouteRecordRaw, Router } from 'vue-router';
import { useAuthenticationStore, useRouteStore } from '/@/stores';
import { Path } from '/@/lib/enums';

export const createRouteGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();

		const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = authStore.access_token;

		// 访问首页地址情况
		if (from.path === Path.ROOT && to.path === Path.SIGN_IN) {
			if (!token) {
				next();
			} else {
				next(Path.HOME);
			}
		}

		// 已经登录或者输入的是不验证权限地址的情况
		if (token || to.meta.ignoreAuth) {
			if (!routeStore.isDynamicRouteAdded) {
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
			} else {
				next();
			}
		} else {
			if (to.path !== Path.SIGN_IN) {
				next(Path.SIGN_IN);
			}
		}
	});

	// 路由加载后
	router.afterEach(() => {
		NProgress.done();
	});
};
