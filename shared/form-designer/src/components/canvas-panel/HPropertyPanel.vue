<template>
  <q-card v-if="isInformationPanel">
    <q-tabs
      v-model="formTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="info" label="信息" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="formTab" animated>
      <q-tab-panel name="info">
        <h-form-information></h-form-information>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <q-card v-else>
    <q-tabs
      v-model="elementTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="display" label="显示" />
      <q-tab name="sheet" label="表单" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="elementTab" animated>
      <q-tab-panel name="display" class="q-pa-none">
        <component :is="currentPanel" :schema="currentSchema"></component>
      </q-tab-panel>

      <q-tab-panel name="sheet" class="q-pa-none">
        <h-sheet-panel></h-sheet-panel>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormCanvasStore } from '@/stores';
import {
  HDatePanel,
  HPasswordPanel,
  HSheetPanel,
  HTextareaPanel,
  HTextFieldPanel,
  HTimePanel,
} from '../property-panels';
import { HFormInformation } from '../canvas-toolbar';

export default {
  name: 'HGeneratorLayout',

  components: {
    HSheetPanel,
    HFormInformation,
    DATE_PICKER: HDatePanel,
    PASSWORD: HPasswordPanel,
    TEXT_AREA: HTextareaPanel,
    TEXT_FIELD: HTextFieldPanel,
    TIME_PICKER: HTimePanel,
  },

  setup() {
    const store = useFormCanvasStore();

    const { isInformationPanel, currentSchema, currentPanel } = storeToRefs(store);
    const formTab = ref<string>('info');
    const elementTab = ref<string>('display');

    return {
      formTab,
      elementTab,
      isInformationPanel,
      currentSchema,
      currentPanel,
    };
  },
};
</script>
