import type { RouteRecordRaw } from 'vue-router';
import { ComponentNameEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/authorize',
		component: () => import('/@/views/layouts/Index.vue'),
		meta: { title: '平台认证管理', sort: 1, icon: 'mdi-security' },
		redirect: '/authorize/application',
		children: [
			{
				path: '/authorize/application',
				name: ComponentNameEnum.OAUTH2_APPLICATION,
				meta: { title: '应用管理', icon: 'mdi-apps', hideAllChild: true },
				component: () => import('/@/views/pages/authorize/application/Index.vue'),
				children: [
					{
						path: '/authorize/application/content',
						name: 'OAuth2ApplicationContent',
						meta: { title: '应用详情', icon: 'mdi-application-edit', isDetailContent: true },
						component: () => import('/@/views/pages/authorize/application/Content.vue'),
					},
				],
			},
			{
				path: '/authorize/scope',
				name: ComponentNameEnum.OAUTH2_SCOPE,
				meta: { title: '范围管理', icon: 'mdi-group', hideAllChild: true },
				component: () => import('/@/views/pages/authorize/scope/Index.vue'),
				children: [
					{
						path: '/authorize/scope/content',
						name: 'OAuth2ScopeContent',
						meta: { title: '范围详情', icon: 'mdi-vector-link', isDetailContent: true },
						component: () => import('/@/views/pages/authorize/scope/Content.vue'),
					},
					{
						path: '/authorize/scope/authorize',
						name: 'OAuth2ScopeAuthorize',
						meta: { title: '范围权限', icon: 'mdi-vector-intersection', isDetailContent: true },
						component: () => import('/@/views/pages/authorize/scope/Authorize.vue'),
					},
				],
			},
			{
				path: '/authorize/token',
				name: ComponentNameEnum.OAUTH2_TOKEN,
				meta: { title: '凭证管理', icon: 'mdi-sitemap', group: 'authorize' },
				component: () => import('/@/views/pages/authorize/token/Index.vue'),
			},
			{
				path: '/authorize/compliance',
				name: ComponentNameEnum.OAUTH2_COMPLIANCE,
				meta: { title: '操作日志', icon: 'mdi-receipt-text-check', group: 'authorize' },
				component: () => import('/@/views/pages/authorize/compliance/Index.vue'),
			},
		],
	},
];

export default routes;
