<template>
	<v-list
		v-model:active="active"
		:open-strategy="openStrategy"
		density="comfortable"
		:nav="nav"
		:items="displayItems"
		color="blue lighten-2"
	></v-list>
</template>

<script lang="ts">
import type { RouteRecordRaw } from 'vue-router';

import { defineComponent, ref, computed } from 'vue';

import { lodash } from '/@/lib/utils';
import { useSettingsStore, useRouteStore } from '/@/stores';

export default defineComponent({
	name: 'HAppAsideMenu',

	components: {},

	props: {
		nav: Boolean,
	},

	setup(props) {
		const settings = useSettingsStore();
		const routes = useRouteStore();

		const active = ref<string[]>([]);
		const opened = ref<string[]>([]);

		const displayItems = routes.menuItems;

		// const displayItems = computed(() =>
		// 	props.items?.map((item) => {
		// 		const meta = item.meta;
		// 		const title = meta?.title;
		// 		const icon = meta?.icon;
		// 		const activeIcon = icon;
		// 		const inactiveIcon = icon;

		// 		return {
		// 			title: title,
		// 			prependIcon: opened.value.includes(title as string) ? activeIcon : inactiveIcon,
		// 			value: title,
		// 			$children: generateSubItems(item),
		// 		};
		// 	})
		// );

		const openStrategy = computed(() => {
			if (settings.effect.isUniqueOpened) {
				return 'single';
			} else {
				return 'multiple';
			}
		});

		const generateSubItems = (items: RouteRecordRaw): any => {
			const children: Array<RouteRecordRaw> = items.children || [];
			if (!lodash.isEmpty(children)) {
				return children
					.filter((child) => !child.meta?.isNotShowInMenu)
					.map((child) => {
						if (lodash.isEmpty(child.children)) {
							return {
								title: child.meta?.title,
								to: child.path,
								prependIcon: child.meta?.icon,
							};
						} else {
							return {
								title: child.meta?.title,
								prependIcon: child.meta?.icon,
								$children: generateSubItems(child),
							};
						}
					});
			}
		};

		return { displayItems, active, opened, openStrategy };
	},
});
</script>
