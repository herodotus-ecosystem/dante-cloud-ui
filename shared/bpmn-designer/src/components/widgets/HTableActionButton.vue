<template>
  <q-btn flat round dense size="sm" v-bind="$attrs">
    <template v-if="!$slots.default && tooltip" #default>
      <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    </template>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HTableActionButton',

  props: {
    tooltip: { type: String, default: '' }
  }
});
</script>
