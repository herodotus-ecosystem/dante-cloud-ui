import { RouteRecordRaw } from 'vue-router';

import { Path } from '/@/lib/declarations';

export const Layout = () => import('/@/layouts/index.vue');

// 404 on a page
const ErrorRoute: RouteRecordRaw = {
	path: Path.ERROR,
	redirect: '/404',
};

const RootRoute: RouteRecordRaw = {
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
	component: () => import('/@/views/signin/Index.vue'),
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
export const staticRoutes: Array<RouteRecordRaw> = [SignInRoute, RootRoute, NotFoundRoute, UnauthorizedRoute, ErrorRoute];
