<template>
	<v-list-group v-if="item.children">
		<template v-slot:activator="{ props }">
			<v-list-item
				v-bind="props"
				:title="(item.meta?.title as string)"
				:value="(item.meta?.title as string)"
				:prepend-icon="(item.meta?.icon as string)"
			></v-list-item>
		</template>
		<div v-for="(subItem, i) in item.children">
			<v-list-item :key="i">
				<v-list-item-title v-text="(subItem.name as string)"></v-list-item-title>
			</v-list-item>
		</div>
	</v-list-group>
	<v-list-item v-else :title="(item.meta?.title as string)" :value="(item.meta?.title as string)" :prepend-icon="(item.meta?.icon as string)">
	</v-list-item>
</template>
<script lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import { defineComponent, PropType } from 'vue';
import HMenuItem from './HMenuItem.vue';

export default defineComponent({
	name: 'HMenuGroup',
	components: {
		HMenuItem,
	},
	props: {
		item: {
			type: Object as PropType<RouteRecordRaw>,
			default: () => {},
			require: true,
		},
	},
});
</script>
