<template>
  <div class="q-gutter-xs row q-mb-xs">
    <q-icon v-if="required" name="mdi-star" color="red" class="q-pt-xs" size="10px" />
    <div class="ext-body2">{{ text }}</div>
    <q-icon v-if="tooltip" name="mdi-information-variant-circle" color="grey" size="xs">
      <q-tooltip>{{ tooltip }}</q-tooltip>
    </q-icon>
  </div>
</template>

<script setup lang="ts">
import { QIcon, QTooltip } from 'quasar';
defineOptions({ name: 'HFieldLabel', components: { QIcon, QTooltip } });

interface Props {
  required?: boolean;
  text: string;
  tooltip?: string;
}

withDefaults(defineProps<Props>(), {
  required: false,
});
</script>
