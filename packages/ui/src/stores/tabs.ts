import {defineStore} from 'pinia';
import type {RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordNormalized} from 'vue-router';

import {lodash, RouteUtils} from '/@/lib/utils';
import type {Tab} from '/@/lib/declarations';
import {staticRoutes} from '/@/routers/logic';
import { useRouteStore } from '/@/stores/route';
import { useApplicationStore } from '/@/stores/application';

/**
 * TabView 目前完全基于 Quasar 的 QRouteTab 进行构建。
 * QRouteTab 可以和 VueRouter 完全融合。
 *
 * 但是有一个问题，就是在关闭最后一个 Tab 时，QRouteTab 会从新跳转到该 Tab 所在的地址，这样就导致自定义方法中的 router 跳转不起作用。
 * 为了解决这个问题，彻底将最后一个 Tab 锁定 (即不允许关闭)
 *
 * 思考下来发现这个逻辑也符合常理，因为界面上还是始终要留一个Tab才好。
 */
export const useTabsStore = defineStore('Tabs', {
  state: () => ({
    tabs: [] as Array<Tab>,
    activatedTab: {} as Tab,
    activatedTabName: '' as RouteRecordName | null | undefined,
    activatedTabIndex: 0 as number
  }),

  getters: {

    lastTabIndex: (state): number => {
      return state.tabs.length - 1;
    },

    isLastTabActivated(state): boolean {
      return state.activatedTabIndex === state.tabs.length - 1;
    },

    isFirstTabActivated(state): boolean {
      return state.activatedTabIndex === 0;
    },

    disableRefreshCurrentTab(state): boolean {
      return !!(state.activatedTab.meta && state.activatedTab.meta.isDetailContent);
    },

    disableCloseLeftTabs(state): boolean {
      return this.isFirstTabActivated;
    },

    disableCloseRightTabs(state): boolean {
      return this.isLastTabActivated;
    },

  },

  actions: {

    tabIndexOf(tab: Tab): number {
      return lodash.findIndex(this.tabs, (item: Tab) => item.name === tab.name);
    },

    isLocked(tab: Tab): boolean {
      return this.tabIndexOf(tab) === 0
        || tab.path === '/dashboard/console'
        || tab.meta["isLockedTab"] === true
    },

    isDetailContent(tab: Tab): boolean {
      return !!(tab.meta && tab.meta.isDetailContent);
    },

    isNotStaticRoute(tab: Tab): boolean {
      return lodash.findIndex(staticRoutes, (item: any) => item.path === tab.path) === -1;
    },

    isNotOpenedTab(tab: Tab): boolean {
      return this.tabIndexOf(tab) === -1;
    },

    convertRouteToTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab {
      return {
        name: route.name,
        path: route.path,
        meta: route.meta
      };
    },

    smartTab(route: RouteLocationNormalizedLoaded) {
      const tab = this.convertRouteToTab(route);
      const routeStore = useRouteStore();
      const isDetailRoute = routeStore.isDetailRoute(route);
      const isDetailRouteWithParameter = routeStore.hasParameter(route);
      if (isDetailRoute) {
        if (isDetailRouteWithParameter) {
          this.openTab(tab, true);
        } else {
          this.closeTab(tab);
          RouteUtils.goBack();
        }
      } else {
        this.openTab(tab, false);
      }
    },

    openTab(tab: Tab, isDetail = false): void {
      if (this.isNotStaticRoute(tab) && this.isNotOpenedTab(tab)) {
        if (isDetail) {
          this.tabs.splice(this.activatedTabIndex + 1, 0, tab);
        } else {
          this.tabs.push(tab);
        }
      }
      this.setActivatedTab(tab);
    },

    setActivatedTab(tab: Tab): void {
      nextTick(() => {
        this.activatedTab = tab;
        this.activatedTabName = tab.name;
        this.activatedTabIndex = this.tabIndexOf(tab);
        const isPush = true
        RouteUtils.to(tab, isPush)
      });
    },

    setActivatedTabByIndex(index: number): void {
      const tab = this.tabs[index]
      this.setActivatedTab(tab)
    },

    setFirstAsActivatedTab(): void {
      this.setActivatedTabByIndex(0)
    },

    setLastAsActivatedTab(): void {
      this.setActivatedTabByIndex(this.tabs.length-1)
    },

    deleteTab(route: RouteLocationNormalizedLoaded) {
      const tab = this.convertRouteToTab(route);
      this.closeTab(tab);
    },

    closeTab(tab: Tab): void {
      const isActivatedTab = tab.name === this.activatedTabName
      const theLeftTabIndex = this.tabIndexOf(tab) -1;
      lodash.remove(this.tabs, (item: any) => item.name === tab.name)
      if (isActivatedTab) this.setActivatedTabByIndex(theLeftTabIndex)
    },

    closeOtherTabs(): void {
      lodash.remove(this.tabs, (item: any) => {
        return item.name !== this.activatedTab.name && !this.isLocked(item);
      });
    },

    closeLeftTabs(): void {
      lodash.remove(this.tabs, (item: any, index: any) => {
        return index < this.activatedTabIndex && !this.isLocked(item);
      });
    },

    closeRightTabs(): void {
      lodash.remove(this.tabs, (item: any, index: any) => {
        return index > this.activatedTabIndex && !this.isLocked(item);
      });
    },

    closeAllTabs(): void {
      lodash.remove(this.tabs, (item: any) => {
        return !this.isLocked(item);
      });
      this.setFirstAsActivatedTab()
    },

    refreshCurrent(): void {
      const appStore = useApplicationStore();
      appStore.reloadCurrentRoute();
    },
  },

  persist: true
});
