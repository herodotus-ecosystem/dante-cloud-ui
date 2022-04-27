<template>
	<h-sign-in-layout>
		<h-sign-in-account-panel></h-sign-in-account-panel>
	</h-sign-in-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HSignInLayout } from './layout';
import { HSignInAccountPanel } from './panel';

export default defineComponent({
	components: {
		HSignInLayout,
		HSignInAccountPanel,
	},
	setup() {
		return {};
	},
});
</script>
