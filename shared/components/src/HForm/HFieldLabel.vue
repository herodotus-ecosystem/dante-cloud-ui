<template>
  <div class="q-gutter-xs row q-mb-xs">
    <q-icon v-if="required" name="mdi-star" color="red" class="q-pt-xs" size="10px" />
    <div class="ext-body2">{{ text }}</div>
    <q-icon v-if="tooltip" name="mdi-information-variant-circle" color="grey" size="xs">
      <q-tooltip>{{ tooltip }}</q-tooltip>
    </q-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HFieldLabel',

  props: {
    required: { type: Boolean, default: false },
    text: { type: String, required: true },
    tooltip: { type: String },
  },

  setup() {},
});
</script>
