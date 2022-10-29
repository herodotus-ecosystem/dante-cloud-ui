<template>
  <h-bpmn-designer :service="service"></h-bpmn-designer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { api } from '/@/lib/utils';

export default defineComponent({
  name: 'WorkflowDeployment',

  setup() {
    const service = api.bpmnDeployment();

    return {
      service
    };
  }
});
</script>
