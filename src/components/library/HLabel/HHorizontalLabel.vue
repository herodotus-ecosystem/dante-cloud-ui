<template>
	<h-layout column="two" mode-for-two="left-right" :offset="3">
		<template #left>
			<h-label v-bind="$attrs"></h-label>
		</template>

		<slot></slot>
	</h-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HLayout } from '../HLayout';
import { HLabel } from '../HLabel';

export default defineComponent({
	name: 'HHorizontalLabel',

	components: {
		HLabel,
		HLayout,
	},
});
</script>
