import type { ModuleNamespace } from 'vite/types/hot.js';
import type { RouteRecordRaw, RouteMeta, Router } from 'vue-router';
import type { ElementRouteTree } from '@herodotus/core';

import { useRouteStore } from '@/stores';
import { lodash, api } from '@/lib/utils';
import { MenuScenario } from '@/lib/enums';

const routeModules = import.meta.glob('../modules/**/*.ts', { eager: true });
const vueModules = import.meta.glob('../../views/**/*.vue');

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
  raw.component = modules[`../../${item.componentPath}`];

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
  const store = useRouteStore();

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

const getRoutesFromServer = (roles: string[]) => {
  return api.sysElement().findResourcesByRoles(roles);
};

const getRoutesFromLocal = () => {
  const routes: Array<RouteRecordRaw> = [];
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

export const dynamicAddRoutes = (router: Router, routes: Array<RouteRecordRaw>) => {
  routes.forEach((item) => {
    router.addRoute(item as RouteRecordRaw);
  });
  console.log('[Herodotus] |- Dynamic routes add success!');
};

const addRoutes = (router: Router, routes: RouteRecordRaw[]) => {
  const store = useRouteStore();

  console.log('[Herodotus] |- Begin add dynamic routes');

  if (!lodash.isEmpty(routes)) {
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

/**
 * 在不修改数据库数据情况下，修复后端Workbench路由，避免左侧菜单不支持toCreate详情页问题
 * 如果修改了数据库，可取消此方法
 * 修改数据库数据：
 * ```sql - postgresql
 * update sys_element
 *   set component = null,
 *   hide_all_child = false
 *   where path = '/dashboard/workbench';
 * update sys_element
 *   set component = 'views/pages/workflow/process-approve/Index.vue',
 *   detail_content = false,
 *   title = '审批流程'
 *   where path = '/dashboard/workbench/process-approve';
 * update sys_element
 *   set component = 'views/pages/workflow/process-start/Index.vue',
 *   detail_content = false,
 *   title = '任务流程'
 *   where path = '/dashboard/workbench/process-start';
 * ```
 * @param routeData
 */
const fixBackEndWorkbenchRoute = (routeData: Array<ElementRouteTree>) => {
  console.log('processor.ts - fixBackEndRoutes(routes: Array<RouteRecordRaw>) ... ');
  const fix = (workbenchRoute: ElementRouteTree) => {
    workbenchRoute.componentPath = '';
    workbenchRoute.meta.isHideAllChild = false;
    workbenchRoute.children?.forEach((rr: ElementRouteTree) => {
      if (rr.componentName === 'WorkflowProcessApprove') {
        rr.componentPath = 'views/pages/workflow/process-approve/Index.vue';
        rr.meta.isDetailContent = false;
        rr.meta.title = '审批流程';
      }
      if (rr.componentName === 'WorkflowProcessStart') {
        rr.componentPath = 'views/pages/workflow/process-start/Index.vue';
        rr.meta.isDetailContent = false;
        rr.meta.title = '任务流程';
      }
    });
    console.log('processor.ts - fixWorkbenchRoute(...) - workbenchRoute:', workbenchRoute);
  };
  routeData.forEach((rr: ElementRouteTree) => {
    if (rr.name === '/dashboard') {
      rr.children?.forEach((rr1: ElementRouteTree) => {
        if (rr1.name === '/dashboard/workbench') fix(rr1);
      });
    }
  });
};

export const initBackEndRoutes = async (router: Router, roles: string[]) => {
  const response = await getRoutesFromServer(roles);
  const routeData = response.data.menus as Array<ElementRouteTree>;
  const modules = vueModules as ModuleNamespace;
  fixBackEndWorkbenchRoute(routeData);
  // 将后端路由数据转换为前端可识别路由格式
  const routes = convert(routeData, modules);
  console.log('---routes---', routes);
  addRoutes(router, routes);
};

export const initFrontEndRoutes = async (router: Router) => {
  const routes = getRoutesFromLocal();
  const data = routes.sort(sorting);
  addRoutes(router, data);
};
