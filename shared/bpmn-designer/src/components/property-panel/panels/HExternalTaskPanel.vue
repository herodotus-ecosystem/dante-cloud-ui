<template>
  <h-expansion-item icon="mdi-transfer" label="外部任务"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import { useDesignerStore } from '@/stores';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HExternalTaskPanel',

  components: {
    HExpansionItem,
  },

  setup() {
    const designer = useDesignerStore();

    const loading = () => {};

    watch(
      () => designer.activeElement.id,
      () => {
        loading();
      },
      { immediate: true, deep: true },
    );
  },
});
</script>
