import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { lodash } from '/@/utils';
import { STATIC_ROUTES, DYNAMIC_ROUTES, SIGN_IN_PATH } from './Definition';

/**
 * 路由多级嵌套数组处理成一维数组
 * @param array 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
const flattenRoutes = (array: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
	if (!lodash.isEmpty(array)) {
		for (let i = 0; i < array.length; i++) {
			let children = array[i].children;
			if (children) {
				array = array.slice(0, i + 1).concat(children, array.slice(i + 1));
			}
		}
		return array;
	}

	return array;
};

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
const twoStageRoutes = (array: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
	if (!lodash.isEmpty(array)) {
		const root: Array<RouteRecordRaw> = lodash.filter(array, { path: '/' });

		console.log('root --', root);

		if (lodash.isEmpty(root)) {
			console.error("Can not find router for '/', please check route config.");
			return [];
		}

		let result: RouteRecordRaw = root[0] as RouteRecordRaw;

		const cached: Array<string> = [];

		array.forEach((item: RouteRecordRaw) => {
			if (item.path !== '/') {
				// 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
				// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
				if (item.path.indexOf('/:') > -1) {
					if (!item.meta) {
						item.meta = {};
					}
					item.meta['isDynamic'] = true;
					item.meta['isDynamicPath'] = item.path;
				}

				if (!result.children) {
					result.children = [];
				}
				if (!result.meta) {
					result.meta = {};
				}

				result.children.push(item);
				console.log('result --', result);

				// 存 name 值，keep-alive 中 include 使用，实现路由的缓存
				// 路径：/@/layout/routerView/parent.vue
				if (result.meta.isKeepAlive && item.meta?.isKeepAlive) {
					cached.push(item.name as string);
				}
			}
		});

		return [result];
	}

	return [];
};

const router = createRouter({
	history: createWebHashHistory(),
	routes: STATIC_ROUTES,
});

/**
 * 添加动态路由
 */

const transformedDynamicRoutes = (): Array<RouteRecordRaw> => {
	return twoStageRoutes(flattenRoutes(DYNAMIC_ROUTES));
};

export { router, transformedDynamicRoutes, SIGN_IN_PATH };
