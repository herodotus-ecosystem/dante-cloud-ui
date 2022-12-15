<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header :tab-view="false" back-home></h-app-header>

    <h-app-right-drawer></h-app-right-drawer>

    <h-setting-container></h-setting-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HSettingContainer } from '/@/components';

export default defineComponent({
  name: 'HSettingsLayout',

  components: {
    HSettingContainer
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      }
    };
  }
});
</script>
