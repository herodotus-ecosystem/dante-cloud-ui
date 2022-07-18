import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/oss',
		component: () => import('/@/views/layouts/Index.vue'),
		meta: { title: '对象存储管理', sort: 6, icon: 'mdi-transit-connection-variant' },
		redirect: '/oss/bucket',
		children: [
			{
				path: '/oss/bucket',
				name: 'OssBucket',
				meta: { title: 'Bucket管理', icon: 'mdi-link-variant', isHideAllChild: true },
				component: () => import('/@/views/pages/oss/bucket/Index.vue'),
				children: [
					{
						path: '/oss/bucket/content',
						name: 'OssBucketContent',
						meta: { title: '流程部署详情', icon: 'mdi-folder', isDetailContent: true },
						component: () => import('../../views/pages/oss/bucket/Content2.vue'),
					},
				],
			},
		],
	},
];

export default routes;
