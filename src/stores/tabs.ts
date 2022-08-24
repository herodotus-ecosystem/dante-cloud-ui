import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';
import type { Tab } from '/@/lib/declarations';

import { defineStore } from 'pinia';

import { staticRoutes } from '/@/routers/logic';
import { useSettingsStore } from './settings';
import { lodash, TabsUtils, RouteUtils } from '/@/lib/utils';

export const useTabsStore = defineStore('Tabs', {
	state: () => ({
		tabs: [] as Array<Tab>,
		activatedTab: {} as Tab,
	}),

	getters: {
		isActivateTab: (state) => {
			return (tab: Tab) => state.activatedTab.name === tab.name;
		},
		isNotExcluded: () => {
			return (route: RouteLocationNormalizedLoaded) => lodash.findIndex(staticRoutes, (item) => item.path === route.path) === -1;
		},
		currentTabName: (state) => {
			return state.activatedTab.name as string | number | null | undefined;
		},
	},

	actions: {
		addTab(route: RouteLocationNormalizedLoaded): void {
			if (this.isNotExcluded(route)) {
				if (TabsUtils.isTabNotExist(this.tabs, route)) {
					this.tabs.push(TabsUtils.getTabByRoute(route));
				}
				this.setActivatedTab(route);
			}
		},

		smartTab(route: RouteLocationNormalizedLoaded) {
			const isDetailRoute = RouteUtils.isDetailRoute(route);

			if (isDetailRoute) {
				if (RouteUtils.hasParameter(route)) {
					this.addTab(route);
				} else {
					this.closeTab(TabsUtils.getTabByRoute(route));
				}
			} else {
				this.addTab(route);
			}
		},

		switchTab(tab: Tab): void {
			RouteUtils.to(tab);
		},

		setActivatedTab(route: RouteLocationNormalizedLoaded): void {
			const tab = TabsUtils.getTabByRoute(route);
			nextTick(() => {
				this.activatedTab = tab;
			});
		},

		deleteTab(tab: Tab) {
			TabsUtils.deleteTab(this.tabs, tab);
		},

		closeTab(tab: Tab): void {
			const settings = useSettingsStore();

			if (this.isActivateTab(tab)) {
				const newActivateTab = TabsUtils.getNewActivateTab(this.tabs, tab, settings.display.isActivateLeftTab);
				this.deleteTab(tab);
				this.switchTab(newActivateTab);
			} else {
				this.deleteTab(tab);
			}
		},

		closeCurrentTab(): void {
			this.closeTab(this.activatedTab);
		},

		closeOtherTabs(): void {
			TabsUtils.deleteOtherTabs(this.tabs, this.activatedTab);
		},
	},
	persist: true,
});
