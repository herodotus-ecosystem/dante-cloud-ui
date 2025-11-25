<template>
  <q-expansion-item expand-separator :header-class="headerClass" v-bind="$attrs">
    <q-card>
      <q-card-section><slot></slot></q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HExpansionItem',

  props: {
    headerClass: { type: String, default: 'text-primary' }
  }
});
</script>
