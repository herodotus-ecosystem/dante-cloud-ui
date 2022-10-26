<template>
  <q-layout view="lHr LpR fFf" class="bg-grey-2">
    <q-header bordered class="text-primary bg-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>{{ title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <h-widget-panel></h-widget-panel>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" behavior="desktop" bordered>
      <!-- <h-property-panel></h-property-panel> -->
    </q-drawer>

    <!-- <h-canvas-container></h-canvas-container> -->
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';

import { HWidgetPanel } from './panels';

export default {
  name: 'HDynamicForms',

  components: {
    HWidgetPanel
  },

  props: {
    title: { type: String, default: 'Dante Cloud Form Designer' }
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
};
</script>
