<template>
  <h-button-group>
    <h-button icon="mdi-magnify-minus" tooltip="缩小视图" @click="onZoomMinus()"></h-button>
    <h-separator />
    <h-button :label="percentage" disable />
    <h-separator />
    <h-button icon="mdi-magnify-plus" tooltip="放大视图" @click="onZoomPlus()"></h-button>
    <h-separator />
    <h-button
      icon="mdi-magnify-scan"
      tooltip="重置视图并居中"
      @click="onZoomReset('fit-viewport')"
    ></h-button>
  </h-button-group>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed } from 'vue';

import type { Canvas, CanvasViewbox } from '@/declarations';

import { useDesignerStore } from '@/stores';

import { HButton, HButtonGroup, HSeparator } from '../../widgets';
import { isEmpty } from 'lodash-es';

export default defineComponent({
  name: 'HZoomGroup',

  components: {
    HButton,
    HButtonGroup,
    HSeparator,
  },

  setup() {
    const currentScale = ref(1);

    const designer = useDesignerStore();

    let canvas = {} as Canvas;

    nextTick(() => {
      if (!isEmpty(designer.modeler)) {
        canvas = designer.modeler.get<Canvas>('canvas');
        designer.modeler.on('canvas.viewbox.changed', (viewbox: CanvasViewbox) => {
          currentScale.value = viewbox.scale;
        });
      }
    });

    const onZoomReset = (newScale: number | 'fit-viewport' | undefined) => {
      canvas && canvas.zoom(newScale, newScale === 'fit-viewport' ? undefined : { x: 0, y: 0 });
    };

    const onZoomMinus = (step = 0) => {
      currentScale.value = step || Math.floor(currentScale.value * 100 - 0.1 * 100) / 100;
      onZoomReset(currentScale.value);
    };

    const onZoomPlus = (step = 0) => {
      currentScale.value = step || Math.floor(currentScale.value * 100 + 0.1 * 100) / 100;
      onZoomReset(currentScale.value);
    };

    const percentage = computed(() => {
      return Math.floor(currentScale.value * 10) * 10 + '%';
    });

    return {
      onZoomReset,
      onZoomMinus,
      onZoomPlus,
      percentage,
    };
  },
});
</script>
