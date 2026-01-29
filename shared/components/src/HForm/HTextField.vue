<template>
  <q-input v-model="text" outlined clearable bottom-slots v-bind="$attrs">
    <template v-if="$slots.append" #append>
      <slot name="append"></slot>
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before"></slot>
    </template>

    <template v-if="$slots.after" #after>
      <slot name="after"></slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

defineOptions({ name: 'HTextField', components: { QInput } });

const text = defineModel<string | number>();
</script>
