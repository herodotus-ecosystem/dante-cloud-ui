import { computed } from 'vue';

import type { HttpMethodStyleAttribute, HttpMethod } from '/@/lib/declarations';

import { httpMethodStyles, defaultHttpMethodStyle } from '/@/settings';

export default function useHttpMethodStyle() {
	const switcher = (method: HttpMethod, property: string): string => {
		const switcher: HttpMethodStyleAttribute = httpMethodStyles[method];
		if (switcher) {
			return switcher[property];
		} else {
			return defaultHttpMethodStyle[property];
		}
	};

	const color = computed(() => (method: HttpMethod) => {
		return switcher(method, 'color');
	});

	const icon = computed(() => (method: HttpMethod) => {
		return switcher(method, 'icon');
	});

	return {
		color,
		icon,
	};
}
