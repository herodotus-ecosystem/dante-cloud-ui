import { RouteRecordRaw } from 'vue-router';
import { Path } from '/@/lib/enums';
import { Layout } from '../logic';

const routes: Array<RouteRecordRaw> = [
	{
		path: Path.HOME,
		name: 'Dashboard',
		component: Layout,
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
				component: () => import('/@/views/dashboard/console/index.vue'),
			},
		],
	},
];

export default routes;
