<template>
  <q-pagination
    v-model="pageNumber"
    :max="max"
    :max-pages="maxPage"
    boundary-links
    direction-links
    v-bind="$attrs"
    icon-first="skip_previous"
    icon-last="skip_next"
    icon-prev="fast_rewind"
    icon-next="fast_forward" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HPagination',

  props: {
    modelValue: { type: Number, required: true },
    max: { type: Number, default: 0 },
    maxPage: { type: Number, default: 7 }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const pageNumber = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    return {
      pageNumber
    };
  }
});
</script>
