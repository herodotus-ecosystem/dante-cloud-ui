<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-container></h-app-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HAppContainer } from '/@/components/layouts/default';

export default defineComponent({
  name: 'HDefaultLayout',

  components: {
    HAppContainer
  }
});
</script>
