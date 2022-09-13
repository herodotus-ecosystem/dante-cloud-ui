<template>
	<sign-in-layout>
		<component :is="application.signInPanel"></component>
	</sign-in-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useApplicationStore, useCryptoStore, useAuthenticationStore } from '/@/stores';

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
		const authentication = useAuthenticationStore();
		const crypto = useCryptoStore();

		onMounted(() => {
			if (crypto.sessionId) {
				crypto.exchange(crypto.sessionId);
			} else {
				crypto.exchange();
			}
			authentication.errorTimes = 0;
		});

		return {
			application,
		};
	},
});
</script>
