import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';
import type { Tab } from '/@/lib/declarations';

import { defineStore } from 'pinia';

import { staticRoutes } from '/@/routers/logic';
import { useSettingsStore } from './settings';
import { lodash, TabsUtils, RouteUtils } from '/@/lib/utils';

export const useTabsStore = defineStore('Tabs', {
	state: () => ({
		tabs: [] as Array<Tab>,
		activatedTab: '' as RouteRecordName | undefined | null,
	}),

	getters: {
		isActivateTab: (state) => {
			return (tab: Tab) => state.activatedTab === tab.name;
		},
		isNotExcluded: () => {
			return (route: RouteLocationNormalizedLoaded) => lodash.findIndex(staticRoutes, (item) => item.path === route.path) === -1;
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
				console.log(RouteUtils.hasParameter(route));
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

		setActivatedTab(tab: Tab): void {
			this.activatedTab = tab.name;
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
	},
	persist: true,
});
