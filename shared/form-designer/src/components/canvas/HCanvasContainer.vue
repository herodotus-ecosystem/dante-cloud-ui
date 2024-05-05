<template>
  <h-canvas-layout>
    <draggable item-key="id" :list="canvasElements" :animation="300" group="widgetGroup" class="canvas-container">
      <template #item="{ element }">
        <h-canvas-element
          :element="element"
          :key="element.config.renderKey"
          :selected-id="element.config.renderKey"
          @click="onSelectedItem(element)"></h-canvas-element>
      </template>
      <template v-if="isEmptyCanvas" #footer>
        <div class="row text-center canvas-container">
          <div class="col-12 self-center text-h6 text-weight-medium text-grey-5">从左侧拖拽或点击来添加字段</div>
        </div>
      </template>
    </draggable>
  </h-canvas-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';
import Draggable from 'vuedraggable';

import type { Element } from '/@/declarations';

import { useFormCanvasStore } from '/@/stores';
import { HCanvasLayout } from '../library';
import HCanvasElement from './HCanvasElement.vue';

export default defineComponent({
  name: 'HCanvasContainer',

  components: {
    Draggable,
    HCanvasElement,
    HCanvasLayout
  },

  setup(props) {
    const store = useFormCanvasStore();

    // store drawingData 响应式处理
    const { canvasElements } = store;

    const isEmptyCanvas = computed(() => {
      return store.isEmptyCanvas;
    });

    const onSelectedItem = (element: Element) => {
      store.selectElement(element);
    };

    return {
      isEmptyCanvas,
      canvasElements,
      onSelectedItem
    };
  }
});
</script>

<style lang="scss" scoped>
.canvas-container {
  min-height: calc(100vh - 132px);
  .q-card {
    border: 1px dashed #999;
  }
}
</style>
