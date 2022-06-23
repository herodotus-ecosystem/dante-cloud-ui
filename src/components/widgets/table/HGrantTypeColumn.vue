<template>
	<div>
		<h-dense-icon-button v-for="(item, i) in items" :key="i" :icon="icon(item)" :color="color(item)" :tooltip="text(item)"></h-dense-icon-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useDisplayElement } from '/@/hooks';
import { GRANT_TYPE_STYLE_GROUP } from '/@/settings';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
	name: 'HGrantTypeColumn',

	components: {
		HDenseIconButton,
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
