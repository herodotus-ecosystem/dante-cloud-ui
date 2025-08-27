<template>
  <q-list padding>
    <h-app-menu-items :items="items" :level="0"></h-app-menu-items>
  </q-list>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { useRouteStore } from '@/stores';

import HAppMenuItems from './HAppMenuItems.vue';

defineOptions({
  name: 'HAppMenu',
  components: {
    HAppMenuItems,
  },
});

const state = reactive({
  items: [] as Array<RouteRecordRaw>,
});

const store = useRouteStore();

onMounted(() => {
  state.items = store.routes;
});

const { items } = toRefs(state);
</script>
