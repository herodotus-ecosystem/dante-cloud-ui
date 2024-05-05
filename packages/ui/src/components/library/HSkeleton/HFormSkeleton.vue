<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-skeleton v-for="i in number" :key="i" type="QInput" />
      <div>
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HFormSkeleton',

  props: {
    number: { type: Number, default: 5 }
  }
});
</script>
