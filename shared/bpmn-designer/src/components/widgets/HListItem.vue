<template>
  <q-item clickable v-close-popup v-ripple class="q-mb-sm">
    <q-item-section avatar>
      <q-avatar size="md" round dense color="primary" text-color="white" :icon="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HListItem',

  props: {
    label: { type: String },
    icon: { type: String }
  }
});
</script>
