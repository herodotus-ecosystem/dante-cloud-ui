<template>
  <q-breadcrumbs class="q-ml-lg" :class="settings.display.showBreadcrumbsIcon ? '' : 'hidden_icon'">
    <q-breadcrumbs-el label="首页" icon="home" :to="homePath" />
    <q-breadcrumbs-el
      v-for="(item, i) in $route.matched"
      :key="i"
      :label="item.meta.title as unknown as string"
      :icon="item.meta.icon as unknown as string"
      :disable="true"
    />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CONSTANTS } from '@/configurations';
import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HAppBreadcrumbs',

  setup(props) {
    const homePath = CONSTANTS.Path.HOME;
    const settings = useSettingsStore();

    return {
      homePath,
      settings,
    };
  },
});
</script>

<style lang="scss">
.hidden_icon {
  a {
    i {
      display: none;
    }
  }
}
</style>
