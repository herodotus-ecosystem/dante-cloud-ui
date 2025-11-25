import type { Router, RouteRecordRaw } from 'vue-router';
import {
  useAuthenticationStore,
  useRouterStore,
  useSystemRoute,
} from '@herodotus-cloud/framework-kernel';
import { CONSTANTS, API } from '@/configurations';

import { Loading, QSpinnerDots } from 'quasar';

const PageNotFoundRoute: RouteRecordRaw = {
  path: CONSTANTS.Path.NOT_FOUND,
  name: CONSTANTS.Path.NOT_FOUND_NAME,
  component: () => import('@/composables/error/404.vue'),
  meta: {
    title: 'ErrorPage',
  },
};

const routeModules = import.meta.glob('./modules/**/*.ts', {
  eager: true,
});

const vueModules = import.meta.glob('../views/**/*.vue');

const locate = (item: string) => {
  return `../${item}`;
};

const getRoutesFromServer = (roles: string[]) => {
  return API.core.sysElement().findResourcesByRoles(roles);
};

const { initBackEndRoutes } = useSystemRoute(routeModules, vueModules, locate, getRoutesFromServer);

export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    Loading.show({
      spinner: QSpinnerDots,
      spinnerSize: 100,
      spinnerColor: 'blue-10',
      delay: 200,
    });

    const authStore = useAuthenticationStore();
    const routeStore = useRouterStore();

    const token = authStore.token;

    // 有 Token
    if (token) {
      if (to.path === CONSTANTS.Path.SIGN_IN) {
        // 目的地址还是登录页面，直接跳转到首页。
        next(CONSTANTS.Path.HOME);
        return;
      } else {
        // 判断动态路由是否已经添加，没有添加则进行添加
        if (!routeStore.isDynamicRouteAdded) {
          await initBackEndRoutes(router, authStore.roles);
          router.addRoute(PageNotFoundRoute);
          const redirectPath = (from.query.redirect || to.path) as string;
          const redirectURI = decodeURIComponent(redirectPath);
          const nextPath =
            to.path === redirectURI ? { ...to, replace: true } : { path: redirectURI };
          next(nextPath);
          return;
        } else {
          next();
          return;
        }
      }
    } else {
      // 没有Token，同时是忽略权限验证的页面
      if (to.meta.isIgnoreAuth) {
        next();
        return;
      } else {
        if (to.path === CONSTANTS.Path.SIGN_IN) {
          localStorage.clear();
          next();
          return;
        } else {
          next(CONSTANTS.Path.SIGN_IN);
          return;
        }
      }
    }
  });

  // 路由加载后
  router.afterEach(() => {
    Loading.hide();
  });
};
