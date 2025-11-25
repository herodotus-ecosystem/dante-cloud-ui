<template>
  <q-btn
    flat
    dense
    round
    @click="application.leftDrawer = !application.leftDrawer"
    :icon="application.leftDrawer ? 'mdi-menu-open' : 'mdi-menu-close'"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HAppLeftDrawerControl',

  setup(props) {
    const application = useApplicationStore();

    return {
      application,
    };
  },
});
</script>
