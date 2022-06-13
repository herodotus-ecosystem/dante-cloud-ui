<template>
	<q-item-section avatar>
		<q-avatar :color="color(method)" text-color="white" :icon="icon(method)"> </q-avatar>
	</q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { HttpMethod } from '/@/lib/declarations';

import { useHttpMethodStyle } from '/@/hooks';

export default defineComponent({
	name: 'HHttpMethodAvatar',

	props: {
		method: { type: String as PropType<HttpMethod>, required: true },
	},

	setup() {
		const { icon, color } = useHttpMethodStyle();

		return {
			color,
			icon,
		};
	},
});
</script>
