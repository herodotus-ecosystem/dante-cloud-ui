import type { Router, RouteLocationRaw, RouteRecordName, RouteRecordNormalized, RouteLocationNormalizedLoaded } from 'vue-router';
import type { Tab } from '/@/lib/declarations';

import { lodash, Swal } from '/@/lib/utils';
import { Path } from '/@/lib/enums';
import router from '/@/routers';

class TabsUtilities {
	private static instance = new TabsUtilities();

	private constructor() {}

	public static getInstance(): TabsUtilities {
		return this.instance;
	}

	private findIndexByName(tabs: Tab[], name: string): number {
		return lodash.findIndex(tabs, (tab) => tab.name === name);
	}

	public getTabIndex(tabs: Tab[], route: RouteLocationNormalizedLoaded): number {
		return this.findIndexByName(tabs, route.name as string);
	}

	public isTabExist(tabs: Tab[], route: RouteLocationNormalizedLoaded): boolean {
		return this.getTabIndex(tabs, route) !== -1;
	}

	public isTabNotExist(tabs: Tab[], route: RouteLocationNormalizedLoaded): boolean {
		return !this.isTabExist(tabs, route);
	}

	public isValidTab(route: RouteLocationNormalizedLoaded): boolean {
		if (route.meta.isDetailContent) {
			if (lodash.isEmpty(route.params) && lodash.isEmpty(route.query)) {
				return false;
			}
		}

		return true;
	}

	public deleteTab(tabs: Tab[], tab: Tab): void {
		lodash.remove(tabs, (item) => {
			return item.name === tab.name;
		});
	}

	/**
	 * 当前要删除的Tag是激活状态，设置删除该Tag后新的激活Tag
	 *
	 * 1. 如果当前激活的Tag是列表中第一个，那么激活其右侧Tag， 此时 isLeft 参数无效
	 * 2. 如果当前激活的Tag是列表中最后一个，那么激活其左侧Tag，此时 isLeft 参数无效
	 * 3. 除了以上两种情况外，会根据 isLeft 参数决定是激活左侧 Tag 还是右侧 Tag。注意：此种情况需要页面配合，即页面中只有一个 Tag 时，不能进行删除操作。
	 * @param tabs 标签列表
	 * @param tab 当前要删除的标签
	 * @param isLeft true 激活当前删除标签的左侧标签，false 激活当前删除标签的左侧标签
	 * @returns
	 */
	public getNewActivateTab(tabs: Tab[], tab: Tab, isLeft: boolean): Tab {
		const index = this.findIndexByName(tabs, tab.name as string);
		const firstTabIndex = 0;
		const lastTabIndex = tabs.length - 1;

		if (index === firstTabIndex) {
			return tabs[index + 1];
		}

		if (index === lastTabIndex) {
			return tabs[index - 1];
		}

		if (isLeft) {
			return tabs[index - 1];
		} else {
			return tabs[index + 1];
		}
	}

	public getTabByRoute(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab {
		return {
			name: route.name,
			path: route.path,
			meta: route.meta,
		};
	}
}

class RouteUtilities {
	private static instance = new RouteUtilities();

	private router: Router;

	private constructor() {
		this.router = router;
	}

	public static getInstance(): RouteUtilities {
		return this.instance;
	}

	public hasParameter(route: RouteLocationNormalizedLoaded): boolean {
		return !lodash.isEmpty(route.params) || !lodash.isEmpty(route.query);
	}

	public isDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
		if (route.meta) {
			if (route.meta.isDetailContent) {
				return true;
			}
		}
		return false;
	}

	public isValidDetailRoute(route: RouteLocationNormalizedLoaded): boolean {
		return this.isDetailRoute(route) && this.hasParameter(route);
	}

	/**
	 * 路由跳转
	 * @param to - 需要跳转的路由
	 * @param isNewTab - 是否在新的浏览器Tab标签打开
	 */
	public to(to: RouteLocationRaw, isNewTab = false): void {
		if (isNewTab) {
			const route = this.router.resolve(to);
			window.open(route.href, '_blank');
		} else {
			console.log(to);
			console.log(this.router.getRoutes());
			this.router.replace(to);
		}
	}

	/**
	 * 返回上一级路由
	 *
	 */
	public goBack(): void {
		this.router.go(-1);
	}

	public toRoot(): void {
		this.to({ path: Path.ROOT }, false);
	}

	/**
	 * 跳转首页
	 */
	public toHome(): void {
		this.to({ name: Path.HOME_NAME }, false);
	}

	public toSignIn() {
		this.to({ name: 'SignIn' }, false);
	}
}

export const TabsUtils: TabsUtilities = TabsUtilities.getInstance();
export const RouteUtils: RouteUtilities = RouteUtilities.getInstance();
