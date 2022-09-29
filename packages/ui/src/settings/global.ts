import type { GlobalSetting } from '/@/lib/declarations';
import { ThemeModeEnum } from '/@/lib/enums';

export const DefaultGlobalSetting: GlobalSetting = {
  /**
   * 全局主题
   */
  theme: {
    mode: ThemeModeEnum.LIGHT,
    // 默认 primary 主题颜色
    primary: '#1867c0'
  }
};
