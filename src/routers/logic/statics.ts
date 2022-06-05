import type { RouteRecordRaw } from 'vue-router';

import { PathEnum } from '/@/lib/enums';

export const Layout = () => import('../../layouts/Index.vue');

const RootRoute: RouteRecordRaw = {
	path: PathEnum.ROOT,
	name: 'Root',
	redirect: PathEnum.HOME,
	meta: {
		title: 'Root',
	},
};

const SignInRoute: RouteRecordRaw = {
	path: PathEnum.SIGN_IN,
	name: 'SignIn',
	component: () => import('../../views/sign-in/SignIn.vue'),
	meta: {
		title: '登录',
		ignoreAuth: true,
	},
};

//普通路由 无需验证权限
export const staticRoutes: Array<RouteRecordRaw> = [RootRoute, SignInRoute];
