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

<script setup lang="ts">
import { QCard, QCardSection, QSeparator } from 'quasar';

defineOptions({ name: 'HChartCard', components: { QCard, QCardSection, QSeparator } });

interface Props {
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
});
</script>
