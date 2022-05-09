import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { Path } from '/@/lib/enums';
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
	component: () => import('../views/signin/Index.vue'),
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
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const setupRouter = (app: App<Element>) => {
	createRouteGuard(router);
	app.use(router);
};

export default router;
