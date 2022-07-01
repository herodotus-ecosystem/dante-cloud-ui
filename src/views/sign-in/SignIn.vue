<template>
	<sign-in-layout>
		<component :is="application.signInPanel"></component>
	</sign-in-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useApplicationStore, useCryptoStore } from '/@/stores';

import { variables } from '/@/lib/utils';

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

	setup() {
		const application = useApplicationStore();
		const crypto = useCryptoStore();

		onMounted(() => {
			if (variables.isUseCrypto()) {
				crypto.exchange();
			}
		});

		return {
			application,
		};
	},
});
</script>
