<template>
  <q-list padding>
    <h-app-menu-items :items="items" :level="0"></h-app-menu-items>
  </q-list>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { useRouteStore } from '@/stores';

import { HAppMenuItems } from '../common';

defineOptions({
  name: 'HAppMenu',
  components: {
    HAppMenuItems,
  },
});

const items = ref<Array<RouteRecordRaw>>([]);

const store = useRouteStore();

onMounted(() => {
  items.value = store.appMenus;
});
</script>
