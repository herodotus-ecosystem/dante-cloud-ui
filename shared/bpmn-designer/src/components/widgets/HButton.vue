<template>
  <q-btn dense text-color="primary" class="q-px-sm" v-bind="$attrs">
    <template v-if="!$slots.default && tooltip" #default>
      <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    </template>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HButton',

  props: {
    tooltip: { type: String, default: '' }
  }
});
</script>
