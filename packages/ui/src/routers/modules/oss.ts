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
        meta: { title: '存储桶管理', icon: 'mdi-bucket', isHideAllChild: true },
        component: () => import('/@/views/pages/oss/bucket/Index.vue'),
        children: [
          {
            path: '/oss/bucket/content',
            name: 'OssBucketContent',
            meta: { title: '存储桶详情', icon: 'mdi-bucket-outline', isDetailContent: true },
            component: () => import('/@/views/pages/oss/bucket/Content.vue')
          },
          {
            path: '/oss/bucket/authorize',
            name: 'OssBucketAuthorize',
            meta: { title: '存储桶设置', icon: 'mdi-cog-outline', isDetailContent: true },
            component: () => import('/@/views/pages/oss/bucket/Authorize.vue')
          }
        ]
      },
      {
        path: '/oss/object',
        name: ComponentNameEnum.OSS_OBJECT,
        meta: { title: '存储对象管理', icon: 'mdi-file-cabinet', isHideAllChild: true },
        component: () => import('/@/views/pages/oss/object/Index.vue'),
        children: [
          {
            path: '/oss/object/content',
            name: 'OssObjectContent',
            meta: { title: '文件夹详情', icon: 'mdi-folder-open', isDetailContent: true },
            component: () => import('/@/views/pages/oss/object/Content.vue')
          },
          {
            path: '/oss/object/authorize',
            name: 'OssBucketAuthorize',
            meta: { title: '对象详情设置', icon: 'mdi-file-cog', isDetailContent: true },
            component: () => import('/@/views/pages/oss/object/Authorize.vue')
          }
        ]
      }
    ]
  }
];

export default routes;
