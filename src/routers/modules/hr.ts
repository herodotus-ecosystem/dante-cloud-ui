import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../logic';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/hr',
		component: Layout,
		meta: { title: '人力资源管理', sort: 3, icon: 'mdi-account-group', group: 'humanresources' },
		redirect: '/hr/organization',
		children: [
			{
				path: '/hr/organization',
				name: 'SysOrganization',
				meta: { title: '单位管理', icon: 'mdi-bank-outline', group: 'humanresources' },
				component: () => import('/@/views/pages/hr/organization/Index.vue'),
			},
			{
				path: '/hr/department',
				name: 'SysDepartment',
				meta: { title: '部门管理', icon: 'mdi-file-table-box-multiple-outline', group: 'humanresources' },
				component: () => import('/@/views/pages/hr/department/Index.vue'),
			},
			{
				path: '/hr/employee',
				name: 'SysEmployee',
				meta: { title: '人员管理', icon: 'mdi-account-supervisor-outline', group: 'humanresources' },
				component: () => import('/@/views/pages/hr/employee/Index.vue'),
			},
			{
				path: '/hr/ownership',
				name: 'SysOwnership',
				meta: { title: '人员归属', icon: 'mdi-card-account-details-star-outline', group: 'humanresources' },
				component: () => import('/@/views/pages/hr/ownership/Index.vue'),
			},
		],
	},
];

export default routes;
