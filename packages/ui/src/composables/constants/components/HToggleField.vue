<template>
  <q-btn-toggle v-if="isShow" v-model="selectedValue" :options="options" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';

import { useDictionary } from '../hooks';
import { nextTick } from 'vue';

export default defineComponent({
  name: 'HToggleField',

  props: {
    modelValue: { type: String, default: '' },
    dictionary: { type: String, required: true },
    defaultValue: { type: String },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
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
