<template>
	<h-dense-icon-button color="purple" icon="mdi-clipboard-edit" tooltip="编辑"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HDenseIconButton from './HDenseIconButton.vue';

export default defineComponent({
	name: 'HEditButton',

	components: {
		HDenseIconButton,
	},
});
</script>
