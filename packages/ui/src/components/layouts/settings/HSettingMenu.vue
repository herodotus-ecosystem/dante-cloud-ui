<template>
  <q-list bordered padding class="rounded-borders">
    <template v-for="(item, index) in settingRoutes" :key="index">
      <q-item-label header>{{ getItemTitle(item) }}</q-item-label>

      <q-item
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
        :to="subItem.path"
        active-class="expansion-item--active"
        separator
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-icon :name="getItemIcon(subItem)" />
        </q-item-section>

        <q-item-section>{{ getItemTitle(subItem) }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

import { SettingRoutes } from '/@/routers/logic';

export default defineComponent({
  name: 'HSettingMenu',

  setup() {
    const settingRoutes = SettingRoutes;

    const getItemTitle = (item: RouteRecordRaw): string => {
      return item.meta?.title as string;
    };

    const getItemIcon = (item: RouteRecordRaw): string => {
      return item.meta?.icon as string;
    };

    const isActive = (route: RouteLocationNormalizedLoaded, item: RouteRecordRaw) => {
      return route.matched[1].path === item.path;
    };

    const hasSeparator = (item: RouteRecordRaw): boolean => {
      return item.meta?.separator as boolean;
    };

    return {
      settingRoutes,
      getItemTitle,
      getItemIcon,
      isActive,
      hasSeparator
    };
  }
});
</script>
