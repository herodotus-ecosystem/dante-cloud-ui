<template>
  <q-select
    v-model="selectedValue"
    :option-label="optionLabel"
    :option-value="optionValue"
    outlined
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    :bottom-slots="hasError"
    :error="hasError"
    :error-message="errorMessage"
    v-bind="$attrs"></q-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HSelect',

  props: {
    modelValue: { type: [Number, String, Array, Object] },
    optionLabel: { type: String, default: 'text' },
    optionValue: { type: String, default: 'value' },
    errorMessage: { type: String }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const hasError = computed(() => {
      return props.errorMessage ? true : false;
    });

    return {
      selectedValue,
      hasError
    };
  }
});
</script>
