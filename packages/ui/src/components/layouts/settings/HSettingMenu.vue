<template>
  <q-list bordered padding class="rounded-borders">
    <div v-for="(item, index) in settingRoutes" :key="index">
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
    </div>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';

import { SettingRoutes } from '/@/routers/logic';
import { useRouteStore } from '/@/stores';

export default defineComponent({
  name: 'HSettingMenu',

  setup() {
    const settingRoutes = SettingRoutes;
    const routeStore = useRouteStore();

    const getItemTitle = (item: RouteRecordRaw): string => {
      return item.meta?.title as string;
    };

    const getItemIcon = (item: RouteRecordRaw): string => {
      // 代码逻辑实际上放在此处不合适，只是为了减少路由的遍历
      routeStore.addDetailRoutes(item);
      return item.meta?.icon as string;
    };

    const isActive = (route: RouteLocationNormalizedLoaded, item: RouteRecordRaw) => {
      return route.matched[1].path === item.path;
    };

    return {
      settingRoutes,
      getItemTitle,
      getItemIcon,
      isActive
    };
  }
});
</script>
