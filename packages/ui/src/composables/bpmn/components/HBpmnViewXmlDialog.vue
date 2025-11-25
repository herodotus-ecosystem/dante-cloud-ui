<template>
  <h-bpmn-code-previewer v-model="isOpen" :data="xml" language="xml"></h-bpmn-code-previewer>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';

import { useBpmnModeler } from '../hooks';

export default defineComponent({
  name: 'HBpmnViewXmlDialog',

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: Boolean, required: true },
    definitionId: { type: String },
    definitionKey: { type: String },
    definitionTenantId: { type: String },
  },

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      },
    });

    const { xml, loadXml } = useBpmnModeler();

    watch(
      () => isOpen,
      newValue => {
        if (newValue) {
          if (props.definitionId || props.definitionKey) {
            loadXml({ id: props.definitionId, key: props.definitionKey, tenantId: props.definitionTenantId });
          }
        }
      },
      { immediate: true },
    );

    return {
      isOpen,
      xml,
    };
  },
});
</script>

<style scoped lang="scss">
pre {
  margin: 0;
}
</style>
