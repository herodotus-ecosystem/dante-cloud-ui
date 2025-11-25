<template>
  <q-dialog v-model="isOpen" persistent transition-show="scale" transition-hide="scale">
    <q-card :style="`width: ${width}`">
      <q-card-section class="row items-center q-pb-none">
        <div v-if="title" class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="onClose()" />
      </q-card-section>

      <q-card-section v-bind="$attrs">
        <slot></slot>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :label="cancelLabel" color="red" @click="onClose()" />
        <q-btn :disable="confirmDisable" :label="confirmLabel" color="primary" @click="onSave()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HDialog',

  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
    cancelLabel: { type: String, default: '取消' },
    confirmLabel: { type: String, default: '保存' },
    confirmDisable: { type: Boolean, default: false },
    width: { type: String, default: '30vw' }
  },

  emits: ['update:modelValue', 'save'],

  setup(props, { emit }) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const onClose = () => {
      isOpen.value = false;
    };

    const onSave = () => {
      emit('save');
    };

    return {
      isOpen,
      onClose,
      onSave
    };
  }
});
</script>
