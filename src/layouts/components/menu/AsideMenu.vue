<template>
	<v-list
		v-model:active="active"
		v-model:opened="opened"
		:open-strategy="openStrategy"
		density="compact"
		:nav="nav"
		:items="displayItems"
		color="blue lighten-2"
	></v-list>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { defineComponent, ref, computed } from 'vue';

import { lodash } from '/@/utils';
import { useSettingsStore } from '/@/stores';

export default defineComponent({
	name: 'HAppAsideMenu',

	components: {},

	props: {
		items: {
			type: Array as PropType<RouteRecordRaw[]>,
			default: () => [],
			required: true,
		},
		nav: Boolean,
	},

	setup(props) {
		const settings = useSettingsStore();

		const active = ref<string[]>([]);
		const opened = ref<string[]>([]);

		const displayItems = computed(() =>
			props.items?.map((item) => {
				const meta = item.meta;
				const heading = meta?.heading;
				const divider = meta?.divider;
				const title = meta?.title;
				const icon = meta?.icon;
				const activeIcon = icon;
				const inactiveIcon = icon;

				if (heading) return { $type: 'subheader', text: heading };
				if (divider) return { $type: 'divider' };

				return {
					title: title,
					prependIcon: opened.value.includes(title as string) ? activeIcon : inactiveIcon,
					value: title,
					$children: generateSubItems(item),
				};
			})
		);

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
				return children.map((child) => {
					const result = {
						title: child.meta?.title,
						to: child.path,
						nav: true,
						prependIcon: child.meta?.icon,
						$children: [],
					};
					if (lodash.isEmpty(child.children)) {
						result.$children = generateSubItems(child);
					}

					return result;
				});
			}
		};

		return { displayItems, active, opened, openStrategy };
	},
});
</script>
