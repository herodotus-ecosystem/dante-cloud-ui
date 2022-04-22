<template>
	<v-list v-model:active="active" v-model:opened="opened" density="compact" :nav="nav" :items="displayItems" color="blue lighten-2" />
</template>

<script lang="ts">
import type { Prop } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { defineComponent, ref, computed } from 'vue';

import { lodash } from '/@/utils';

function generateSubItems(items: RouteRecordRaw): any {
	const children: Array<RouteRecordRaw> = items.children || [];

	if (!lodash.isEmpty(children)) {
		return children.map((child) => {
			if (!lodash.isEmpty(child.children)) {
				return {
					title: child?.meta?.nav ?? child?.meta?.title ?? child,
					to: child?.path,
					disabled: !child,
				};
			} else {
				return {
					title: child.meta?.title,
					$children: generateSubItems(child),
				};
			}
		});
	}
}

export default defineComponent({
	name: 'HAppMenu',

	components: {},

	props: {
		items: {
			type: Array,
			default: () => [],
		} as Prop<RouteRecordRaw[]>,
		nav: Boolean,
	},

	setup(props) {
		const active = ref<string[]>([]);
		const opened = ref<string[]>([]);

		const displayItems = computed(() =>
			props.items?.map((item) => {
				const meta = item.meta;
				const heading = meta?.heading;
				const divider = meta?.divider;
				const title = meta?.title;
				const activeIcon = meta?.activeIcon;
				const inactiveIcon = meta?.inactiveIcon;
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

		return { displayItems, active, opened };
	},
});
</script>
