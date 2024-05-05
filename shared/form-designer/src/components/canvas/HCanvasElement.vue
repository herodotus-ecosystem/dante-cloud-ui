<template>
  <q-card
    :class="[isSelected && !isHover ? 'canvas-item-selected' : 'canvas-item']"
    @mouseover="isHover = true"
    @mouseleave="isHover = false">
    <h-renderer-engine :schemas="schemas"></h-renderer-engine>
    <q-card-actions v-if="isHover" class="justify-end q-pa-none">
      <q-btn flat round size="sm" color="red" icon="mdi-delete" @click="onDelete" />
      <q-btn flat round size="sm" color="accent" icon="bookmark" />
      <q-btn flat round size="sm" color="primary" icon="share" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import type { Element } from '/@/declarations';

import { useFormCanvasStore } from '/@/stores';
import { HRendererEngine } from '../library';

export default defineComponent({
  name: 'HCanvasElement',

  components: {
    HRendererEngine
  },

  props: {
    element: { type: Object as PropType<Element>, required: true },
    selectedId: { type: Number, required: true }
  },

  setup(props) {
    const isHover = ref(false);
    const store = useFormCanvasStore();

    const schemas = computed(() => {
      return [props.element.schema];
    });

    const isSelected = computed(() => {
      return store.isSelected(props.selectedId);
    });

    const onDelete = () => {
      store.removeElement(props.element);
    };

    return {
      isHover,
      schemas,
      isSelected,
      onDelete
    };
  }
});
</script>

<style lang="scss" scoped>
$selectedColor: #e0e0e0;
$lighterBlue: #1867c0;

.canvas-item {
  &:hover {
    border: 1px dashed #1565c0 !important;
    background: #aecbe0;
    .q-icon {
      color: #1565c0;
    }
  }
}

.canvas-item-selected {
  border: 1px dashed #1565c0 !important;
  background: #e3f2fd;
}
</style>
