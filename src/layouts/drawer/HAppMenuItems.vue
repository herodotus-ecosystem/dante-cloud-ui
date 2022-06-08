<template>
	<div v-for="(item, index) in items" :key="index">
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
			expand-separator
			:header-class="isActive($route, item) ? 'expansion-item--active' : ''"
			:model-value="isActive($route, item)"
		>
			<h-app-menu-items :items="getItemChildren(item)" :level="level + 0.5"></h-app-menu-items>
		</q-expansion-item>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

export default defineComponent({
	name: 'HAppMenuItems',

	props: {
		items: { type: Array as PropType<Array<RouteRecordRaw>>, required: true },
		level: { type: Number, required: true },
	},

	setup(props) {
		const getItemTitle = (item: RouteRecordRaw): string => {
			return item.meta?.title as string;
		};

		const getItemIcon = (item: RouteRecordRaw): string => {
			return item.meta?.icon as string;
		};

		const getItemHideAllChild = (item: RouteRecordRaw): boolean => {
			return item.meta?.hideAllChild as boolean;
		};

		const getItemChildren = (item: RouteRecordRaw): Array<RouteRecordRaw> => {
			return item.children as Array<RouteRecordRaw>;
		};

		const hasChidren = (item: RouteRecordRaw): boolean => {
			return getItemChildren(item) ? true : false;
		};

		const isDisplayAsItem = (item: RouteRecordRaw): boolean => {
			if (!hasChidren(item)) {
				return true;
			} else {
				if (getItemHideAllChild(item)) {
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
		};
	},
});
</script>

<style lang="scss">
.q-item__section--avatar {
	color: inherit;
	min-width: 0;
}

.q-expansion-item__container {
	.q-item {
		border-radius: 0 32px 32px 0;
	}
}

.expansion-item--active {
	color: var(--q-primary);
}
</style>
