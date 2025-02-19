<template>
  <h-button
    flat
    round
    :color="color"
    :dense="settings.display.table.dense"
    :size="settings.display.table.dense ? 'sm' : 'md'"
    v-bind="$attrs"
  ></h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '@/stores';

export default defineComponent({
  name: 'HDenseIconButton',

  props: {
    color: { type: String, default: 'grey-8' },
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
