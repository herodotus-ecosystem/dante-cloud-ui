import { defineStore } from 'pinia';

export const useApplicationStore = defineStore('Application', {
	state: () => ({
		// 左侧菜单面板显示控制
		leftDrawer: true,
		// 右侧设置面板显示控制
		rightDrawer: false,
		// 登录页面面板
		signInPanel: 'account',
	}),

	actions: {
		switchToMobilePanel() {
			this.signInPanel = 'mobile';
		},
		switchToScanPanel() {
			this.signInPanel = 'scan';
		},
		switchToAccountPanel() {
			this.signInPanel = 'account';
		},
	},
});
