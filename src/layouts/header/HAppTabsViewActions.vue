<template>
	<q-btn-dropdown stretch flat>
		<q-list>
			<h-list-item label="关闭" icon="bluetooth"></h-list-item>
			<q-item clickable v-ripple>
				<q-item-section avatar>
					<q-icon color="primary" name="bluetooth" />
				</q-item-section>

				<q-item-section>Icon as avatar</q-item-section>
			</q-item>
			<q-item-label header>Files</q-item-label>
			<q-item v-for="n in 3" :key="`y.${n}`" clickable v-close-popup tabindex="0">
				<q-item-section avatar>
					<q-avatar icon="assignment" color="primary" text-color="white" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Vacation</q-item-label>
					<q-item-label caption>February 22, 2016</q-item-label>
				</q-item-section>
				<q-item-section side>
					<q-icon name="info" />
				</q-item-section>
			</q-item>
		</q-list>
	</q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HListItem } from '/@/components';

export default defineComponent({
	name: 'HAppTabsViewsActions',

	components: {
		HListItem,
	},
});
</script>
