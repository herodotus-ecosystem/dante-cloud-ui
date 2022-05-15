import type { RouteRecordRaw } from 'vue-router';

import { Path } from '/@/lib/enums';

export const Layout = () => import('../../layouts/Index.vue');

const RootRoute: RouteRecordRaw = {
	path: Path.ROOT,
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
		ignoreAuth: true,
	},
};

const UnauthorizedRoute: RouteRecordRaw = {
	path: '/401',
	name: '401',
	component: () => import('/@/views/error/401.vue'),
	meta: { title: 'Unauthorized' },
};

const NotFoundRoute: RouteRecordRaw = {
	path: '/404',
	name: '404',
	component: () => import('/@/views/error/404.vue'),
	meta: { title: 'Not Found' },
};

const ServiceErrorRoute: RouteRecordRaw = {
	path: '/500',
	name: '500',
	component: () => import('/@/views/error/500.vue'),
	meta: { title: 'Service Error' },
};

const PageNotFoundRoute: RouteRecordRaw = {
	path: Path.NOT_FOUND,
	name: Path.NOT_FOUND_NAME,
	component: () => import('/@/views/error/404.vue'),
	meta: {
		title: 'ErrorPage',
	},
};

//普通路由 无需验证权限
export const staticRoutes: Array<RouteRecordRaw> = [RootRoute, SignInRoute, UnauthorizedRoute, NotFoundRoute, ServiceErrorRoute];
