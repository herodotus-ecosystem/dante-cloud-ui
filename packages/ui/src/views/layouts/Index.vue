<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header
      :tab-view="settings.display.isTabsView"
      :breadcrumbs="settings.display.showBreadcrumbs"
      message
    ></h-app-header>

    <h-app-left-drawer></h-app-left-drawer>

    <h-app-right-drawer></h-app-right-drawer>

    <h-app-container></h-app-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppHeader, HAppLeftDrawer, HAppRightDrawer, HAppContainer } from '@/components';

import { useSettingsStore } from '@/stores';

export default defineComponent({
  name: 'HDefaultLayout',

  components: {
    HAppContainer,
    HAppHeader,
    HAppLeftDrawer,
    HAppRightDrawer,
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
