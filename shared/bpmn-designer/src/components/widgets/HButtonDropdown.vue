<template>
  <q-btn-dropdown split dense color="primary" :label="label" :icon="icon" class="q-ml-xs">
    <q-list bordered padding class="rounded-borders text-primary">
      <slot></slot>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HButtonDropdown',

  props: {
    label: { type: String },
    icon: { type: String }
  }
});
</script>
