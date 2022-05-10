<template>
	<v-breadcrumbs :items="items" density="compact" class="pl-0"></v-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';

import type { RouteLocationMatched, RouteLocationRaw } from 'vue-router';
import type { BreadcrumbItem } from 'vuetify/lib/components';

import { useRoute } from 'vue-router';

import { Path } from '/@/lib/enums';

export default defineComponent({
	name: 'HAppBreadcrumbs',

	setup() {
		const route = useRoute();

		const getItem = (item: RouteLocationMatched): typeof BreadcrumbItem => {
			let disabled = false;
			let to: RouteLocationRaw = item;

			if (!(item.children && item.children.length > 0)) {
				disabled = true;
			}

			return {
				text: item.meta?.title,
				disabled: disabled,
				to: to,
			};
		};

		const items = computed(() => {
			const matched = route.matched;
			const dynamicItems = matched.map((item) => getItem(item));

			let result: typeof BreadcrumbItem[] = [
				{
					text: Path.HOME_TITLE,
					disabled: false,
					to: { name: Path.HOME_NAME },
				},
			];

			return result.concat(dynamicItems);
		});

		return {
			items,
		};
	},
});
</script>
