import type { RouteRecordRaw } from 'vue-router';

import { isEmpty, intersection } from 'lodash-es';
import { useRouterStore, useAuthenticationStore } from '../stores';

export default function useQuasarMenu() {
  const store = useRouterStore();
  const authentication = useAuthenticationStore();

  const getItemTitle = (item: RouteRecordRaw): string => {
    return item.meta?.title as string;
  };

  const getItemIcon = (item: RouteRecordRaw): string => {
    return item.meta?.icon as string;
  };

  const getItemHideAllChild = (item: RouteRecordRaw): boolean => {
    return item.meta?.isHideAllChild as boolean;
  };

  const getItemChildren = (item: RouteRecordRaw): Array<RouteRecordRaw> => {
    return item.children as Array<RouteRecordRaw>;
  };

  const hasChildren = (item: RouteRecordRaw): boolean => {
    return !!getItemChildren(item);
  };

  const hasPermission = (item: RouteRecordRaw): boolean => {
    const userRoles = authentication.roles;
    const routeRoles = item.meta?.roles as Array<string>;

    // 如果路由中没有设置任何角色，则认为所有人都有权限
    if (isEmpty(routeRoles)) {
      return true;
    }

    // 路由中有角色设置，但用户角色为空，则认为没有权限
    if (isEmpty(userRoles)) {
      return false;
    }

    // 当前两边角色都不为空
    // 取两者交集，如果交集为空，则认为没有权限，如果存在交集，责任为有权限
    const result = intersection(userRoles, routeRoles);

    if (isEmpty(result)) {
      return false;
    } else {
      return true;
    }
  };

  const isDisplayAsItem = (item: RouteRecordRaw): boolean => {
    if (!hasChildren(item)) {
      return true;
    } else {
      if (getItemHideAllChild(item)) {
        return true;
      } else {
        return false;
      }
    }
  };

  return {
    hasPermission,
    getItemTitle,
    getItemIcon,
    getItemChildren,
    isDisplayAsItem,
  };
}
