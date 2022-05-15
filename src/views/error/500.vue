<template>
	<v-row class="h-auto" justify="center">
		<v-col cols="4" align-self="center"><i-custom-not-found class="mt-20 h-100 w-100" color="primary"></i-custom-not-found></v-col
	></v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import IconNotFound from '~icons/custom/not-found';

export default defineComponent({
	name: '404',

	components: {
		IconNotFound,
	},
});
</script>
