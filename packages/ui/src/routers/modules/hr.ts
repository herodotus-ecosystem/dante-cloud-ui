import type { RouteRecordRaw } from 'vue-router';
import { ComponentNameEnum } from '@/lib/enums';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/hr',
    component: () => import('@/views/layouts/Index.vue'),
    meta: { title: '人力资源管理', sort: 3, icon: 'mdi-account-tie' },
    redirect: '/hr/organization',
    children: [
      {
        path: '/hr/organization',
        name: ComponentNameEnum.SYS_ORGANIZATION,
        meta: { title: '单位管理', icon: 'mdi-bank-outline', isHideAllChild: true },
        component: () => import('@/views/pages/hr/organization/Index.vue'),
        children: [
          {
            path: '/hr/organization/content',
            name: 'SysOrganizationContent',
            meta: { title: '单位详情', icon: 'mdi-bank-check', isDetailContent: true },
            component: () => import('@/views/pages/hr/organization/Content.vue'),
          },
        ],
      },
      {
        path: '/hr/department',
        name: ComponentNameEnum.SYS_DEPARTMENT,
        meta: { title: '部门管理', icon: 'mdi-home', isHideAllChild: true },
        component: () => import('@/views/pages/hr/department/Index.vue'),
        children: [
          {
            path: '/hr/department/content',
            name: 'SysDepartmentContent',
            meta: { title: '部门详情', icon: 'mdi-home-edit', isDetailContent: true },
            component: () => import('@/views/pages/hr/department/Content.vue'),
          },
        ],
      },
      {
        path: '/hr/employee',
        name: ComponentNameEnum.SYS_EMPLOYEE,
        meta: { title: '人员管理', icon: 'mdi-card-account-details-star', isHideAllChild: true },
        component: () => import('@/views/pages/hr/employee/Index.vue'),
        children: [
          {
            path: '/hr/employee/content',
            name: 'SysEmployeeContent',
            meta: { title: '人员详情', icon: 'mdi-card-account-details', isDetailContent: true },
            component: () => import('@/views/pages/hr/employee/Content.vue'),
          },
        ],
      },
      {
        path: '/hr/ownership',
        name: ComponentNameEnum.SYS_OWNERSHIP,
        meta: { title: '人员归属', icon: 'mdi-account-switch', isHideAllChild: true },
        component: () => import('@/views/pages/hr/ownership/Index.vue'),
        children: [
          {
            path: '/hr/ownership/content',
            name: 'SysOwnershipContent',
            meta: {
              title: '归属详情',
              icon: 'mdi-account-multiple-check-outline',
              isDetailContent: true,
            },
            component: () => import('@/views/pages/hr/ownership/Content.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
