<template>
  <div class="q-gutter-y-md">
    <h-row gutter="md" gutter-col horizontal>
      <h-column>
        <h-workbench-workflow></h-workbench-workflow>
      </h-column>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { HWorkbenchWorkflow } from './workflow';

export default defineComponent({
  name: 'HWorkbench',

  components: {
    HWorkbenchWorkflow
  },

  setup(props) {
    return {};
  }
});
</script>
