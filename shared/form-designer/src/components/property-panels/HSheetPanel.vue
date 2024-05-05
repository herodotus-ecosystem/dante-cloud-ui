<template>
  <q-list bordered>
    <h-condition-variable></h-condition-variable>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HConditionVariable } from '../property-elements';

export default defineComponent({
  name: 'HSheetPanel',

  components: {
    HConditionVariable
  }
});
</script>
