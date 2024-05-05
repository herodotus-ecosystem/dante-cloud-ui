<template>
  <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
    <q-tooltip>Apps</q-tooltip>
    <q-menu anchor="bottom left" self="top middle">
      <div class="q-pa-md" style="width: 200px">
        <div class="q-gutter-md">
          <q-btn round color="primary" :icon="item.icon" :to="item.path" v-for="item in widgets" :key="item.path">
            <q-tooltip>{{ item.tooltip }}</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import type { WidgetItem } from '/@/lib/declarations';
import { getWidgets } from '/@/routers/logic';

export default defineComponent({
  name: 'HAppBreadcrumbs',

  setup(props) {
    const widgets = ref<Array<WidgetItem>>([]);

    onMounted(() => {
      widgets.value.push(...getWidgets());
    });

    return {
      widgets
    };
  }
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
