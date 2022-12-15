import type { RouteRecordRaw } from 'vue-router';

const SettingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/notifications',
    component: () => import('/@/views/layouts/Settings.vue'),
    meta: { title: '消息中心', icon: 'mdi-security' },
    redirect: '/notification/information',
    children: [
      {
        path: '/notification/information',
        name: 'NotificationInformation',
        meta: { title: '我的消息', icon: 'mdi-bell' },
        component: () => import('/@/views/settings/notification/Information.vue')
      },
      {
        path: '/notification/setting',
        name: 'NotificationSetting',
        meta: { title: '通知设置', icon: 'mdi-bell-cog' },
        component: () => import('/@/views/settings/notification/Setting.vue')
      }
    ]
  }
];

export { SettingRoutes };
