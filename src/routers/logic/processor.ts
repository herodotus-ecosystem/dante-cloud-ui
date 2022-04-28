import type { RouteRecordRaw } from 'vue-router';

import { lodash } from '/@/lib/utils';

class KeepAliveRouteParser {
	private routes: Array<RouteRecordRaw>;
	private cachedRouteNames: string[] = [];

	public constructor(routes: Array<RouteRecordRaw>) {
		this.routes = routes;
		this.parse();
	}

	private parse(): void {
		this.routes.forEach((item) => {
			this.loop(item);
		});
	}

	private loop(route: RouteRecordRaw): any {
		const children: Array<RouteRecordRaw> = route.children || [];
		if (!lodash.isEmpty(children)) {
			children.forEach((child) => {
				if (child.meta?.isKeepAlive) {
					const name = child.name as string;
					if (name) {
						this.cachedRouteNames.push(name);
					}
				}

				if (!lodash.isEmpty(child.children)) {
					this.loop(child);
				}
			});
		}
	}

	public getCachedRouteNames(): string[] {
		return this.cachedRouteNames;
	}
}

export const getKeepAliveRoutes = (routes: Array<RouteRecordRaw>): Array<string> => {
	const keepAliveRouteParser = new KeepAliveRouteParser(routes);
	return keepAliveRouteParser.getCachedRouteNames();
};
