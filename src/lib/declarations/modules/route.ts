export interface MenuElement {
	$type?: string;
	text?: string;
}

export interface MenuItem {
	title?: string;
	to?: string;
	nav?: boolean;
	value?: string;
	prependIcon?: string;
	$children?: MenuItem[];
}

export type Menu = MenuItem | MenuElement;
