import { RouteRecordRaw } from 'vue-router';

export const SIGN_IN_PATH = '/sign-in';

export const DYNAMIC_ROUTES: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Root',
		component: () => import('/@/framework/layouts/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true,
		},
		children: [
			{
				path: '/home',
				name: 'Home',
				component: () => import('/@/views/home/index.vue'),
				meta: {
					title: '首页',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
		],
	},
];

export const STATIC_ROUTES: Array<RouteRecordRaw> = [
	{
		path: SIGN_IN_PATH,
		name: 'SignIn',
		component: () => import('../views/sign-in/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/404',
		name: 'NotFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '页面找不到',
		},
	},
	{
		path: '/401',
		name: 'Unauthorized',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '页面无权限',
		},
	},
];
