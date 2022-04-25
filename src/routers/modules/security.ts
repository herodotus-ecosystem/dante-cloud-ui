import { RouteRecordRaw } from 'vue-router';
import { Layout } from '/@/lib/logics/route';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/security',
		component: Layout,
		meta: { title: '安全管理', sort: 1, icon: 'mdi-security', group: 'security' },
		redirect: '/security/user',
		children: [
			{
				path: '/security/user',
				name: 'SysUser',
				meta: { title: '用户管理', icon: 'mdi-account-box-multiple-outline', isKeepAlive: true, requireAuth: true },
				component: () => import('../../views/pages/security/user/Index.vue'),
			},
			{
				path: '/security/role',
				name: 'SysRole',
				meta: { title: '角色管理', icon: 'mdi-account-lock-outline', isKeepAlive: true, requireAuth: true },
				component: () => import('../../views/pages/security/role/Index.vue'),
			},
			{
				path: '/security/authority',
				name: 'SysAuthority',
				meta: { title: '权限管理', icon: 'mdi-file-cog-outline', isKeepAlive: true, requireAuth: true },
				component: () => import('../../views/pages/security/authority/Index.vue'),
			},
		],
	},
];

export default routes;
