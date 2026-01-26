<template>
  <h-bpmn-diagram-viewer
    v-model="isOpen"
    :diagram="xml"
    :nodes="activityNodes"
    height="450px"
    width="800px"
    max-width="80vw"
    title="流程图"
  ></h-bpmn-diagram-viewer>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';

import { useBpmnModeler } from '../hooks';
import { isEmpty } from 'lodash-es';

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
          if (!isEmpty(newValue)) {
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
