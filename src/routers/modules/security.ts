import { RouteRecordRaw } from 'vue-router';
import { Layout } from '/@/lib/logics/route';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/security',
		component: Layout,
		meta: { title: '安全管理', icon: 'security', group: 'security', sort: 1 },
		redirect: '/security/user',
		children: [
			{
				path: '/security/user',
				name: 'SysUser',
				meta: { title: '用户管理', icon: 'security', requireAuth: true },
				component: () => import('/@/views/pages/security/user/Index.vue'),
			},
			{
				path: '/security/role',
				name: 'SysRole',
				meta: { title: '角色管理', icon: 'security', requireAuth: true },
				component: () => import('/@/views/pages/security/role/Index.vue'),
			},
			{
				path: '/security/authority',
				name: 'SysAuthority',
				meta: { title: '权限管理', icon: 'security', requireAuth: true },
				component: () => import('/@/views/pages/security/authority/Index.vue'),
			},
		],
	},
];

export default routes;
