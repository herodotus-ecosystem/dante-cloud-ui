import { RouteRecordRaw } from 'vue-router';
import { Path } from '/@/lib/declarations';
import { Layout } from '/@/lib/logics/route';

const routes: Array<RouteRecordRaw> = [
	{
		path: Path.HOME,
		name: 'Dashboard',
		component: Layout,
		meta: {
			title: 'Dashboard',
			// icon: renderIcon(DashboardOutlined),
			permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
			sort: 0,
		},
		children: [
			{
				path: '/dashboard/console',
				name: 'DashboardConsole',
				meta: { title: '应用管理', requireAuth: true },
				component: () => import('/@/views/dashboard/console/index.vue'),
			},
		],
	},
];

export default routes;
