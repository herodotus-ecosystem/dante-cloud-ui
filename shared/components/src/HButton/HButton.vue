<template>
  <q-btn v-bind="$attrs">
    <template v-if="tooltip" #default>
      <q-tooltip>{{ tooltip }}</q-tooltip>
    </template>

    <template #loading>
      <slot name="loading"></slot>
    </template>
  </q-btn>
</template>

<script setup lang="ts">
import { QBtn, QTooltip } from 'quasar';
defineOptions({ name: 'HButton', components: { QBtn, QTooltip } });

interface Props {
  tooltip?: string;
}

withDefaults(defineProps<Props>(), {
  tooltip: '',
});
</script>
