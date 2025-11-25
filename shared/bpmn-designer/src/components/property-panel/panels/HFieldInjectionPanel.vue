<template>
  <h-expansion-item icon="mdi-focus-field-horizontal" label="字段注入" badge :count="count"></h-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import { HExpansionItem } from '../../widgets';

export default defineComponent({
  name: 'HFieldInjectionPanel',

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
