export enum LayoutMode {
	DEFAULT = 'defaults',
	CLASSIC = 'classic',
	TRANSVERSE = 'transverse',
	COLUMNS = 'transverse',
}

export enum ThemeMode {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system',
}

export interface Theme {
	mode: ThemeMode;
}

export interface Effect {
	isUniqueOpened: boolean;
}

export interface GlobalSetting {
	theme: Theme;
	layout: LayoutMode;
	effect: Effect;
}
