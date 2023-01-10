<template>
  <q-dialog v-model="isOpen">
    <q-card class="full-width">
      <q-linear-progress :value="0.6" color="pink" />

      <q-card-section class="row items-center no-wrap">
        <h-bpmn-viewer :diagram="xml"></h-bpmn-viewer>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type {
  BpmnPathParams,
  ProcessDefinitionXml,
  ProcessDefinitionQueryParams,
  QTableProps
} from '/@/lib/declarations';

import { useBpmnTableItems } from '/@/hooks';
import { bpmnApi } from '/@/lib/utils';

export default defineComponent({
  name: 'WorkflowProcessDefinitionDiagram',

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: Boolean, required: true },
    id: { type: String },
    definitionKey: { type: String },
    tenantId: { type: String }
  },

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const xml = ref('');

    const getDiagram = () => {
      if (props.id || props.definitionKey) {
        const params: BpmnPathParams = {
          id: props.id,
          key: props.definitionKey,
          tenantId: props.tenantId
        };

        bpmnApi
          .processDefinition()
          .getXml(params)
          .then(result => {
            console.log(result);
            const data = result as ProcessDefinitionXml;
            xml.value = data.bpmn20Xml;
          })
          .catch(error => {
            console.error('Get Diagram Error!', error);
          });
      } else {
        console.error('ID and key must have one of them!');
      }
    };

    onMounted(() => {
      getDiagram();
    });

    return {
      isOpen,
      xml
    };
  }
});
</script>
