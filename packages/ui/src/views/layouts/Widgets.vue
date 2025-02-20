<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header :tab-view="false" back-home></h-app-header>

    <h-app-right-drawer></h-app-right-drawer>

    <h-app-container></h-app-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppHeader, HAppRightDrawer, HAppContainer } from '@/components';

export default defineComponent({
  name: 'HApplicationLayout',

  components: {
    HAppHeader,
    HAppRightDrawer,
    HAppContainer,
  },
});
</script>
