import type { RouteRecordRaw } from 'vue-router';

const SettingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/notifications',
    component: () => import('/@/views/layouts/Settings.vue'),
    meta: { title: '平台认证管理', sort: 1, icon: 'mdi-security' },
    redirect: '/notifications/info',
    children: [
      {
        path: '/notifications/info',
        name: 'NotificationInfo',
        meta: { title: '应用管理', icon: 'mdi-apps', isHideAllChild: true },
        component: () => import('/@/views/pages/authorize/application/Index.vue')
      }
    ]
  }
];

export { SettingRoutes };
