<template>
  <q-page-container>
    <q-page class="q-pa-md">
      <router-view />
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, watch, VNode, RendererNode, RendererElement } from 'vue';

import type { RouteLocationNormalizedLoaded } from 'vue-router';

export default defineComponent({
  name: 'HAppContainer',

  setup() {}
});
</script>
