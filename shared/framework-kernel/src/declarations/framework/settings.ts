import { ThemeModeEnum, LayoutModeEnum } from '../enums';

export interface Theme {
  mode: ThemeModeEnum;
  isMixed: boolean;
  primary: string;
}

export interface Effect {
  isUniqueOpened: boolean;
}

export interface TableDisplay {
  dense: boolean;
}

export interface Display {
  isTabsView: boolean;
  isActivateLeftTab: boolean;
  showBreadcrumbs: boolean;
  showBreadcrumbsIcon: boolean;
  table: TableDisplay;
}

export interface GlobalSetting {
  theme: Theme;
  layout: LayoutModeEnum;
  effect: Effect;
  display: Display;
}
