import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import { defineStore } from 'pinia';

import { RoutePushParam, PushParam } from '/@/lib/declarations';
import { lodash } from '/@/lib/utils';

export const useRouteStore = defineStore('Route', {
  state: () => ({
    routes: [] as Array<RouteRecordRaw>,
    cachedRoutes: [] as string[],
    details: new Map(),
    isRemote: false,
    pushParams: {} as RoutePushParam
  }),

  getters: {
    isDynamicRouteAdded(): boolean {
      return !lodash.isEmpty(this.routes);
    },

    getDetailComponent(state) {
      return (key: string) => state.details.get(key);
    },

    getRoutePushParam(state) {
      return (key: string) => state.pushParams[key];
    }
  },

  actions: {
    addDynamicRoutes(routes: Array<RouteRecordRaw>) {
      this.routes = routes;
    },

    addCachedRoute(route: RouteLocationNormalizedLoaded) {
      if (!route.meta?.isNotKeepAlive) {
        const name = route.name as string;
        if (!this.cachedRoutes.includes(name)) {
          this.cachedRoutes.push(name);
        }
      }
    },

    addDetailRoutes(item: RouteRecordRaw) {
      const children: Array<RouteRecordRaw> = item.children || [];
      if (!lodash.isEmpty(children)) {
        children.forEach(child => {
          const componentName = child.name as string;
          if (componentName) {
            this.details.set(componentName, child.component);
          }
        });
      }
    },

    hasParameter(route: RouteLocationNormalizedLoaded): boolean {
      const name = route.name as string;
      if (name && lodash.has(this.pushParams, name)) {
        return true;
      }

      return false;
    },

    isDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
      if (route.meta) {
        if (route.meta.isDetailContent) {
          return true;
        }
      }
      return false;
    },

    isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
      return this.isDetailRoute(route) && this.hasParameter(route);
    },

    addRoutePushParam(name: string, params = {} as PushParam) {
      if (name) {
        this.pushParams[name] = params;
      }
    },

    removeRoutePushParam(name: string) {
      if (name) {
        delete this.pushParams[name];
      }
    }
  }
});
