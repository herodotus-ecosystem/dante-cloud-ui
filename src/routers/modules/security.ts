import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../logic';
import { ComponentNameEnum } from '/@/lib/enums';

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
		component: () => import('/@/layouts/Index.vue'),
		meta: { title: '用户安全管理', sort: 2, icon: 'mdi-lock-pattern' },
		redirect: '/security/user',
		children: [
			{
				path: '/security/user',
				name: ComponentNameEnum.SYS_USER,
				meta: { title: '用户管理', icon: 'mdi-badge-account-horizontal', hideAllChild: true },
				component: () => import('/@/views/pages/security/user/Index.vue'),
				children: [
					{
						path: '/security/user/content',
						name: 'SysUserContent',
						meta: { title: '用户详情', icon: 'mdi-clipboard-account', isDetailContent: true },
						component: () => import('/@/views/pages/security/user/Content.vue'),
					},
					{
						path: '/security/user/authorize',
						name: 'SysUserAuthorize',
						meta: { title: '用户角色', icon: 'mdi-badge-account-alert', isDetailContent: true },
						component: () => import('/@/views/pages/security/user/authorize.vue'),
					},
				],
			},

			{
				path: '/security/role',
				name: ComponentNameEnum.SYS_ROLE,
				meta: { title: '角色管理', icon: 'mdi-shield-account', hideAllChild: true },
				component: () => import('/@/views/pages/security/role/Index.vue'),
				children: [
					{
						path: '/security/role/content',
						name: 'SysRoleContent',
						meta: { title: '角色详情', icon: 'mdi-shield-edit', isDetailContent: true },
						component: () => import('/@/views/pages/security/role/Content.vue'),
					},
					{
						path: '/security/role/authorize',
						name: 'SysRoleAuthorize',
						meta: { title: '角色权限', icon: 'mdi-shield-key', isDetailContent: true },
						component: () => import('/@/views/pages/security/role/Authorize.vue'),
					},
				],
			},
			{
				path: '/security/default-role',
				name: ComponentNameEnum.SYS_DEFAULT_ROLE,
				meta: { title: '默认角色', icon: 'mdi-lock-open-alert', hideAllChild: true },
				component: () => import('/@/views/pages/security/default-role/Index.vue'),
				children: [
					{
						path: '/security/default-role/authorize',
						name: 'SysDefaultRoleAuthorize',
						meta: { title: '角色配置', icon: 'mdi-lock-open-check', isDetailContent: true },
						component: () => import('/@/views/pages/security/default-role/Authorize.vue'),
					},
				],
			},
			{
				path: '/security/authority',
				name: ComponentNameEnum.SYS_AUTHORITY,
				meta: { title: '接口管理', icon: 'mdi-api' },
				component: () => import('/@/views/pages/security/authority/Index.vue'),
			},
			{
				path: '/security/security-attribute',
				name: ComponentNameEnum.SYS_SECURITY_ATTRIBUTE,
				meta: { title: '元数据管理', icon: 'mdi-text-box-multiple', hideAllChild: true },
				component: () => import('/@/views/pages/security/attribute/Index.vue'),
				children: [
					{
						path: '/security/security-attribute/content',
						name: 'SysSecurityAttributeContent',
						meta: { title: '权限配置', icon: 'mdi-text-box-edit', isDetailContent: true },
						component: () => import('/@/views/pages/security/attribute/Content.vue'),
					},
				],
			},
		],
	},
];

export default routes;
