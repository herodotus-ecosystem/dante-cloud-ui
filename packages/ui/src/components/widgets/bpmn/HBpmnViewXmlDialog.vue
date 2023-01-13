<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="max-width: 900px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">BPMN XML 模型</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="isOpen = false" />
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll q-pt-none q-pa-none">
        <highlightjs language="xml" :code="formattedXml" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import vkbeautify from 'vkbeautify';

import { useBpmnModeler } from '/@/hooks';

export default defineComponent({
  name: 'HBpmnViewXmlDialog',

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: Boolean, required: true },
    definitionId: { type: String },
    definitionKey: { type: String },
    definitionTenantId: { type: String }
  },

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const { xml, loadXml } = useBpmnModeler();

    const formattedXml = computed(() => {
      return vkbeautify.xml(xml.value);
    });

    watch(
      () => isOpen,
      newValue => {
        if (newValue) {
          if (props.definitionId || props.definitionKey) {
            loadXml({ id: props.definitionId, key: props.definitionKey, tenantId: props.definitionTenantId });
          }
        }
      },
      { immediate: true }
    );

    return {
      isOpen,
      formattedXml
    };
  }
});
</script>

<style scoped lang="scss">
pre {
  margin: 0;
}
</style>
