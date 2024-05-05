<template>
  <h-expansion-item icon="mdi-timer-play" label="作业执行"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import { useDesignerStore } from '/@/stores';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HJobExecutionPanel',

  components: {
    HExpansionItem
  },

  setup() {
    const designer = useDesignerStore();

    const loading = () => {};

    watch(
      () => designer.activeElement.id,
      newValue => {
        loading();
      },
      { immediate: true, deep: true }
    );
  }
});
</script>
