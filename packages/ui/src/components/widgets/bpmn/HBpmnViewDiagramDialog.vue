<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">BPMN 流程图</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-none q-pa-none">
        <h-bpmn-viewer
          v-if="isShow"
          :diagram="xml"
          :nodes="activityNodes"
          height="450px"
        ></h-bpmn-viewer>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

import { useBpmnModeler } from '@/hooks';
import { lodash } from '@/lib/utils';

export default defineComponent({
  name: 'HBpmnViewDiagramDialog',

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: Boolean, required: true },
    definitionId: { type: String },
    definitionKey: { type: String },
    definitionTenantId: { type: String },
    instanceId: { type: String },
  },

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const { xml, activityNodes, loadDiagram } = useBpmnModeler();

    const isShow = ref(false);

    watch(isOpen, (newValue) => {
      if (newValue) {
        if (props.definitionId || props.definitionKey) {
          loadDiagram(
            {
              id: props.definitionId,
              key: props.definitionKey,
              tenantId: props.definitionTenantId,
            },
            props.instanceId,
          );
        }
      }
    });

    watch(xml, (newValue) => {
      if (newValue) {
        if (!props.instanceId) {
          isShow.value = true;
        } else {
          if (!lodash.isEmpty(newValue)) {
            isShow.value = true;
          }
        }
      }
    });

    return {
      isOpen,
      xml,
      activityNodes,
      isShow,
    };
  },
});
</script>
