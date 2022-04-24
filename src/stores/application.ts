import { defineStore } from 'pinia';

export const useApplicationStore = defineStore('Application', {
	state: () => ({
		// 左侧菜单面板显示控制
		asideDrawer: true,
		// 右侧设置面板显示控制
		settingsDrawer: false,
	}),
});
