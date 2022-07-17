import { ModuleNamespace } from 'vite/types/hot';
import type { RouteRecordRaw, RouteComponent, RouteMeta } from 'vue-router';
import type { SysElement, RemoteRoute } from '/@/lib/declarations';

import { useSecurityApi } from '/@/apis';
import { lodash } from '/@/lib/utils';

const routeModules = import.meta.glob('../modules/**/*.ts', { eager: true });
const vueModules = import.meta.glob('../../views/**/*.vue', { eager: true });

abstract class AbstractRoute {
	protected sortRoute(a: RouteRecordRaw, b: RouteRecordRaw): number {
		const aValue = a.meta?.sort || 0;
		const bValue = b.meta?.sort || 0;
		return (aValue as number) - (bValue as number);
	}
}

class LocalRoute extends AbstractRoute {
	private modules = {} as ModuleNamespace;
	private routes: Array<RouteRecordRaw> = [];

	public constructor(modules: ModuleNamespace) {
		super();
		this.modules = modules;
		this.init();
	}

	private init(): void {
		if (this.modules) {
			Object.keys(this.modules).forEach((key) => {
				const item = this.modules[key];
				const module = item.default || {};
				const list = Array.isArray(module) ? [...module] : [module];
				this.routes.push(...list);
			});
		}
	}

	public getRoutes(): Array<RouteRecordRaw> {
		if (this.routes) {
			return this.routes.sort(this.sortRoute);
		} else {
			return [];
		}
	}
}

class ServerRoute extends AbstractRoute {
	private modules = {} as ModuleNamespace;
	private routes: Array<RouteRecordRaw> = [];

	public constructor(modules: ModuleNamespace) {
		super();
		this.modules = modules;
		this.init();
	}

	public getRoutes(): Array<RouteRecordRaw> {
		if (this.routes) {
			return this.routes.sort(this.sortRoute);
		} else {
			return [];
		}
	}

	private async init() {
		const api = useSecurityApi();
		const result = await api.element.fetchTree();
		const data = result.data as Array<RemoteRoute>;
		this.routes = this.convert(data);
	}

	private convert(data: Array<RemoteRoute>): Array<RouteRecordRaw> {
		return data.map((item: RemoteRoute) => {
			const raw = {} as RouteRecordRaw;
			raw.path = item.name;
			raw.component = this.modules[`../../${item.componentPath}`] as RouteComponent;
			if (item.componentName) {
				raw.name = item.componentName;
			}
			if (item.redirect) {
				raw.redirect = item.redirect;
			}

			raw.meta = {} as RouteMeta;
			raw.meta['icon'] = item.meta.icon;
			raw.meta['title'] = item.meta.title;
			if (item.meta.isHaveChild) {
				raw.meta['isHaveChild'] = item.meta.isHaveChild;
			}
			if (item.meta.isNotKeepAlive) {
				raw.meta['isNotKeepAlive'] = item.meta.isNotKeepAlive;
			}
			if (item.meta.isHideAllChild) {
				raw.meta['isHideAllChild'] = item.meta.isHideAllChild;
			}
			if (item.meta.isDetailContent) {
				raw.meta['isDetailContent'] = item.meta.isDetailContent;
			}
			if (item.meta.isIgnoreAuth) {
				raw.meta['isIgnoreAuth'] = item.meta.isIgnoreAuth;
			}
			if (item.meta.roles) {
				raw.meta['roles'] = item.meta.roles;
			}
			if (!lodash.isEmpty(item.children)) {
				raw.children = this.convert(item.children as Array<RemoteRoute>);
			}

			return raw;
		});
	}
}

/**
 * 读取 router modules 目录中所有的路由配置，并将其合并为一个统一的路由对象
 */
export const getDynamicRoutes = (): Array<RouteRecordRaw> => {
	const localRoute = new LocalRoute(routeModules as ModuleNamespace);
	const remoteRoute = new ServerRoute(vueModules as ModuleNamespace);
	console.log('remoteRoute', remoteRoute);
	return localRoute.getRoutes();
};
