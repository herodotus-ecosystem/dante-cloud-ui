<template>
  <h-table-action-button icon="mdi-pen" tooltip="编辑" color="accent" v-bind="$attrs"></h-table-action-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HTableActionButton from './HTableActionButton.vue';

export default defineComponent({
  name: 'HTableItemEditButton',

  components: {
    HTableActionButton
  }
});
</script>
