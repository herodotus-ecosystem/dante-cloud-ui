import { ThemeModeEnum, LayoutModeEnum } from '/@/lib/enums';

import { TableSeparator } from './quasar';

export interface Theme {
	mode: ThemeModeEnum;
	primary: string;
}

export interface Effect {
	isUniqueOpened: boolean;
}

export interface TableDisplay {
	separator: TableSeparator;
	dense: boolean;
}

export interface Display {
	isTabsView: boolean;
	isActivateLeftTab: boolean;
	table: TableDisplay;
}

export interface GlobalSetting {
	theme: Theme;
	layout: LayoutModeEnum;
	effect: Effect;
	display: Display;
}
