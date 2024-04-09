import { defineStore } from 'pinia';

/**
 * Pinia Store 响应式
 *
 * 1. 直接访问使用 state 中的属性，例如：useStore.attr方式，就是响应式
 * 2. 使用 storeToRefs 包裹后，进行解构会具备响应式
 * 3. 使用 {XXX，XXX} = useStore，会丢失响应式
 */
export const useApplicationStore = defineStore('Application', {
  state: () => ({
    // 左侧菜单面板显示控制
    leftDrawer: true,
    // 右侧设置面板显示控制
    rightDrawer: false,
    // 登录页面面板
    signInPanel: 'account',
    // for App.vue - <router-view>
    isRouterAlive: true
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
    reloadCurrentRoute() {
      this.isRouterAlive = false;
      nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
});
