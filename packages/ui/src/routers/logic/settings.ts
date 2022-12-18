import type { RouteRecordRaw } from 'vue-router';
import { ComponentNameEnum } from '/@/lib/enums';

const SettingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/message',
    component: () => import('/@/views/layouts/Settings.vue'),
    meta: { title: '消息中心', icon: 'mdi-security' },
    redirect: '/message/information',
    children: [
      {
        path: '/message/information',
        name: ComponentNameEnum.MESSAGE_INFORMATION,
        meta: { title: '我的消息', icon: 'mdi-bell', isHideAllChild: true },
        component: () => import('/@/views/settings/message/Information.vue'),
        children: [
          {
            path: '/message/information/content',
            name: 'MessageInformationContent',
            meta: { title: '私信记录', icon: 'mdi-bank-check', isDetailContent: true },
            component: () => import('/@/views/settings/message/InformationContent.vue')
          }
        ]
      },
      {
        path: '/message/setting',
        name: 'MessageSetting',
        meta: { title: '通知设置', icon: 'mdi-bell-cog' },
        component: () => import('/@/views/settings/message/Setting.vue')
      }
    ]
  }
];

export { SettingRoutes };
