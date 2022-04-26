<template>
	<v-tabs
		v-model="activatedTab"
		optional
		color="primary"
		next-icon="mdi-arrow-right-bold-box-outline"
		prev-icon="mdi-arrow-left-bold-box-outline"
		show-arrows
	>
		<v-tab v-for="(tab, i) in tabs" :key="i" :value="tab.name" @click="onSwitchTab(tab)">
			{{ tab.meta.title }}
			<v-btn v-if="isShowClosable" icon variant="text">
				<v-icon icon="mdi-close-circle" @click.stop="onCloseTab(tab)"></v-icon>
			</v-btn>
		</v-tab>
	</v-tabs>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useTabsStore } from '/@/stores';
import { Tab } from '/@/lib/declarations';
import { TabsUtils } from '/@/lib/logics/route';

export default defineComponent({
	name: 'HAppTabsView',

	setup() {
		const route = useRoute();

		const tabStore = useTabsStore();
		const { tabs, activatedTab } = storeToRefs(tabStore);
		const { addTab, removeTab, switchTab } = tabStore;

		watch(
			() => route.path,
			() => {
				addTab(route);
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
			removeTab(tab);
		};

		return {
			tabs,
			activatedTab,
			isShowClosable,
			onCloseTab,
			onSwitchTab,
		};
	},
});
</script>
