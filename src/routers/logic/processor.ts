import type { RouteRecordRaw } from 'vue-router';
import type { MenuItem } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

export class RouteParser {
	private routes: Array<RouteRecordRaw>;
	private menuItems: Array<MenuItem>;
	private keepAliveComponents: Array<string> = [];

	public constructor(routes: Array<RouteRecordRaw>) {
		this.routes = routes;
		this.menuItems = this.execute();
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
			return children
				.filter((child) => !child.meta?.isNotShowInMenu)
				.map((child) => {
					console.log(child);
					const name = child.name;
					console.log(name);
					if (name) {
						this.keepAliveComponents.push(child.name as string);
					}

					if (lodash.isEmpty(child.children)) {
						return {
							title: child.meta?.title,
							to: child.path,
							prependIcon: child.meta?.icon,
						};
					} else {
						const $children = this.generateSubItems(child);
						if (lodash.isEmpty($children)) {
							return {
								title: child.meta?.title,
								prependIcon: child.meta?.icon,
								to: child.path,
							};
						} else {
							return {
								title: child.meta?.title,
								prependIcon: child.meta?.icon,
								$children: $children,
							};
						}
					}
				});
		} else {
			return [];
		}
	}
}
