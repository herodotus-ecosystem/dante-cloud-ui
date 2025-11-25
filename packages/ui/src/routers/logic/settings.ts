import type { RouteRecordRaw } from 'vue-router';

const SettingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/message',
    component: () => import('@/views/layouts/Personal.vue'),
    meta: { title: '消息中心', icon: 'mdi-security' },
    redirect: '/message/information',
    children: [
      {
        path: '/message/information',
        name: 'MessageInformation',
        meta: { title: '我的消息', icon: 'mdi-bell', isHideAllChild: true },
        component: () => import('@/views/personal/message/information/Index.vue'),
        children: [
          {
            path: '/message/information/content',
            name: 'MessageInformationContent',
            meta: { title: '私信记录', icon: 'mdi-bank-check', isDetailContent: true },
            component: () => import('@/views/personal/message/information/Content.vue'),
          },
        ],
      },
      {
        path: '/message/setting',
        name: 'MessageSetting',
        meta: { title: '通知设置', icon: 'mdi-bell-cog' },
        component: () => import('@/views/personal/message/setting/Index.vue'),
      },
    ],
  },
  {
    path: '/foundation',
    component: () => import('@/views/layouts/Personal.vue'),
    meta: { title: '基础设置', icon: 'mdi-account-cog' },
    redirect: '/foundation/account',
    children: [
      {
        path: '/foundation/account',
        name: 'FoundationAccount',
        meta: { title: '账号管理', icon: 'mdi-card-account-details' },
        component: () => import('@/views/personal/foundation/account/Index.vue'),
      },
      {
        path: '/foundation/profile',
        name: 'FoundationProfile',
        meta: { title: '个人资料', icon: 'mdi-account' },
        component: () => import('@/views/personal/foundation/profile/Index.vue'),
      },
    ],
  },
];

export { SettingRoutes };
