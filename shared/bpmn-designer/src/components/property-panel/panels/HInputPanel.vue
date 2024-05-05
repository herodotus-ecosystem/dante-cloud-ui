<template>
  <h-expansion-item icon="mdi-application-import" label="输入" badge :count="count"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HInputPanel',

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
