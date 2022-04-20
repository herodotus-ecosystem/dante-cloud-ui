import { RouteRecordRaw, Router } from 'vue-router';

import { transformedDynamicRoutes } from './Base';
import { lodash } from '/@/utils';

/**
 * 定义404界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404',
};

/**
 * 前端控制路由：初始化方法，防止刷新时路由丢失
 */
export const initFrontEndRoutes = async (router: Router) => {
	// 界面 loading 动画开始执行
	// if (window.nextLoading === undefined) {
	// 	NextLoading.start();
	// }
	// 添加动态路由
	const routes = transformedDynamicRoutes();
	if (!lodash.isEmpty(routes)) {
		await routes.forEach((route: RouteRecordRaw) => {
			const routeName: any = route.name;
			if (!router.hasRoute(routeName)) {
				router.addRoute(route);
			}
		});
	}

	router.addRoute(pathMatch);
};
