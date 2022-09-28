<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div v-if="subtitle" class="text-subtitle2">{{ subtitle }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HChartCard',

  props: {
    title: { type: String },
    subtitle: { type: String, default: '' }
  }
});
</script>
