<template>
  <h-button-group>
    <h-button icon="mdi-motion-play" tooltip="开启/关闭流程模拟" @click="toggleSimulation()"></h-button>
    <h-separator />
    <h-button v-if="showMiniMap" icon="mdi-map-outline" tooltip="开启/关闭小地图" @click="toggleMinimap()"></h-button>
    <h-separator />
    <h-button
      v-if="showBpmnLint"
      icon="mdi-alert-circle-check-outline"
      tooltip="开启/关闭模型校验"
      @click="toggleBpmnLint()"></h-button>
  </h-button-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';

import type { Minimap, Linting, ToggleMode } from '/@/declarations';

import { useDesignerStore, useSettingStore } from '/@/stores';

import { HButton, HButtonGroup, HSeparator } from '../../widgets';

export default defineComponent({
  name: 'HToolGroup',

  components: {
    HButton,
    HButtonGroup,
    HSeparator
  },

  setup(props) {
    const designer = useDesignerStore();
    const settings = useSettingStore();

    const { showMiniMap, showBpmnLint } = storeToRefs(settings);

    const toggleSimulation = () => {
      const simulation = designer.modeler.get<ToggleMode>('toggleMode');
      simulation && simulation.toggleMode();
    };

    const toggleMinimap = () => {
      const minimap = designer.modeler.get<Minimap>('minimap');
      minimap && minimap.toggle();
    };

    const toggleBpmnLint = () => {
      const bpmnLint = designer.modeler.get<Linting>('linting');
      bpmnLint && bpmnLint.toggle(!bpmnLint.isActive());
    };

    return {
      showMiniMap,
      showBpmnLint,
      toggleSimulation,
      toggleMinimap,
      toggleBpmnLint
    };
  }
});
</script>
