import { ThemeModeEnum } from '/@/lib/enums';

export interface Theme {
  mode: ThemeModeEnum;
  primary: string;
}

export interface GlobalSetting {
  theme: Theme;
}
