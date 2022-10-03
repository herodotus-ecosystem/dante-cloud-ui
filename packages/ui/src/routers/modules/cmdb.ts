import type { RouteRecordRaw } from 'vue-router';
import { ComponentNameEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/cmdb',
		component: () => import('/@/views/layouts/Index.vue'),
		meta: { title: '运维配置管理', sort: 6, icon: 'mdi-lock-pattern' },
		redirect: '/cmdb/application',
		children: [
			{
				path: '/cmdb/application',
				name: ComponentNameEnum.ASSET_APPLICATION,
				meta: { title: '应用系统管理', icon: 'mdi-application', isHideAllChild: true },
				component: () => import('/@/views/pages/cmdb/asset/application/Index.vue'),
				children: [
					{
						path: '/cmdb/application/content',
						name: 'AssetApplicationContent',
						meta: { title: '应用系统详情', icon: 'mdi-application-edit', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/asset/application/Content.vue'),
					},
					{
						path: '/cmdb/application/authorize',
						name: 'AssetApplicationAuthorize',
						meta: { title: '分配服务器', icon: 'mdi-application-cog', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/asset/application/authorize.vue'),
					},
				],
			},
			{
				path: '/cmdb/server',
				name: ComponentNameEnum.ASSET_SERVER,
				meta: { title: '服务器管理', icon: 'mdi-server', isHideAllChild: true },
				component: () => import('/@/views/pages/cmdb/asset/server/Index.vue'),
				children: [
					{
						path: '/cmdb/server/content',
						name: 'AssetServerContent',
						meta: { title: '服务器详情', icon: 'mdi-server-security', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/asset/server/Content.vue'),
					},
				],
			},
			{
				path: '/cmdb/instance',
				name: ComponentNameEnum.DATABASE_INSTANCE,
				meta: { title: '数据库实例管理', icon: 'mdi-database', isHideAllChild: true },
				component: () => import('/@/views/pages/cmdb/db/instance/Index.vue'),
				children: [
					{
						path: '/cmdb/instance/content',
						name: 'DatabaseInstanceContent',
						meta: { title: '数据库实例详情', icon: 'mdi-database-edit', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/db/instance/Content.vue'),
					},
					{
						path: '/cmdb/instance/authorize',
						name: 'DatabaseInstanceAuthorize',
						meta: { title: '数据库配置', icon: 'mdi-database-plus', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/db/instance/Authorize.vue'),
					},
				],
			},
			{
				path: '/cmdb/catalog',
				name: ComponentNameEnum.DATABASE_CATALOG,
				meta: { title: '数据库目录管理', icon: 'mdi-database-settings', isHideAllChild: true },
				component: () => import('/@/views/pages/cmdb/db/catalog/Index.vue'),
				children: [
					{
						path: '/cmdb/catalog/content',
						name: 'DatabaseCatalogContent',
						meta: { title: '数据库目录详情', icon: 'mdi-database-eye', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/db/catalog/Content.vue'),
					},
					{
						path: '/cmdb/catalog/authorize',
						name: 'DatabaseCatalogAuthorize',
						meta: { title: '数据库用户配置', icon: 'mdi-database-lock', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/db/catalog/Authorize.vue'),
					},
				],
			},
			{
				path: '/cmdb/account',
				name: ComponentNameEnum.DATABASE_ACCOUNT,
				meta: { title: '数据库用户管理', icon: 'mdi-account-lock', isHideAllChild: true },
				component: () => import('/@/views/pages/cmdb/db/account/Index.vue'),
				children: [
					{
						path: '/cmdb/account/content',
						name: 'DatabaseAccountContent',
						meta: { title: '数据库用户详情', icon: 'mdi-account-key', isDetailContent: true },
						component: () => import('/@/views/pages/cmdb/db/account/Content.vue'),
					},
				],
			},
		],
	},
];

export default routes;
