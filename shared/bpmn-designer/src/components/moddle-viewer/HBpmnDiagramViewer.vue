<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card :style="`width: ${width}; max-width: ${maxWidth}`">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pt-none q-pa-none">
        <h-bpmn-viewer
          v-if="isShow"
          :diagram="diagram"
          :nodes="nodes"
          :height="height"
        ></h-bpmn-viewer>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, watch, ref } from 'vue';

import HBpmnViewer from './HBpmnViewer.vue';

export default defineComponent({
  name: 'HBpmnDiagramViewer',

  components: {
    HBpmnViewer,
  },

  props: {
    modelValue: { type: Boolean, required: true },
    diagram: { type: String, required: true },
    nodes: { type: Array as PropType<Array<string>>, default: () => [] },
    title: { type: String, default: '' },
    width: { type: String, default: '800px' },
    height: { type: String, default: '450px' },
    maxWidth: { type: String, default: '80vh' },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const isShow = ref(false);

    watch(
      () => props.diagram,
      (newValue) => {
        if (newValue) {
          isShow.value = true;
        } else {
          isShow.value = false;
        }
      },
      { immediate: true },
    );

    return {
      isOpen,
      isShow,
    };
  },
});
</script>
