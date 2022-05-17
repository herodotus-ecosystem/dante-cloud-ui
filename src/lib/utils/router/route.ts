import type { Router, RouteLocationRaw, RouteLocationNormalizedLoaded } from 'vue-router';

import { lodash } from '/@/lib/utils';
import { Path } from '/@/lib/enums';
import router from '/@/routers';

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

export const RouteUtils: RouteUtilities = RouteUtilities.getInstance();
