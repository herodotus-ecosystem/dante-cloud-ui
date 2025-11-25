<template>
  <q-layout view="lHr LpR lFr" :class="[q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header :tab-view="false" back-home message></h-app-header>

    <h-app-right-drawer></h-app-right-drawer>

    <h-setting-container></h-setting-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

import { HSettingContainer } from '@/components';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRoute } from 'vue-router';

import { useRouterStore, useEditFinish } from '@herodotus-cloud/framework-kernel';

defineOptions({
  name: 'HSettingsLayout',
  components: {
    HSettingContainer,
  },
});

const route = useRoute();
const q = useQuasar();
const { onFinish } = useEditFinish();

const smartCloseDetail = (route: RouteLocationNormalizedLoaded) => {
  const store = useRouterStore();
  const isDetailRoute = store.isDetailRoute(route);

  if (isDetailRoute) {
    if (!store.hasParameter(route)) {
      onFinish();
    }
  }
};

watch(
  () => route.path,
  () => {
    smartCloseDetail(route);
  },
  { immediate: true },
);
</script>
