<template>
  <q-select
    v-model="selectedValue"
    :options="items"
    :option-label="optionLabel"
    :option-value="optionValue"
    outlined
    use-chips
    clearable
    emit-value
    map-options
    transition-show="scale"
    transition-hide="scale"
    bottom-slots
    v-bind="$attrs"
  ></q-select>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onBeforeMount } from 'vue';

import type { Dictionary } from '@/lib/declarations';

import { useConstantsStore } from '@/stores';

export default defineComponent({
  name: 'HDictionarySelect',

  props: {
    modelValue: { type: [Number, String, Array, Object] },
    dictionary: { type: String, required: true },
    optionLabel: { type: String, default: 'text' },
    optionValue: { type: String, default: 'value' },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const state = reactive({
      items: [] as Array<Dictionary>,
    });

    const selectedValue = computed({
      // 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const initialize = () => {
      const constants = useConstantsStore();
      state.items = constants.getDictionary(props.dictionary);
    };

    onBeforeMount(() => {
      initialize();
    });

    return {
      ...toRefs(state),
      selectedValue,
    };
  },
});
</script>
