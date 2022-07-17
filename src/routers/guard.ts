import type { RouteRecordRaw, Router } from 'vue-router';
import { useRouteStore, useAuthenticationStore } from '/@/stores';
import { PathEnum } from '/@/lib/enums';

import { Loading, QSpinnerDots } from 'quasar';

export const createRouterGuard = (router: Router) => {
	router.beforeEach(async (to, from, next) => {
		Loading.show({
			spinner: QSpinnerDots,
			spinnerSize: 100,
			spinnerColor: 'blue-10',
			delay: 200,
		});

		const authStore = useAuthenticationStore();
		const routeStore = useRouteStore();

		const token = authStore.access_token;

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
					next({ ...to, replace: true });
					return;
				} else {
					next();
					return;
				}
			}
		} else {
			// 没有Token，同时是忽略权限验证的页面
			if (to.meta.isIgnoreAuth) {
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
		Loading.hide();
	});
};
