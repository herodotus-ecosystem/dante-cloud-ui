<template>
  <q-chip v-if="status" color="red" text-color="white" :dense="settings.display.table.dense"
    ><q-tooltip>不允许删除的数据</q-tooltip>保留数据</q-chip
  >
  <q-chip v-else color="green" text-color="white" :dense="settings.display.table.dense"
    ><q-tooltip>可以删除的数据</q-tooltip>非保留数据</q-chip
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSettingsStore } from '@/stores';

export default defineComponent({
  name: 'HReservedColumn',

  props: {
    status: { type: Boolean, default: false },
  },

  setup(props) {
    const settings = useSettingsStore();
    return {
      settings,
    };
  },
});
</script>
