import { defineStore } from 'pinia';

import { useRouteStore } from './route';
import { lodash, RouteUtils } from '/@/lib/utils';
import { staticRoutes } from '/@/routers/logic';

import type { RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordNormalized } from 'vue-router';
import type { Tab } from '/@/lib/declarations';

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
	}),

	getters: {
		isNotLastTab: (state) => {
			return (index: number) => state.tabs.length - 1 !== index;
		},

		getLastTabIndex: (state) => {
			return state.tabs.length - 1;
		},

		getTabIndex: (state) => {
			return (tab: Tab) => lodash.findIndex(state.tabs, (item) => item.name === tab.name);
		},

		getActivatedTabIndex(): number {
			return this.getTabIndex(this.activatedTab);
		},

		/**
		 * 最后一个Tab是否为激活状态
		 */
		isLastTabActivated(): boolean {
			const activatedTabIndex = this.getActivatedTabIndex;
			return activatedTabIndex === this.getLastTabIndex;
		},

		isFirstTabActivated(): boolean {
			const activatedTabIndex = this.getActivatedTabIndex;
			return activatedTabIndex === 0;
		},

		disableCloseCurrentTab(): boolean {
			return this.isLastTabActivated || this.isFirstTabActivated;
		},

		disableCloseLeftTabs(): boolean {
			return this.isFirstTabActivated;
		},

		disableCloseRightTabs(): boolean {
			return this.isLastTabActivated;
		},

		disableRefreshCurrentTab() {
			if (this.activatedTab.meta) {
				if (this.activatedTab.meta.isDetailContent) {
					return true;
				}
			}
			return false;
		},
	},

	actions: {
		convertRouteToTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab {
			return {
				name: route.name,
				path: route.path,
				meta: route.meta,
			};
		},

		setActivatedTab(tab: Tab): void {
			nextTick(() => {
				this.activatedTab = tab;
				this.activatedTabName = tab.name;
			});
		},

		isNotExistInStaticRoute(tab: Tab): boolean {
			return lodash.findIndex(staticRoutes, (item) => item.path === tab.path) === -1;
		},

		isTabNotOpened(tab: Tab): boolean {
			return this.getTabIndex(tab) === -1;
		},

		openTab(tab: Tab, isDetail = false): void {
			if (this.isNotExistInStaticRoute(tab)) {
				if (this.isTabNotOpened(tab)) {
					if (isDetail) {
						if (this.isLastTabActivated) {
							this.tabs.splice(this.getActivatedTabIndex, 0, tab);
						} else {
							this.tabs.splice(this.getActivatedTabIndex + 1, 0, tab);
						}
					} else {
						this.tabs.push(tab);
					}
				}
				this.setActivatedTab(tab);
			}
		},

		closeTab(tab: Tab): void {
			lodash.remove(this.tabs, (item) => {
				return item.name === tab.name;
			});
		},

		smartTab(route: RouteLocationNormalizedLoaded) {
			const store = useRouteStore();
			const isDetailRoute = store.isDetailRoute(route);

			const tab = this.convertRouteToTab(route);

			if (isDetailRoute) {
				if (store.hasParameter(route)) {
					this.openTab(tab, isDetailRoute);
				} else {
					this.closeTab(tab);
					RouteUtils.goBack();
				}
			} else {
				this.openTab(tab, isDetailRoute);
			}
		},

		deleteTab(route: RouteLocationNormalizedLoaded) {
			const tab = this.convertRouteToTab(route);
			this.closeTab(tab);
		},

		closeCurrentTab(): void {
			this.closeTab(this.activatedTab);
		},

		closeOtherTabs(): void {
			lodash.remove(this.tabs, (item) => {
				return item.name !== this.activatedTab.name;
			});
		},

		closeLeftTabs(): void {
			const activatedTabIndex = this.getActivatedTabIndex;
			lodash.remove(this.tabs, (item, index) => {
				return index < activatedTabIndex;
			});
		},

		closeRightTabs(): void {
			const activatedTabIndex = this.getActivatedTabIndex;
			lodash.remove(this.tabs, (item, index) => {
				return index > activatedTabIndex;
			});
		},
	},
	persist: true,
});
