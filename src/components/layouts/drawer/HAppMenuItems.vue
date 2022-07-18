<template>
	<div v-for="(item, index) in items" :key="index">
		<template v-if="hasPermission(item)">
			<q-expansion-item
				v-if="isDisplayAsItem(item)"
				:label="getItemTitle(item)"
				:icon="getItemIcon(item)"
				:to="item.path"
				:header-inset-level="level"
				expand-separator
				expand-icon="1"
			></q-expansion-item>
			<q-expansion-item
				v-else
				:label="getItemTitle(item)"
				:icon="getItemIcon(item)"
				:header-inset-level="level"
				:header-class="isActive($route, item) ? 'expansion-item--active' : ''"
				:model-value="isActive($route, item)"
				expand-separator
			>
				<h-app-menu-items :items="getItemChildren(item)" :level="level + 0.5"></h-app-menu-items>
			</q-expansion-item>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

import { useRouteStore, useAuthenticationStore } from '/@/stores';
import { lodash } from '/@/lib/utils';

export default defineComponent({
	name: 'HAppMenuItems',

	props: {
		items: { type: Array as PropType<Array<RouteRecordRaw>>, required: true },
		level: { type: Number, required: true },
	},

	setup(props) {
		const route = useRouteStore();
		const authentication = useAuthenticationStore();

		const getItemTitle = (item: RouteRecordRaw): string => {
			return item.meta?.title as string;
		};

		const getItemIcon = (item: RouteRecordRaw): string => {
			return item.meta?.icon as string;
		};

		const getItemHideAllChild = (item: RouteRecordRaw): boolean => {
			return item.meta?.isHideAllChild as boolean;
		};

		const getItemChildren = (item: RouteRecordRaw): Array<RouteRecordRaw> => {
			return item.children as Array<RouteRecordRaw>;
		};

		const hasChidren = (item: RouteRecordRaw): boolean => {
			return getItemChildren(item) ? true : false;
		};

		const hasPermission = (item: RouteRecordRaw): boolean => {
			const userRoles = authentication.roles;
			const routeRoles = item.meta?.roles as Array<string>;

			// 如果路由中没有设置任何角色，则认为所有人都有权限
			if (lodash.isEmpty(routeRoles)) {
				return true;
			}

			// 路由中有角色设置，但用户角色为空，则认为没有权限
			if (lodash.isEmpty(userRoles)) {
				return false;
			}

			// 当前两边角色都不为空
			// 取两者交集，如果交集为空，则认为没有权限，如果存在交集，责任为有权限
			const result = lodash.intersection(userRoles, routeRoles);
			if (lodash.isEmpty(result)) {
				return false;
			} else {
				return true;
			}
		};

		const isDisplayAsItem = (item: RouteRecordRaw): boolean => {
			if (!hasChidren(item)) {
				return true;
			} else {
				if (getItemHideAllChild(item)) {
					// 代码逻辑实际上放在此处不合适，只是为了减少路由的遍历
					route.addDetailRoutes(item);
					return true;
				} else {
					return false;
				}
			}
		};

		const headerClass = ref('');

		const isActive = (route: RouteLocationNormalizedLoaded, item: RouteRecordRaw) => {
			return route.matched[0].path === item.path;
		};

		return {
			isDisplayAsItem,
			getItemIcon,
			getItemTitle,
			getItemChildren,
			headerClass,
			isActive,
			hasPermission,
		};
	},
});
</script>

<style lang="scss">
.q-item__section--avatar {
	color: inherit;
	min-width: 0;
}

.expansion-item--active {
	color: var(--q-primary);
}
</style>
