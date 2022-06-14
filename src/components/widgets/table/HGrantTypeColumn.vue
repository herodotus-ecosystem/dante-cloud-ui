<template>
	<div>
		<h-button v-for="(item, i) in items" flat round :key="i" :icon="icon(item)" :color="color(item)" :tooltip="text(item)"></h-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useDisplayElement } from '/@/hooks';
import { GRANT_TYPE_STYLE_GROUP } from '/@/settings';

import { HButton } from '../../library';

export default defineComponent({
	name: 'HGrantTypeColumn',

	components: {
		HButton,
	},

	props: {
		items: { type: Array as PropType<Array<string>>, required: true },
	},

	setup(props) {
		const { icon, color, text } = useDisplayElement(GRANT_TYPE_STYLE_GROUP);

		return {
			icon,
			color,
			text,
		};
	},
});
</script>
