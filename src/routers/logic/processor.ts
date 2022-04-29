import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

export class RouteParser {
	private routes: Array<RouteRecordRaw>;
	private menuItems: Array<MenuItem>;
	private keepAliveComponents: Array<string> = [];
	private detailComponents: Map<string, any> = new Map();

	public constructor(routes: Array<RouteRecordRaw>) {
		this.routes = routes;
		this.menuItems = this.execute();
	}

	public getDetailComponents(): Map<string, any> {
		return this.detailComponents;
	}

	public getMenuItems(): Array<MenuItem> {
		return this.menuItems;
	}

	public getKeepAliveComponents(): Array<string> {
		return this.keepAliveComponents;
	}

	private execute(): Array<MenuItem> {
		return this.routes.map((item) => {
			const title = item.meta?.title as string;
			const icon = item.meta?.icon as string;
			return {
				title: title,
				prependIcon: icon,
				value: title,
				$children: this.generateSubItems(item),
			};
		});
	}

	private generateSubItems(items: RouteRecordRaw): Array<MenuItem> {
		const children: Array<RouteRecordRaw> = items.children || [];
		if (!lodash.isEmpty(children)) {
			const result: Array<MenuItem> = [];
			children.forEach((child) => {
				const name = child.name as string;
				if (name) {
					this.keepAliveComponents.push(name);
				}

				if (lodash.isEmpty(child.children)) {
					const isDetailContent = child.meta?.isDetailContent;
					if (!isDetailContent) {
						result.push({
							title: child.meta?.title,
							to: child.path,
							prependIcon: child.meta?.icon,
						});
					} else {
						const componentName = child.name as string;
						if (componentName) {
							this.detailComponents.set(componentName, child.component);
						}
					}
				} else {
					const $children = this.generateSubItems(child);
					if (lodash.isEmpty($children)) {
						result.push({
							title: child.meta?.title,
							prependIcon: child.meta?.icon,
							to: child.path,
						});
					} else {
						result.push({
							title: child.meta?.title,
							prependIcon: child.meta?.icon,
							$children: $children,
						});
					}
				}
			});
			return result;
		} else {
			return [];
		}
	}
}
