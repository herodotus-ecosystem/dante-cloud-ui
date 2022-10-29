<template>
  <q-toggle v-model="switchValue" :true-value="trueValue" :false-value="falseValue" :color="color" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HSwitch',

  props: {
    modelValue: { type: [Boolean, Number, String], default: false },
    trueValue: { type: [Boolean, Number, String], default: true },
    falseValue: { type: [Boolean, Number, String], default: false },
    color: { type: String, default: 'primary' }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const switchValue = computed({
      get: () => (props.modelValue ? props.modelValue : props.falseValue),
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    return {
      switchValue
    };
  }
});
</script>
