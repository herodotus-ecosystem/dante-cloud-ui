<template>
  <h-expansion-item icon="mdi-file-export-outline" label="输出映射分页"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import { useDesignerStore } from '/@/stores';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HOutMappingPropagationPanel',

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
