<template>
  <div v-for="item in elements" :key="item.id">
    <h-renderer-engine v-model="state[getDefaultModel(item).name]" :schemas="[item.schema]"></h-renderer-engine>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive, watch } from 'vue';

import type { Element } from '/@/declarations';

import { isEmpty } from 'lodash-es';

export default defineComponent({
  name: 'HRendererForm',

  props: {
    modelValue: { type: Object as PropType<Record<string, any>>, default: () => ({}), required: true },
    elements: { type: Array as PropType<Array<Element>>, required: true }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const modelObject = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const getDefaultModel = (item: Element) => {
      return item.schema.models.modelValue;
    };

    const getModelDefaultValue = (type: string) => {
      switch (type) {
        case 'Number':
          return 0;
        case 'Array':
          return [];
        case 'Object':
          return {};
        default:
          return '';
      }
    };

    const createModels = () => {
      const models = {} as Record<string, any>;
      if (props.elements) {
        props.elements.map(item => {
          const model = getDefaultModel(item);
          if (model.name) {
            models[model.name] = getModelDefaultValue(model.type);
          }
        });
      }
      return models;
    };

    const assignModels = () => {
      if (isEmpty(modelObject.value)) {
        return createModels();
      } else {
        return modelObject.value
      }
    }

    const state = reactive(assignModels());

    watch(state, newValue => {
      modelObject.value = { ...newValue };
    });

    return {
      getDefaultModel,
      modelObject,
      state
    };
  }
});
</script>
