<template>
  <div v-for="(item, index) in items" :key="index">
    <template v-if="hasPermission(item)">
      <q-expansion-item
        v-if="isDisplayAsItem(item)"
        :label="getItemTitle(item)"
        :icon="getItemIcon(item)"
        :to="item.path"
        :header-inset-level="level"
        expand-separator
        expand-icon="1"
      ></q-expansion-item>
      <q-expansion-item
        v-else
        :label="getItemTitle(item)"
        :icon="getItemIcon(item)"
        :header-inset-level="level"
        :header-class="isActive(item) ? 'expansion-item--active' : ''"
        :model-value="isActive(item)"
        expand-separator
      >
        <h-app-menu-items :items="getItemChildren(item)" :level="level + 0.5"></h-app-menu-items>
      </q-expansion-item>
    </template>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, ref } from 'vue';

import type { RouteRecordRaw } from 'vue-router';

import { useRoute } from 'vue-router';

import { useSystemMenu } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HAppMenuItems',

  props: {
    items: { type: Array as PropType<Array<RouteRecordRaw>>, required: true },
    level: { type: Number, required: true },
  },

  setup() {
    const headerClass = ref('');

    const thisRoute = useRoute();
    const { getItemTitle, getItemIcon, getItemChildren, hasPermission, isDisplayAsItem } =
      useSystemMenu();

    const isActive = (item: RouteRecordRaw) =>
      thisRoute.matched.some((matchedItem) => matchedItem.path === item.path);

    return {
      isDisplayAsItem,
      getItemIcon,
      getItemTitle,
      getItemChildren,
      headerClass,
      isActive,
      hasPermission,
    };
  },
});
</script>

<style lang="scss">
.q-item__section--avatar {
  color: inherit;
  min-width: 0;
}

.expansion-item--active {
  color: var(--q-primary);
}
</style>
