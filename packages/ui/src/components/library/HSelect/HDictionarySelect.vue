<template>
  <q-select
    v-model="selectedValue"
    :options="options"
    :option-disable="disableOption"
    :name="dictionary"
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
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

import type { Dictionary } from '@/lib/declarations';

import { isEmpty } from 'lodash-es';
import { useDictionary } from '../hooks';

export default defineComponent({
  name: 'HDictionarySelect',

  props: {
    modelValue: { type: [Number, String, Array, Object] },
    dictionary: { type: String, required: true },
    /**
     * 禁用 Item 的值列表
     */
    disableItems: { type: Array as PropType<Array<string>>, default: () => [] },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const selectedValue = computed({
      // 子组件v-model绑定 计算属性, 一旦发生变化, 就会给父组件传递值
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const { options } = useDictionary(props.dictionary);

    const disableOption = (option: Dictionary) => {
      if (!isEmpty(props.disableItems) && props.disableItems.includes(option.label)) {
        return true;
      } else {
        return false;
      }
    };

    return {
      selectedValue,
      options,
      disableOption,
    };
  },
});
</script>
