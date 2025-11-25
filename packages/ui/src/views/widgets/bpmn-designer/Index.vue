<template>
  <q-card>
    <h-bpmn-designer
      :instance="instance"
      height="91vh"
      :class="[$q.dark.isActive ? 'bg-dark text-white q-pt-xs' : 'bg-white text-grey-8 q-pt-xs']"
      @close="onFinish"
    ></h-bpmn-designer>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useEditFinish } from '@/hooks';
import { API } from '@/configurations';

defineOptions({
  name: 'WidgetsBpmnDesigner',
});

const instance = API.bpmnStorage;
const $q = useQuasar();
const { onFinish } = useEditFinish();
</script>
