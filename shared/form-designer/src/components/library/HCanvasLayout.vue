<template>
  <q-page-container>
    <q-page>
      <q-card class="q-ma-md">
        <slot></slot>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HCanvasLayout'
});
</script>
