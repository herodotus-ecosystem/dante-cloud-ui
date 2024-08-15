import type { RouteRecordRaw } from 'vue-router';

const routeModules = import.meta.glob('../modules/**/*.ts');

class LocalRoute {
	private modules: Record<string, Recordable> = {};
	private routes: Array<RouteRecordRaw> = [];

	public constructor(modules: Record<string, Recordable>) {
		this.modules = modules;
		this.init();
	}

	private init(): void {
		if (this.modules) {
			Object.keys(this.modules).forEach((key) => {
				const module = this.modules[key].default || {};
				const list = Array.isArray(module) ? [...module] : [module];
				this.routes.push(...list);
			});
		}
	}

	private sortRoute(a: RouteRecordRaw, b: RouteRecordRaw): number {
		const aValue = a.meta?.sort || 0;
		const bValue = b.meta?.sort || 0;
		return (aValue as number) - (bValue as number);
	}

	public getRoutes(): Array<RouteRecordRaw> {
		if (this.routes) {
			return this.routes.sort(this.sortRoute);
		} else {
			return [];
		}
	}
}

/**
 * 读取 router modules 目录中所有的路由配置，并将其合并为一个统一的路由对象
 */
export const getDynamicRoutes = (): Array<RouteRecordRaw> => {
	const localRoute = new LocalRoute(routeModules);
	return localRoute.getRoutes();
};
