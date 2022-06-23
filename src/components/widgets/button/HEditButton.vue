<template>
	<h-icon-button color="purple" icon="mdi-clipboard-edit" tooltip="删除"></h-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HIconButton } from '../../library';

export default defineComponent({
	name: 'HEditButton',

	components: {
		HIconButton,
	},
});
</script>
