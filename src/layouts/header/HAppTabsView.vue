<template>
	<q-toolbar>
		<q-tabs v-model="currentTab" shrink inline-label outside-arrows mobile-arrows dense active-color="primary">
			<q-route-tab
				v-for="(tab, i) in tabs"
				:key="i"
				:tabindex="i"
				:name="(tab.name as string)"
				:label="(tab.meta.title as string)"
				:icon="(tab.meta.icon as string)"
				exact
				@click="onSwitchTab(tab)"
			>
				<q-btn v-if="isShowClosable" flat round size="sm" icon="mdi-close-circle" class="q-ml-sm" @click.stop="onCloseTab(tab)" />
			</q-route-tab>
		</q-tabs>
		<q-space />
		<h-app-tabs-view-actions></h-app-tabs-view-actions>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { Tab } from '/@/lib/declarations';

import { useTabsStore } from '/@/stores';

import HAppTabsViewActions from './HAppTabsViewActions.vue';

export default defineComponent({
	name: 'HAppTabsView',

	components: {
		HAppTabsViewActions,
	},

	setup(props) {
		const route = useRoute();

		const tabStore = useTabsStore();
		const { tabs } = storeToRefs(tabStore);
		const { closeTab, switchTab, smartTab } = tabStore;

		const currentTab = ref('主控台');

		watch(
			() => route.path,
			() => {
				smartTab(route);
				currentTab.value = route.name as string;
			},
			{
				immediate: true,
			}
		);

		const isShowClosable = computed(() => {
			return tabs.value.length !== 1;
		});

		const onSwitchTab = (tab: Tab) => {
			switchTab(tab);
		};

		const onCloseTab = (tab: Tab) => {
			closeTab(tab);
		};

		return {
			onSwitchTab,
			onCloseTab,
			currentTab,
			tabs,
			isShowClosable,
		};
	},
});
</script>
