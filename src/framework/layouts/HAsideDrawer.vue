<template>
	<v-navigation-drawer v-model="drawer" permanent priority="0">
		<!-- <template v-slot:prepend>
			<v-list-item two-line prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg" title="Jane Smith" subtitle="Logged in"></v-list-item>
			<v-divider class="mt-2"></v-divider>
		</template>
		<v-card class="mx-auto">
			<h-menu-group v-for="item in menu" :item="item"></h-menu-group>
		</v-card> -->

		<v-list>
			<template v-for="(item, i) in menu">
				<v-list-group v-if="item.children">
					<template v-slot:activator="{ props }">
						<v-list-item v-bind="props" :title="(item.meta?.title as string)" :value="(item.meta?.title as string)"></v-list-item>
					</template>

					<h-menu-item v-for="(subItem, i) in item.children" :item="subItem" :key="i"></h-menu-item>
				</v-list-group>

				<v-list-item v-else>
					<v-list-item-header>
						<v-list-item-title :key="`heading-${i}`" class="text--primary font-weight-black text-uppercase">{{ item.meta?.title }}</v-list-item-title>
					</v-list-item-header>
				</v-list-item>
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from 'vue';
import { useRouteStore } from '/@/stores';
import HMenuGroup from './HMenuGroup.vue';
import HMenuItem from './HMenuItem.vue';

export default defineComponent({
	name: 'HAsideDrawer',
	components: {
		HMenuGroup,
		HMenuItem,
	},
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue'],

	setup(props, { emit }) {
		const store = useRouteStore();
		const menu = store.menu;

		const drawer = computed({
			get: () => props.modelValue,
			set: (newValue) => {
				emit('update:modelValue', newValue);
			},
		});

		return {
			menu,
			drawer,
		};
	},
});
</script>
