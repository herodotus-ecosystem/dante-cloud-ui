<template>
  <q-btn-group class="q-ml-xs">
    <slot></slot>
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HButtonGroup'
});
</script>
