import type { RouteRecordRaw } from 'vue-router';

import { ComponentNameEnum } from '/@/lib/enums';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/oss',
    component: () => import('/@/views/layouts/Index.vue'),
    meta: { title: '对象存储管理', sort: 6, icon: 'mdi-cloud-upload' },
    redirect: '/oss/bucket',
    children: [
      {
        path: '/oss/bucket',
        name: ComponentNameEnum.OSS_BUCKET,
        meta: { title: 'Bucket管理', icon: 'mdi-bucket', isHideAllChild: true },
        component: () => import('/@/views/pages/oss/bucket/Index.vue'),
        children: [
          {
            path: '/oss/bucket/content',
            name: 'OssBucketContent',
            meta: { title: 'Bucket详情', icon: 'mdi-bucket-outline', isDetailContent: true },
            component: () => import('/@/views/pages/oss/bucket/Content.vue')
          }
        ]
      },
      {
        path: '/oss/object',
        name: ComponentNameEnum.OSS_OBJECT,
        meta: { title: '存储对象管理', icon: 'mdi-file-cabinet', isHideAllChild: true },
        component: () => import('/@/views/pages/oss/object/Index.vue')
      },
      {
        path: '/oss/test',
        name: 'OssTest',
        meta: { title: '功能管理', icon: 'mdi-link-variant', isHideAllChild: true },
        component: () => import('/@/views/pages/oss/test/Index.vue')
      }
    ]
  }
];

export default routes;
