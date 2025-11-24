import type { RouteRecordRaw } from 'vue-router';
import { ComponentNameEnum } from '@/lib/enums';

const SettingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/message',
    component: () => import('@/views/layouts/Personal.vue'),
    meta: { title: '消息中心', icon: 'mdi-security' },
    redirect: '/message/information',
    children: [
      {
        path: '/message/information',
        name: ComponentNameEnum.MESSAGE_INFORMATION,
        meta: { title: '我的消息', icon: 'mdi-bell', isHideAllChild: true },
        component: () => import('@/views/persional/message/information/Index.vue'),
        children: [
          {
            path: '/message/information/content',
            name: 'MessageInformationContent',
            meta: { title: '私信记录', icon: 'mdi-bank-check', isDetailContent: true },
            component: () => import('@/views/persional/message/information/Content.vue'),
          },
        ],
      },
      {
        path: '/message/setting',
        name: ComponentNameEnum.MESSAGE_SETTING,
        meta: { title: '通知设置', icon: 'mdi-bell-cog' },
        component: () => import('@/views/persional/message/setting/Index.vue'),
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
        name: ComponentNameEnum.FOUNDATION_ACCOUNT,
        meta: { title: '账号管理', icon: 'mdi-card-account-details' },
        component: () => import('@/views/persional/foundation/account/Index.vue'),
      },
      {
        path: '/foundation/profile',
        name: ComponentNameEnum.FOUNDATION_PROFILE,
        meta: { title: '个人资料', icon: 'mdi-account' },
        component: () => import('@/views/persional/foundation/profile/Index.vue'),
      },
    ],
  },
];

export { SettingRoutes };
