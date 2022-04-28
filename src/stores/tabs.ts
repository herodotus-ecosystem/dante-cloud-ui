import type { RouteLocationNormalizedLoaded, RouteRecordName } from 'vue-router';
import type { Tab } from '/@/lib/declarations';

import { defineStore } from 'pinia';

import { TabsUtils, RouteUtils } from '/@/routers/logic';
import { useSettingsStore } from './settings';

export const useTabsStore = defineStore('Tabs', {
	state: () => ({
		tabs: [] as Array<Tab>,
		activatedTab: '' as RouteRecordName | undefined | null,
	}),

	getters: {
		isActivateTab: (state) => {
			return (tab: Tab) => state.activatedTab === tab.name;
		},
	},

	actions: {
		addTab(route: RouteLocationNormalizedLoaded): void {
			if (TabsUtils.isTabNotExist(this.tabs, route)) {
				this.tabs.push(TabsUtils.getTabByRoute(route));
			} else {
				this.setActivatedTab(route);
			}
		},

		switchTab(tab: Tab): void {
			RouteUtils.to(tab);
		},

		setActivatedTab(tab: Tab): void {
			this.activatedTab = tab.name;
		},

		closeTab(tab: Tab): void {
			const settings = useSettingsStore();

			if (this.isActivateTab(tab)) {
				const newActivateTab = TabsUtils.getNewActivateTab(this.tabs, tab, settings.display.isActivateLeftTab);
				this.switchTab(newActivateTab);
			}

			TabsUtils.deleteTab(this.tabs, tab);
		},
	},
	persist: true,
});
