<template>
	<h-dense-icon-button color="red" icon="mdi-delete" :tooltip="tooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
	name: 'HDeleteButton',

	components: {
		HDenseIconButton,
	},

	props: {
		tooltip: { type: String, default: '删除' },
	},
});
</script>
