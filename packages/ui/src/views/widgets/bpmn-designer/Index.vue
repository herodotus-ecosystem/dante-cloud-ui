<template>
  <h-bpmn-designer :service="service"></h-bpmn-designer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { bpmnApi } from '/@/lib/utils';

export default defineComponent({
  name: 'WidgetsBpmnDesigner',

  setup() {
    const service = bpmnApi.deployment();

    return {
      service
    };
  }
});
</script>
