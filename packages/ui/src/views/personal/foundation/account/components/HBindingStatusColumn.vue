<template>
  <q-chip
    v-if="bound"
    icon="mdi-checkbox-multiple-blank-circle"
    color="red"
    text-color="white"
    :dense="settings.display.table.dense"
  >
    使用中
  </q-chip>
  <q-chip v-else icon="mdi-checkbox-multiple-blank-circle" :dense="settings.display.table.dense"
    >未使用</q-chip
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

export default defineComponent({
  name: 'HBindingStatusColumn',

  props: {
    bound: { type: Boolean, default: false },
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
