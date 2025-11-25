import type { RouteRecordRaw } from 'vue-router';

import { CONSTANTS } from '@/configurations';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/manage',
    component: () => import('@/views/layouts/Index.vue'),
    meta: { title: '系统信息管理', sort: 8, icon: 'mdi-leaf' },
    redirect: '/manage/certificate',
    children: [
      {
        path: '/manage/certificate',
        name: CONSTANTS.ComponentName.MGT_CERTIFICATE,
        meta: { title: '证书管理', icon: 'mdi-certificate', isHideAllChild: true },
        component: () => import('@/views/pages/manage/certificate/Index.vue'),
        children: [
          {
            path: '/manage/certificate/content',
            name: 'MgtCertificateContent',
            meta: { title: '证书详情', icon: 'mdi-file-certificate', isDetailContent: true },
            component: () => import('@/views/pages/manage/certificate/Content.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;
