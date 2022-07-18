import type { Router, RouteLocationRaw, RouteLocationNormalizedLoaded } from 'vue-router';

import { lodash } from '../base';
import { PathEnum } from '/@/lib/enums';

class RouteUtilities {
	private static instance = new RouteUtilities();

	private router: Router = {} as Router;

	private constructor() {}

	public static getInstance(): RouteUtilities {
		return this.instance;
	}

	public setRouter(router: Router): void {
		this.router = router;
	}

	public getRouter(): Router {
		return this.router;
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
	public to(to: RouteLocationRaw, isNewTab = false, isPush = false): void {
		if (isNewTab) {
			const route = this.router.resolve(to);
			window.open(route.href, '_blank');
		} else {
			if (isPush) {
				this.router.push(to);
			} else {
				this.router.replace(to);
			}
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
		this.to({ path: PathEnum.ROOT }, false);
	}

	/**
	 * 跳转首页
	 */
	public toHome(): void {
		this.to({ name: PathEnum.HOME_NAME }, false);
	}

	public toSignIn() {
		this.to({ name: 'SignIn' }, false);
	}

	private getParent(path: string): string {
		const array = lodash.split(path, '/');
		const result = lodash.dropRight(array);
		return lodash.join(result, '/');
	}

	public toPrev(route: RouteLocationNormalizedLoaded): void {
		if (route.path) {
			const destination = this.getParent(route.path);
			this.to({ path: destination });
		} else {
			this.goBack();
		}
	}
}

export const RouteUtils: RouteUtilities = RouteUtilities.getInstance();
