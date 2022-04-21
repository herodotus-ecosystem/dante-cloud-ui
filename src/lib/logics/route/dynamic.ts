import { RouteRecordRaw } from 'vue-router';

const routeModules = import.meta.globEager('../../../routers/modules/**/*.ts');
const pageModules = import.meta.globEager('../../../views/**/*.{vue,tsx}');

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
				console.log(key);
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

export const getDynamicRoutes = (): Array<RouteRecordRaw> => {
	const localRoute = new LocalRoute(routeModules);
	return localRoute.getRoutes();
};
