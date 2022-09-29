import { defineStore } from 'pinia';

import type { GlobalSetting } from '/@/lib/declarations';
import { ThemeModeEnum } from '/@/lib/enums';

/**
 * Pinia 响应式：
 * 1. Pinia中state中的数据仅仅在useStore.attr(attr为state中定义的属性)这种方式引用时才具备响应式
 * 2. Pinia中getter是响应式
 * 3. Pinia中通过storeToRefs进行解构是响应式
 *
 * Pinia 非响应式
 * 1. 解构赋值和单独声明将失去响应式，例如：let {count ,number}=appStore 或 let count =appStore.count
 */
export const useSettingsStore = defineStore('GlobalSettings', {
  state: (): GlobalSetting => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum.LIGHT,
      // 默认 primary 主题颜色
      primary: '#1867c0'
    }
  }),

  getters: {
    isDark: state => state.theme.mode === ThemeModeEnum.DARK,

    isLight: state => state.theme.mode === ThemeModeEnum.LIGHT,

    isSystem: state => state.theme.mode === ThemeModeEnum.SYSTEM,

    getThemePrimary: state => state.theme.primary
  }
});
