<template>
  <h-sign-in-layout>
    <component :is="application.signInPanel"></component>
  </h-sign-in-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useCryptoStore, useAuthenticationStore, useApplicationStore } from '@herodotus-cloud/framework-kernel';

import { HSignInLayout } from '@/composables/sign-in';
import AccountPanel from './panel/AccountPanel.vue';
import MobilePanel from './panel/MobilePanel.vue';
import ScanPanel from './panel/ScanPanel.vue';

defineOptions({
  name: 'SignIn',
  components: {
    HSignInLayout,
    account: AccountPanel,
    mobile: MobilePanel,
    scan: ScanPanel,
  },
});

const application = useApplicationStore();
const authentication = useAuthenticationStore();
const crypto = useCryptoStore();

onMounted(() => {
  crypto.exchange();
  authentication.errorTimes = 0;
});
</script>
