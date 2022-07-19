import { ModuleNamespace } from 'vite/types/hot';
import type { RouteRecordRaw, RouteMeta, Router } from 'vue-router';
import type { RemoteRoute } from '/@/lib/declarations';

import { useRouteStore } from '/@/stores';
import { useSecurityApi } from '/@/apis';
import { lodash } from '/@/lib/utils';

const routeModules = import.meta.glob('../modules/**/*.ts', { eager: true });
const vueModules = import.meta.glob('../../views/**/*.vue');

/**
 * 将后端返回的路由 JSON 转换为前端可识别的格式，主要解决 vite 环境下，component 的 import 问题
 * @param dataimport { ModuleNamespace } from 'vite/types/hot';
import default from './../../../vite.config';

 * @returns
 */
const convert = (data: Array<RemoteRoute>): Array<RouteRecordRaw> => {
	const modules = vueModules as ModuleNamespace;
	return data.map((item: RemoteRoute) => {
		const raw = {} as RouteRecordRaw;
		raw.path = item.name;
		raw.component = modules[`../../${item.componentPath}`];
		if (item.componentName) {
			raw.name = item.componentName;
		}
		if (item.redirect) {
			raw.redirect = item.redirect;
		}

		raw.meta = {} as RouteMeta;
		raw.meta['icon'] = item.meta.icon;
		raw.meta['title'] = item.meta.title;

		if (item.meta.sort) {
			raw.meta['sort'] = item.meta.sort;
		}
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
		if (item.roles) {
			raw.meta['roles'] = item.roles;
		}
		if (!lodash.isEmpty(item.children)) {
			raw.children = convert(item.children as Array<RemoteRoute>);
		}

		return raw;
	});
};

const getRoutesFromServer = () => {
	const api = useSecurityApi();
	return api.element.fetchTree();
};

const getRoutesFromLocal = () => {
	const routes: Array<RouteRecordRaw> = [];
	const modules = routeModules as ModuleNamespace;
	Object.keys(modules).forEach((key) => {
		const item = modules[key];
		const module = item.default || {};
		const list = Array.isArray(module) ? [...module] : [module];
		routes.push(...list);
	});
	return routes;
};

const sortor = (a: RouteRecordRaw, b: RouteRecordRaw): number => {
	const aValue = a.meta?.sort || 0;
	const bValue = b.meta?.sort || 0;
	return (aValue as number) - (bValue as number);
};

export const dynamicAddRoutes = (router: Router, routes: Array<RouteRecordRaw>) => {
	routes.forEach((item) => {
		router.addRoute(item as RouteRecordRaw);
	});
	console.log('[Herodotus] |- Dynamic routes add success!');
};

export const reloadDynamicRoutes = (router: Router) => {
	const store = useRouteStore();
	dynamicAddRoutes(router, store.routes);
	console.log('[Herodotus] |- Dynamic routes reload success!');
};

export const addRoutes = (router: Router, routes: Array<RouteRecordRaw>) => {
	const store = useRouteStore();

	console.log('[Herodotus] |- Begin add dynamic routes');

	if (!lodash.isEmpty(routes)) {
		routes.sort(sortor);
		store.addDynamicRoutes(routes);
		dynamicAddRoutes(router, routes);
	} else {
		console.warn('[Herodotus] |- Dynamic routes is empty, skip!');
	}
};

export const initBackEndRoutes = async (router: Router) => {
	const response = await getRoutesFromServer();
	const routeData = response.data as Array<RemoteRoute>;
	// 将后端路由数据转换为前端可识别路由格式
	const routes = convert(routeData);
	addRoutes(router, routes);
};

export const initFrontEndRoutes = async (router: Router) => {
	const routes = getRoutesFromLocal();
	addRoutes(router, routes);
};
