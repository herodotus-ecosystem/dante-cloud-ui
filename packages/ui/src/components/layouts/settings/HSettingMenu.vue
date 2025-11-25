<template>
  <q-list bordered padding class="rounded-borders">
    <h-app-menu-items :items="items" :level="0"></h-app-menu-items>
  </q-list>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';

import { HAppMenuItems } from '../common';
import { useRouterStore } from '@herodotus-cloud/framework-kernel';

defineOptions({ name: 'HSettingMenu', components: { HAppMenuItems } });

const items = ref<Array<RouteRecordRaw>>([]);

const store = useRouterStore();

onMounted(() => {
  items.value = store.personalMenus;
});
</script>
