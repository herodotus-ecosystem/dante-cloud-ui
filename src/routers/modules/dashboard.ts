import { RouteRecordRaw } from 'vue-router';
import { PathEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
	{
		path: PathEnum.HOME,
		name: 'Dashboard',
		component: () => import('/@/layouts/Index.vue'),
		redirect: '/dashboard/console',
		meta: {
			title: 'Dashboard',
			sort: 0,
			icon: 'mdi-view-dashboard',
			group: 'dashboard',
		},
		children: [
			{
				path: '/dashboard/console',
				name: 'DashboardConsole',
				meta: { title: '主控台', icon: 'mdi-chart-bar-stacked', isKeepAlive: true, requireAuth: true },
				component: () => import('/@/views/dashboard/console/Index.vue'),
			},
		],
	},
];

export default routes;
