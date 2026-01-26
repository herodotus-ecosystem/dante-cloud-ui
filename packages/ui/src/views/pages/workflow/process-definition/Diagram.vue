<template>
  <q-dialog v-model="isOpen">
    <q-card style="width: 800px; max-width: 80vw">
      <h-bpmn-viewer :diagram="xml" :nodes="['DeptLeaderAudit', 'StartEvent_1']"></h-bpmn-viewer>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref, computed, onMounted } from 'vue';

import type { BpmnUnionPathParams, XmlEntity } from '@/composables/declarations';

import { isEmpty, map } from 'lodash-es';
import { API } from '@/configurations';

export default defineComponent({
  name: 'WorkflowProcessDefinitionDiagram',

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: Boolean, required: true },
    id: { type: String },
    definitionKey: { type: String },
    tenantId: { type: String },
    processInstanceId: { type: String },
  },

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const xml = ref('');
    const activityNodes = ref([]) as Ref<Array<string>>;

    const initActivityNodes = async (processInstanceId: string) => {
      const result = await API.bpmn
        .historyActivityInstance()
        .getAll(
          { sortBy: 'startTime', sortOrder: 'desc' },
          { processInstanceId: processInstanceId },
        );
      if (!isEmpty(result)) {
        const nodes = map(result, 'activityId');
        activityNodes.value.push(...nodes);
      }
    };

    const getXml = () => {};

    const getDiagram = () => {
      if (props.processInstanceId) {
        initActivityNodes(props.processInstanceId);
      }

      if (props.id || props.definitionKey) {
        const params: BpmnUnionPathParams = {
          id: props.id,
          key: props.definitionKey,
          tenantId: props.tenantId,
        };

        API.bpmn
          .processDefinition()
          .getXml(params)
          .then((result) => {
            const data = result as XmlEntity;
            xml.value = data.bpmn20Xml;
          })
          .catch((error) => {
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
      xml,
    };
  },
});
</script>
