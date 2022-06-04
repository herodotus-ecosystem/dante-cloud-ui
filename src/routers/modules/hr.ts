import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../logic';
import { ComponentName } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/hr',
		component: () => import('/@/layouts/Index.vue'),
		meta: { title: '人力资源管理', sort: 3, icon: 'mdi-account-group', group: 'herodotus' },
		redirect: '/hr/organization',
		children: [
			{
				path: '/hr/organization',
				name: ComponentName.SYS_ORGANIZATION,
				meta: { title: '单位管理', icon: 'mdi-bank-outline' },
				component: () => import('/@/views/pages/hr/organization/Index.vue'),
			},
			{
				path: '/hr/department',
				name: ComponentName.SYS_DEPARTMENT,
				meta: { title: '部门管理', icon: 'mdi-file-table-box-multiple-outline' },
				component: () => import('/@/views/pages/hr/department/Index.vue'),
			},
			{
				path: '/hr/employee',
				name: ComponentName.SYS_EMPLOYEE,
				meta: { title: '人员管理', icon: 'mdi-account-supervisor-outline' },
				component: () => import('/@/views/pages/hr/employee/Index.vue'),
			},
			{
				path: '/hr/ownership',
				name: ComponentName.SYS_OWNERSHIP,
				meta: { title: '人员归属', icon: 'mdi-card-account-details-star-outline', group: 'humanresources' },
				component: () => import('/@/views/pages/hr/ownership/Index.vue'),
			},
		],
	},
];

export default routes;
