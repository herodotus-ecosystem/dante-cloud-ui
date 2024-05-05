<template>
  <h-expansion-item icon="mdi-script-text" label="脚本"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';

import { useDesignerStore } from '/@/stores';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HScriptPanel',

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
