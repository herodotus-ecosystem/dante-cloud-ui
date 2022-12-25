<template>
  <div class="row text-center" :style="`height: ${height}`">
    <div class="col-12 self-center">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HCenterLabel',

  props: {
    height: { type: String, default: '100px' },
    text: String
  }
});
</script>
