import { IN_BROWSER } from './globals';

export const getMatchMedia = () => {
	if (!IN_BROWSER) return;

	return window.matchMedia('(prefers-color-scheme: dark)');
};
