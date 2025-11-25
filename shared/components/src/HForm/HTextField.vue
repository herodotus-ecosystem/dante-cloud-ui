<template>
  <q-input v-model="text" outlined clearable bottom-slots v-bind="$attrs">
    <template v-if="$slots.append" #append>
      <slot name="append"></slot>
    </template>

    <template v-if="$slots.before" #before>
      <slot name="before"></slot>
    </template>

    <template v-if="$slots.after" #after>
      <slot name="after"></slot>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HTextField',

  props: {
    modelValue: { type: [String, Number] }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const text = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    return {
      text
    };
  }
});
</script>
