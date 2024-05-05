<template>
  <h-sign-in-layout>
    <component :is="application.signInPanel"></component>
  </h-sign-in-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { useApplicationStore, useCryptoStore, useAuthenticationStore } from '/@/stores';

import { HSignInLayout } from './components';
import { AccountPanel, MobilePanel, ScanPanel } from './panel';

export default defineComponent({
  name: 'SignIn',

  components: {
    HSignInLayout,
    account: AccountPanel,
    mobile: MobilePanel,
    scan: ScanPanel
  },

  setup() {
    const application = useApplicationStore();
    const authentication = useAuthenticationStore();
    const crypto = useCryptoStore();

    onMounted(() => {
      crypto.exchange();
      authentication.errorTimes = 0;
    });

    return {
      application
    };
  }
});
</script>
