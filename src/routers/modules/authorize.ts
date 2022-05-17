import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../logic';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/authorize',
		component: Layout,
		meta: { title: '平台认证管理', sort: 1, icon: 'mdi-shield-key', group: 'authorize' },
		redirect: '/authorize/application',
		children: [
			{
				path: '/authorize/application',
				name: 'OAuth2Application',
				meta: { title: '应用管理', icon: 'mdi-apps', group: 'authorize' },
				component: () => import('/@/views/pages/authorize/application/Index.vue'),
			},
			{
				path: '/authorize/scope',
				name: 'OAuth2Scope',
				meta: { title: '范围管理', icon: 'mdi-arrange-send-backward', group: 'authorize' },
				component: () => import('/@/views/pages/authorize/scope/Index.vue'),
			},
			{
				path: '/authorize/token',
				name: 'OAuth2Token',
				meta: { title: '凭证管理', icon: 'mdi-sitemap', group: 'authorize' },
				component: () => import('/@/views/pages/authorize/token/Index.vue'),
			},
		],
	},
];

export default routes;
