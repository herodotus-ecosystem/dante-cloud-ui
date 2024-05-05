<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">预览</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="onClose()" />
      </q-card-section>

      <q-card-section>
        <h-renderer-form v-model="state" :elements="canvasElements"></h-renderer-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-red">
        <q-btn flat label="确定" @click="onClose()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, Ref, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useFormCanvasStore } from '/@/stores';

import { HRendererForm } from '../library';

export default defineComponent({
  name: 'HFormPreviewDialog',

  components: {
    HRendererForm
  },

  props: {
    modelValue: { type: Boolean, default: false }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const store = useFormCanvasStore();
    const { canvasElements } = store;

    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const onClose = () => {
      isOpen.value = false;
    };

    const state = ref({}) as Ref<Record<string, any>>;

    return {
      isOpen,
      state,
      canvasElements,
      onClose
    };
  }
});
</script>
