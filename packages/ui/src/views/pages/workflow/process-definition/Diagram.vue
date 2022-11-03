<template>
  <q-dialog v-model="isOpen">
    <q-card style="width: 350px">
      <q-linear-progress :value="0.6" color="pink" />

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">The Walker</div>
          <div class="text-grey">Fitz & The Tantrums</div>
        </div>

        <q-space />

        <q-btn flat round icon="fast_rewind" />
        <q-btn flat round icon="pause" />
        <q-btn flat round icon="fast_forward" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { BpmnPathParams, ProcessDefinition, ProcessDefinitionQueryParams, QTableProps } from '/@/lib/declarations';

import { useBpmnTableItems } from '/@/hooks';
import { bpmnApi } from '/@/lib/utils';

export default defineComponent({
  name: 'ProcessDefinitionDiagram',

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

    const getDiagram = () => {
      if (props.id || props.definitionKey) {
        const params: BpmnPathParams = {
          id: props.id,
          key: props.definitionKey,
          tenantId: props.tenantId
        };

        bpmnApi
          .processDefinition()
          .getDiagram(params)
          .then(result => {
            console.log(result);
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
      isOpen
    };
  }
});
</script>
