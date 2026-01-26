<template>
  <q-option-group v-if="isShow" v-model="selectedValue" :options="options" inline v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, nextTick } from 'vue';

import { useDictionary } from '@/composables/hooks';

export default defineComponent({
  name: 'HOptionField',

  props: {
    modelValue: { type: String, default: '' },
    dictionary: { type: String, required: true },
    defaultValue: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const { options, isShow } = useDictionary(props.dictionary);

    onMounted(() => {
      nextTick(() => {
        if (props.defaultValue) {
          selectedValue.value = props.defaultValue;
        }
      });
    });

    return {
      selectedValue,
      options,
      isShow,
    };
  },
});
</script>
