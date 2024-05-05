<template>
  <h-expansion-item icon="mdi-file-import" label="输入映射" badge :count="count"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HInMappingPanel',

  components: {
    HExpansionItem
  },

  setup() {
    const tableRows = ref([]);

    const count = computed(() => {
      return tableRows.value.length;
    });

    return {
      count
    };
  }
});
</script>
