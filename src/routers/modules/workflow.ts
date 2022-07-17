import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/workflow',
		component: () => import('/@/views/layouts/Index.vue'),
		meta: { title: '工作流程管理', sort: 5, icon: 'mdi-transit-connection-variant' },
		redirect: '/workflow/deployment',
		children: [
			{
				path: '/workflow/deployment',
				name: 'WorkflowDeployment',
				meta: { title: '流程部署管理', icon: 'mdi-cloud-braces', hideAllChild: true },
				component: () => import('/@/views/pages/workflow/deployment/Index.vue'),
				children: [
					{
						path: '/workflow/deployment/content',
						name: 'WorkflowDeploymentContent',
						meta: { title: '流程部署详情', icon: 'mdi-cloud-alert', isDetailContent: true },
						component: () => import('/@/views/pages/workflow/deployment/Content.vue'),
					},
				],
			},
		],
	},
];

export default routes;
