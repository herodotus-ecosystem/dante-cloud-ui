import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { Path } from '/@/lib/declarations';
import { createRouteGuard } from './guard';

// 404 on a page
const ErrorRoute: RouteRecordRaw = {
	path: Path.ERROR,
	redirect: '/404',
};

export const RootRoute: RouteRecordRaw = {
	path: '/',
	name: 'Root',
	redirect: Path.HOME,
	meta: {
		title: 'Root',
	},
};

const SignInRoute: RouteRecordRaw = {
	path: Path.SIGN_IN,
	name: 'SignIn',
	component: () => import('/@/views/sign-in/index.vue'),
	meta: {
		title: '登录',
	},
};

const NotFoundRoute: RouteRecordRaw = {
	path: '/404',
	name: 'NotFound',
	component: () => import('/@/views/error/404.vue'),
	meta: {
		title: '页面未找到',
	},
};

const UnauthorizedRoute: RouteRecordRaw = {
	path: '/401',
	name: 'Unauthorized',
	component: () => import('/@/views/error/401.vue'),
	meta: {
		title: '页面无权限',
	},
};

//普通路由 无需验证权限
const STATIC_ROUTERS: Array<RouteRecordRaw> = [SignInRoute, RootRoute, NotFoundRoute, UnauthorizedRoute];

const router = createRouter({
	history: createWebHashHistory(''),
	routes: STATIC_ROUTERS,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
	app.use(router);
	createRouteGuard(router);
};

export default router;
