<template>
  <q-card>
    <h-bpmn-designer
      :instance="instance"
      height="91vh"
      :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']"
      @close="onFinish"></h-bpmn-designer>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useEditFinish } from '/@/hooks';
import { BpmnDesignerInstance } from '/@/lib/utils';

export default defineComponent({
  name: 'WidgetsBpmnDesigner',

  setup() {
    const instance = BpmnDesignerInstance;

    const { onFinish } = useEditFinish();

    return {
      instance,
      onFinish
    };
  }
});
</script>
