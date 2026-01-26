import type { RouteRecordRaw } from 'vue-router';

import { CONSTANTS } from '@/configurations';
import { WidgetRoute } from './widgets';
import { SettingRoutes } from './settings';

const RootRoute: RouteRecordRaw = {
  path: CONSTANTS.Path.ROOT,
  name: 'Root',
  redirect: CONSTANTS.Path.HOME,
  meta: {
    title: 'Root',
  },
};

const SignInRoute: RouteRecordRaw = {
  path: CONSTANTS.Path.SIGN_IN,
  name: 'SignIn',
  component: () => import('../../views/sign-in/SignIn.vue'),
  meta: {
    title: '登录',
    isIgnoreAuth: true,
  },
};

const SocialSignInCallbackRoute: RouteRecordRaw = {
  path: '/social/oauth2/callback/:source',
  name: 'SocialSignInCallback',
  component: () => import('../../views/sign-in/SocialSignInCallback.vue'),
  meta: {
    title: '社交登录 Callback',
    isIgnoreAuth: true,
  },
};

const AuthorizationCodeSignInRoute: RouteRecordRaw = {
  path: '/authorization-code',
  name: 'AuthorizationCodeSignIn',
  component: () => import('../../views/sign-in/AuthorizationCodeSignIn.vue'),
  meta: {
    title: '授权码模式登录',
    isIgnoreAuth: true,
  },
};

const NoPermissionRoute: RouteRecordRaw = {
  path: '/403',
  name: 'NoPermission',
  component: () => import('@/components/error/403.vue'),
  meta: { title: 'No Permission' },
};

const NotFoundRoute: RouteRecordRaw = {
  path: '/404',
  name: 'NotFound',
  component: () => import('@/components/error/404.vue'),
  meta: { title: 'Not Found' },
};

const ServiceErrorRoute: RouteRecordRaw = {
  path: '/500',
  name: 'ServiceError',
  component: () => import('@/components/error/500.vue'),
  meta: { title: 'Service Error' },
};

const PageNotFoundRoute: RouteRecordRaw = {
  path: CONSTANTS.Path.NOT_FOUND,
  name: CONSTANTS.Path.NOT_FOUND_NAME,
  component: () => import('@/components/error/404.vue'),
  meta: {
    title: 'ErrorPage',
  },
};

//普通路由 无需验证权限
export const staticRoutes: Array<RouteRecordRaw> = [
  RootRoute,
  SignInRoute,
  NoPermissionRoute,
  NotFoundRoute,
  ServiceErrorRoute,
  SocialSignInCallbackRoute,
  AuthorizationCodeSignInRoute,
  WidgetRoute,
];
