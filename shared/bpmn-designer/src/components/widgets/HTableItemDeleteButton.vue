<template>
  <h-table-action-button icon="mdi-delete" tooltip="删除" color="red" v-bind="$attrs"></h-table-action-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HTableActionButton from './HTableActionButton.vue';

export default defineComponent({
  name: 'HTableItemDeleteButton',

  components: {
    HTableActionButton
  }
});
</script>
