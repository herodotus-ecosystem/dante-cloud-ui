<template>
	<h-error-layout>
		<icon-not-found height="80vh" width="100%" />
	</h-error-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HErrorLayout } from '/@/components';
import IconNotFound from '~icons/custom/not-found';

export default defineComponent({
	name: 'NotFound',

	components: {
		IconNotFound,
		HErrorLayout,
	},
});
</script>
