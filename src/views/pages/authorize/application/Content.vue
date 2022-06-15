<template>
	<h-detail-content :title="title" :overlay="overlay">
		<h-container column="two" :offset="2" winder="start">
			<div>left</div>

			<template #right>
				<div>right</div>
			</template>
		</h-container>
	</h-detail-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { QTableProps } from 'quasar';
import type { OAuth2Application, OAuth2Scope } from '/@/lib/declarations';

import { useAuthorizeApi } from '/@/apis';
import { useTableItem, useTableItems } from '/@/hooks';

import { HContainer, HDetailContent } from '/@/components';

export default defineComponent({
	name: 'OAuth2ApplicationContent',

	components: {
		HContainer,
		HDetailContent,
	},

	setup() {
		const api = useAuthorizeApi();

		const { editedItem, title, assign, overlay } = useTableItem<OAuth2Application>(api.application);

		return {
			title,
			overlay,
		};
	},
});
</script>
