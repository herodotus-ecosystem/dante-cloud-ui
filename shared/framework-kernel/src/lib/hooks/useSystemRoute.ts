import type { RouteRecordRaw, RouteMeta, Router } from 'vue-router';
import type { ElementRouteTree } from '@herodotus-cloud/core';
import type { RemoteRoute, ModuleNamespace } from '@/declarations';

import { useRouterStore } from '../stores';
import { MenuScenario } from '@/declarations';
import { isEmpty } from 'lodash-es';

export default function useSystemRoute(
  routeModules: Record<string, unknown>,
  vueModules: Record<string, unknown>,
  locate: (item: string) => string,
  getRoutesFromServer: (roles: string[]) => Promise<any>,
) {
  /**
   * 获取路由条目中的 meta 中的 isDetailContent 属性值
   * @param item 路由条目
   * @returns isDetailContent 属性值
   */
  const isDetailContent = (item: RouteRecordRaw): boolean => {
    return item.meta?.isDetailContent as boolean;
  };

  /**
   * 获取路由条目中的 meta 中的 scenario 属性值
   * @param item 路由条目
   * @returns getMenuScenario 属性值
   */
  const getMenuScenario = (item: RouteRecordRaw): string => {
    return item.meta?.scenario as string;
  };
  /**
   * 将后端返回的 Element 数据条目，转换为 vue-router 格式，作为动态路由添加至 vue-router 中。
   * @param item 数据条目
   * @param modules 前端 Pages Vue 页面列表
   * @returns 路由记录
   */
  const convertToRouteRecordRaw = (
    item: ElementRouteTree,
    modules: ModuleNamespace,
  ): RouteRecordRaw => {
    const raw = {} as RouteRecordRaw;
    raw.path = item.name;
    raw.component = modules[locate(item.componentPath)];

    if (item.componentName) {
      raw.name = item.componentName;
    }
    if (item.redirect) {
      raw.redirect = item.redirect;
    }

    raw.meta = {
      scenario: item.scenario,
      icon: item.meta.icon,
      title: item.meta.title,
      ...(item.meta.sort && { sort: item.meta.sort }),
      ...(item.meta.isHaveChild && { isHaveChild: item.meta.isHaveChild }),
      ...(item.meta.isNotKeepAlive && { isNotKeepAlive: item.meta.isNotKeepAlive }),
      ...(item.meta.isHideAllChild && { isHideAllChild: item.meta.isHideAllChild }),
      ...(item.meta.isDetailContent && { isDetailContent: item.meta.isDetailContent }),
      ...(item.meta.isIgnoreAuth && { isIgnoreAuth: item.meta.isIgnoreAuth }),
    } as RouteMeta;

    return raw;
  };

  /**
   * 将后端返回的路由 JSON 转换为前端可识别的格式，主要解决 vite 环境下，component 的 import 问题
   * @param dataimport { ModuleNamespace } from 'vite/types/hot';
   * import default from './../../../vite.config';
   * @returns
   */
  const convert = (data: ElementRouteTree[], modules: ModuleNamespace): RouteRecordRaw[] => {
    const store = useRouterStore();

    return data.map((node: ElementRouteTree) => {
      // 转换路由记录
      const raw = convertToRouteRecordRaw(node, modules);

      if (isDetailContent(raw)) {
        store.addDetailRoute(raw);
      }
      if (node.children && node.children.length > 0) {
        raw.children = convert(node.children, modules);
      }

      return raw;
    });
  };

  const getRoutesFromLocal = () => {
    const routes: RouteRecordRaw[] = [];
    const modules = routeModules as ModuleNamespace;
    Object.keys(modules).forEach((key) => {
      const item = modules[key];
      const module = item.default || {};
      const list = Array.isArray(module) ? [...module] : [module];
      routes.push(...list);
    });
    return routes;
  };

  const sorting = (a: RouteRecordRaw, b: RouteRecordRaw): number => {
    const aValue = a.meta?.sort || 0;
    const bValue = b.meta?.sort || 0;
    return (aValue as number) - (bValue as number);
  };

  const addRoutes = (router: Router, routes: RouteRecordRaw[]) => {
    const store = useRouterStore();

    console.log('[Herodotus] |- Begin add dynamic routes');

    if (!isEmpty(routes)) {
      const appMenus: RouteRecordRaw[] = [];
      const personalMenus: RouteRecordRaw[] = [];

      routes.forEach((item) => {
        router.addRoute(item as RouteRecordRaw);
        if (getMenuScenario(item) === MenuScenario.APP) {
          appMenus.push(item);
        } else {
          personalMenus.push(item);
        }
      });

      store.addMenus(appMenus, personalMenus);
      console.log('[Herodotus] |- Dynamic routes add success!');
    } else {
      console.warn('[Herodotus] |- Dynamic routes is empty, skip!');
    }
  };

  const initBackEndRoutes = async (router: Router, roles: string[]) => {
    const response = await getRoutesFromServer(roles);
    const routeData = response.data.menus as Array<ElementRouteTree>;
    const modules = vueModules as ModuleNamespace;
    // 将后端路由数据转换为前端可识别路由格式
    const routes = convert(routeData, modules);
    console.log('---routes---', routes);
    addRoutes(router, routes);
  };

  const initFrontEndRoutes = async (router: Router) => {
    const routes = getRoutesFromLocal();
    const data = routes.sort(sorting);
    console.log(data);
    addRoutes(router, data);
  };

  return {
    initBackEndRoutes,
    initFrontEndRoutes,
  };
}
