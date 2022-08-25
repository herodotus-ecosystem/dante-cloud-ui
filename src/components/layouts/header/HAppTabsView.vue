<template>
	<q-toolbar>
		<q-tabs v-model="currentTabName" shrink inline-label outside-arrows mobile-arrows dense active-color="primary">
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
		<q-btn-dropdown color="red" v-if="isShowClosable">
			<q-list>
				<h-list-item label="关闭当前" icon="mdi-close" @click="onCloseCurrentTab()"></h-list-item>
				<h-list-item label="关闭其它" icon="mdi-valve-closed" @click="onCloseOtherTab()"></h-list-item>
			</q-list>
		</q-btn-dropdown>
	</q-toolbar>
</template>

<script lang="ts">
import { defineComponent, watch, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { Tab } from '/@/lib/declarations';

import { reloadInjectionKey } from '/@/lib/symbol';
import { useTabsStore } from '/@/stores';

import { HListItem } from '/@/components';

export default defineComponent({
	name: 'HAppTabsView',

	components: {
		HListItem,
	},

	setup(props) {
		const route = useRoute();

		const tabStore = useTabsStore();
		const { tabs, currentTabName } = storeToRefs(tabStore);
		const { closeTab, switchTab, smartTab, closeCurrentTab, closeOtherTabs } = tabStore;

		const reload = inject(reloadInjectionKey);

		watch(
			() => route.path,
			() => {
				smartTab(route);
			},
			{ immediate: true }
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

		const onCloseCurrentTab = () => {
			closeCurrentTab();
		};

		const onCloseOtherTab = () => {
			closeOtherTabs();
		};

		return {
			onSwitchTab,
			onCloseTab,
			onCloseCurrentTab,
			onCloseOtherTab,
			currentTabName,
			tabs,
			isShowClosable,
		};
	},
});
</script>
