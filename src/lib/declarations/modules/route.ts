import { RouteLocationNormalizedLoaded } from 'vue-router';

export interface MenuItem {
	title: string | unknown;
	prependIcon: string | unknown;
	to?: string;
	value?: string;
	$children?: MenuItem[];
}

export interface Tab extends Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> {}
