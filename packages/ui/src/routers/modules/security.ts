import type { RouteRecordRaw } from 'vue-router';
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
    component: () => import('/@/views/layouts/Index.vue'),
    meta: { title: '用户安全管理', sort: 2, icon: 'mdi-lock-pattern' },
    redirect: '/security/user',
    children: [
      {
        path: '/security/user',
        name: ComponentNameEnum.SYS_USER,
        meta: { title: '用户管理', icon: 'mdi-badge-account-horizontal', isHideAllChild: true },
        component: () => import('/@/views/pages/security/user/Index.vue'),
        children: [
          {
            path: '/security/user/content',
            name: 'SysUserContent',
            meta: { title: '用户详情', icon: 'mdi-clipboard-account', isDetailContent: true },
            component: () => import('/@/views/pages/security/user/Content.vue')
          },
          {
            path: '/security/user/authorize',
            name: 'SysUserAuthorize',
            meta: { title: '用户角色', icon: 'mdi-badge-account-alert', isDetailContent: true },
            component: () => import('/@/views/pages/security/user/authorize.vue')
          }
        ]
      },

      {
        path: '/security/role',
        name: ComponentNameEnum.SYS_ROLE,
        meta: { title: '角色管理', icon: 'mdi-shield-account', isHideAllChild: true },
        component: () => import('/@/views/pages/security/role/Index.vue'),
        children: [
          {
            path: '/security/role/content',
            name: 'SysRoleContent',
            meta: { title: '角色详情', icon: 'mdi-shield-edit', isDetailContent: true },
            component: () => import('/@/views/pages/security/role/Content.vue')
          },
          {
            path: '/security/role/authorize',
            name: 'SysRoleAuthorize',
            meta: { title: '角色权限', icon: 'mdi-shield-key', isDetailContent: true },
            component: () => import('/@/views/pages/security/role/Authorize.vue')
          }
        ]
      },
      {
        path: '/security/permission',
        name: ComponentNameEnum.SYS_PERMISSION,
        meta: { title: '权限管理', icon: 'mdi-shield-link-variant', isHideAllChild: true },
        component: () => import('/@/views/pages/security/permission/Index.vue'),
        children: [
          {
            path: '/security/permission/content',
            name: 'SysPermissionContent',
            meta: { title: '权限详情', icon: 'mdi-clipboard-check-multiple', isDetailContent: true },
            component: () => import('/@/views/pages/security/permission/Content.vue')
          }
        ]
      },
      {
        path: '/security/attribute',
        name: ComponentNameEnum.SYS_ATTRIBUTE,
        meta: { title: '元数据管理', icon: 'mdi-layers-triple', isHideAllChild: true },
        component: () => import('/@/views/pages/security/attribute/Index.vue'),
        children: [
          {
            path: '/security/attribute/content',
            name: 'SysAttributeContent',
            meta: { title: '元数据详情', icon: 'mdi-layers', isDetailContent: true },
            component: () => import('/@/views/pages/security/attribute/Content.vue')
          },
          {
            path: '/security/attribute/authorize',
            name: 'SysAttributeAuthorize',
            meta: { title: '元数据配置', icon: 'mdi-layers-edit', isDetailContent: true },
            component: () => import('/@/views/pages/security/attribute/Authorize.vue')
          }
        ]
      },
      {
        path: '/security/default-role',
        name: ComponentNameEnum.SYS_DEFAULT_ROLE,
        meta: { title: '默认角色', icon: 'mdi-lock-open-alert', isHideAllChild: true },
        component: () => import('/@/views/pages/security/default-role/Index.vue'),
        children: [
          {
            path: '/security/default-role/authorize',
            name: 'SysDefaultRoleAuthorize',
            meta: { title: '角色配置', icon: 'mdi-lock-open-check', isDetailContent: true },
            component: () => import('/@/views/pages/security/default-role/Authorize.vue')
          }
        ]
      },
      {
        path: '/security/element',
        name: ComponentNameEnum.SYS_ELEMENT,
        meta: { title: '菜单管理', icon: 'mdi-clipboard-text', isHideAllChild: true },
        component: () => import('/@/views/pages/security/element/Index.vue'),
        children: [
          {
            path: '/security/element/content',
            name: 'SysElementContent',
            meta: { title: '菜单详情', icon: 'mdi-clipboard-text-multiple', isDetailContent: true },
            component: () => import('/@/views/pages/security/element/Content.vue')
          },
          {
            path: '/security/element/authorize',
            name: 'SysElementAuthorize',
            meta: { title: '菜单权限', icon: 'mdi-sort-variant-lock', isDetailContent: true },
            component: () => import('/@/views/pages/security/element/Authorize.vue')
          }
        ]
      },
      {
        path: '/security/tenant',
        name: ComponentNameEnum.SYS_TENANT_DATA_SOURCE,
        meta: { title: '多租户数据源', icon: 'mdi-database-plus', isHideAllChild: true },
        component: () => import('/@/views/pages/security/tenant/Index.vue'),
        children: [
          {
            path: '/security/tenant/content',
            name: 'SysTenantDataSourceContent',
            meta: { title: '数据源详情', icon: 'mdi-database-edit', isDetailContent: true },
            component: () => import('/@/views/pages/security/element/Content.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
