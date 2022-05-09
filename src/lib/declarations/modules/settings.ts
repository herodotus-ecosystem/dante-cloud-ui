import { ThemeMode, LayoutMode } from '/@/lib/enums';

export interface Theme {
	mode: ThemeMode;
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
	layout: LayoutMode;
	effect: Effect;
	display: Display;
}
