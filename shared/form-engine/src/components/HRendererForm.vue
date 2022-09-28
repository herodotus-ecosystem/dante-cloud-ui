<template>
  <q-card>
    <q-card-section class="q-pt-none">
      <template v-for="item in dataObjects" :key="item.id">
        <h-renderer-engine v-model="state[getDefaultModel(item).name]" :schemas="[item.schema]"></h-renderer-engine>
      </template>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive, watch } from 'vue';

import type { DataObject } from '/@/declarations';

export default defineComponent({
  name: 'HRendererForm',

  props: {
    modelValue: { type: Object as PropType<Record<string, any>>, default: () => {}, required: true },
    dataObjects: { type: Array as PropType<Array<DataObject>>, required: true }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const modelObject = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const getDefaultModel = (item: DataObject) => {
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
      if (props.dataObjects) {
        props.dataObjects.map(item => {
          const model = getDefaultModel(item);
          if (model.name) {
            models[model.name] = getModelDefaultValue(model.type);
          }
        });
      }
      return models;
    };

    const state = reactive(createModels());

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
