<template>
	<h-icon-button color="red" icon="mdi-delete" :tooltip="tooltip"></h-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HIconButton } from '../../library';

export default defineComponent({
	name: 'HDeleteButton',

	components: {
		HIconButton,
	},

	props: {
		tooltip: { type: String, default: '删除' },
	},
});
</script>
