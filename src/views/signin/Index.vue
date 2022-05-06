<template>
	<h-sign-in-layout>
		<component :is="application.signInPanel"></component>
	</h-sign-in-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useApplicationStore, useCryptoStore } from '/@/stores';

import { variables } from '/@/lib/utils';

import HSignInLayout from './layout/Index.vue';
import HSignInAccountPanel from './panel/Account.vue';
import HSignInMobilePanel from './panel/Mobile.vue';
import HSignInScanPanel from './panel/Scan.vue';

export default defineComponent({
	components: {
		HSignInLayout,
		account: HSignInAccountPanel,
		mobile: HSignInMobilePanel,
		scan: HSignInScanPanel,
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
