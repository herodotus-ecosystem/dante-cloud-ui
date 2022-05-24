import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../logic';
import { ComponentName } from '/@/lib/enums';

/**
 * Meta 参数说明：
 *
 * 1. 节点路由（父路由）: 第一级
 * meta{
 *  // 标题
 *  title: string,
 *  // 排序：因为是动态读取 modules 目录中的值，无法控制顺序，通过该值来控制顺序。同时，菜单的显示也是依据该值。
 *  sort: number
 *  // 图标
 *  icon: string
 *  // 分组：Vuetify 组件所需的特有属性，菜单以及子节点靠该参数分组，该值设置错误，菜单的操作会出现以长。
 *  group: string
 * }
 *
 * 2. 功能节点路由：第二级
 * meta{
 *  // 标题
 *  title: string,
 *  // 图标
 *  icon: string
 *  // 是否需要 Vue KeepAlive 支持。
 *  isNotKeepAlive: boolean
 *  // 不在菜单中显示
 *  isNotShowInMenu:boolean
 *  // 是否忽略认证:
 *  isIgnoreAuth: boolean
 * }
 *
 * 3. 内容节点路由：第二级
 * meta{
 *  // 标题
 *  title: string,
 *  // 图标
 *  icon: string
 *  // 上级节点 title，用于面包屑组件显示
 *  parentTitle: string
 *  // 是否需要 Vue KeepAlive 支持。
 *  isNotKeepAlive: boolean
 *  // 不在菜单中显示
 *  isNotShowInMenu:boolean
 *  // 是否需要认证:
 *  isIgnoreAuth: boolean

 * }
 */
const routes: Array<RouteRecordRaw> = [
	{
		path: '/security',
		component: Layout,
		meta: { title: '用户安全管理', sort: 2, icon: 'mdi-security', group: 'security' },
		redirect: '/security/user',
		children: [
			{
				path: '/security/user',
				name: ComponentName.SYS_USER,
				meta: { title: '用户管理', icon: 'mdi-account-box-multiple-outline' },
				component: () => import('/@/views/pages/security/user/Index.vue'),
				children: [
					{
						path: '/security/user/content',
						name: 'SysUserContent',
						meta: { title: '用户详情', icon: 'mdi-account-box-multiple-outline', isDetailContent: true },
						component: () => import('/@/views/pages/security/user/Content.vue'),
					},
				],
			},

			{
				path: '/security/role',
				name: ComponentName.SYS_ROLE,
				meta: { title: '角色管理', icon: 'mdi-account-lock-outline' },
				component: () => import('/@/views/pages/security/role/Index.vue'),
				children: [
					{
						path: '/security/role/content',
						name: 'SysRoleContent',
						meta: { title: '角色详情', icon: 'mdi-account-box-multiple-outline', isDetailContent: true },
						component: () => import('/@/views/pages/security/role/Content.vue'),
					},
				],
			},
			{
				path: '/security/authority',
				name: ComponentName.SYS_AUTHORITY,
				meta: { title: '权限管理', icon: 'mdi-file-cog-outline' },
				component: () => import('/@/views/pages/security/authority/Index.vue'),
			},
		],
	},
];

export default routes;
