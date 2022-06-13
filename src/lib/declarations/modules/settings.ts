import { ThemeModeEnum, LayoutModeEnum } from '/@/lib/enums';

export interface Theme {
	mode: ThemeModeEnum;
	primary: string;
}

export interface Effect {
	isUniqueOpened: boolean;
}

export interface Display {
	isTabsView: boolean;
	isActivateLeftTab: boolean;
}

export interface GlobalSetting {
	theme: Theme;
	layout: LayoutModeEnum;
	effect: Effect;
	display: Display;
}
