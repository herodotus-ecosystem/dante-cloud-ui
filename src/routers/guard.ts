import type {Router} from 'vue-router';
import {useRouteStore, useAuthenticationStore} from '/@/stores';
import {PathEnum} from '/@/lib/enums';
import {lodash} from '/@/lib/utils';
import {staticRoutes} from './logic';

import {initBackEndRoutes, initFrontEndRoutes, reloadDynamicRoutes} from './logic/processor';

import {Loading, QSpinnerDots} from 'quasar';
import {getQueryString} from "/@/lib/utils/base/strings";

let __social_F = true;
export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    console.log(to, from)
    Loading.show({
      spinner: QSpinnerDots,
      spinnerSize: 100,
      spinnerColor: 'blue-10',
      delay: 200,
    });
    const authStore = useAuthenticationStore();
    const routeStore = useRouteStore();

    if (to.path !== PathEnum.SIGN_IN ) {
      routeStore.lastPage = to.path;
    }
    const token = authStore.access_token;

    const source = getQueryString(window.location.href, "source");
    console.log(window.location.href)
    if (source&&__social_F) {
      __social_F = false;
      const code = getQueryString(window.location.href, "code");
      const state = getQueryString(window.location.href, "state");
      authStore.socialSignIn(code,state,source).then((value)=>{
        console.log(value)
      });
      return;
    }

    // 有 Token
    if (token) {
      if (to.path === PathEnum.SIGN_IN) {
        // 目的地址还是登录页面，直接跳转到首页。
        next(PathEnum.BASE_HOME);
        return;
      } else {
        // 判断动态路由是否已经添加，没有添加则进行添加
        if (!routeStore.isDynamicRouteAdded) {
          if (routeStore.isRemote) {
            await initBackEndRoutes(router);
          } else {
            await initFrontEndRoutes(router);
          }
          const redirectPath = (from.query.redirect || to.path) as string;
          const redirectURI = decodeURIComponent(redirectPath);
          const nextPath = to.path === redirectURI ? {...to, replace: true} : {path: redirectURI};
          console.log(nextPath);
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
        if (to.path === PathEnum.SIGN_IN) {
          localStorage.removeItem("Authentication");
          next();
          return;
        } else {
          next(PathEnum.SIGN_IN);
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
