import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import type { RouteRecordRaw, Router } from 'vue-router';
import { useRouteStore } from '/@/stores';
import { PathEnum } from '/@/lib/enums';

export const createRouterGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		NProgress.start();

		// const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = 'dddd';

		// 有 Token
		if (token) {
			if (to.path === PathEnum.SIGN_IN) {
				// 目的地址还是登录页面，直接跳转到首页。
				next(PathEnum.HOME);
				return;
			} else {
				// 判断动态路由是否已经添加，没有添加则进行添加
				if (!routeStore.isDynamicRouteAdded) {
					await routeStore.createRoutes();
					const routes = routeStore.routes;
					// 动态添加可访问路由表
					routes.forEach((item) => {
						router.addRoute(item as RouteRecordRaw);
					});

					const redirectPath = (from.query.redirect || to.path) as string;
					const redirectURI = decodeURIComponent(redirectPath);
					const nextPath = to.path === redirectURI ? { ...to, replace: true } : { path: redirectURI };
					next(nextPath);
					return;
				} else {
					next();
					return;
				}
			}
		} else {
			// 没有Token，同时是忽略权限验证的页面
			if (to.meta.ignoreAuth) {
				next();
				return;
			} else {
				next(PathEnum.SIGN_IN);
				return;
			}
		}
	});

	// 路由加载后
	router.afterEach(() => {
		NProgress.done();
	});
};
