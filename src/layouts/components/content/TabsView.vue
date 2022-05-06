<template>
	<v-card flat rounded="0">
		<v-tabs v-model="activatedTab" color="primary" density="comfortable" show-arrows center-active>
			<v-tab v-for="(tab, i) in tabs" :key="i" :value="tab.name" @click="onSwitchTab(tab)" class="pr-1 ml-1">
				{{ tab.meta.title }}
				<v-btn v-if="isShowClosable" icon variant="text" size="x-small" class="ml-1">
					<v-icon icon="mdi-close-circle" @click.stop="onCloseTab(tab)" size="x-small"></v-icon>
				</v-btn>
			</v-tab>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useTabsStore } from '/@/stores';
import { Tab } from '/@/lib/declarations';

export default defineComponent({
	name: 'HAppTabsView',

	setup() {
		const route = useRoute();

		const tabStore = useTabsStore();
		const { tabs, activatedTab } = storeToRefs(tabStore);
		const { closeTab, switchTab, smartTab } = tabStore;

		watch(
			() => route.path,
			() => {
				smartTab(route);
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
			tabs,
			activatedTab,
			isShowClosable,
			onCloseTab,
			onSwitchTab,
		};
	},
});
</script>
