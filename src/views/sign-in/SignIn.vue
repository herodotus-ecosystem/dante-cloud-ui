<template>
	<sign-in-layout>
		<component :is="application.signInPanel"></component>
	</sign-in-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '/@/stores';

import SignInLayout from './SignInLayout.vue';
import { AccountPanel, MobilePanel, ScanPanel } from './panel';

export default defineComponent({
	name: 'SignIn',

	components: {
		SignInLayout,
		account: AccountPanel,
		mobile: MobilePanel,
		scan: ScanPanel,
	},

	setup(props) {
		const application = useApplicationStore();

		return {
			application,
		};
	},
});
</script>
