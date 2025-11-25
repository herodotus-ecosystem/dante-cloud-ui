<template>
  <h-container mode="two" gutter="xs" gutter-col horizontal>
    <template #left>
      <h-text-field
        v-model.number="amount"
        label="数值"
        placeholder="请输入数值"
        type="number"
        hide-hint
      />
    </template>

    <template #right>
      <h-select v-model="unit" :options="options" label="单位" hide-hint></h-select>
    </template>
  </h-container>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue';

import { moment, DURATION_UNITS } from '@/lib/utils';
import { HSelect, HTextField } from '../HForm';
import { HContainer } from '../HGrid';

export default defineComponent({
  name: 'HDuration',

  components: {
    HSelect,
    HTextField,
    HContainer,
  },

  props: {
    modelValue: { type: [String, Number], defalut: '' },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const amount = ref(0);
    const unit = ref('');
    const options = ref(DURATION_UNITS);

    const durationValue = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const convertDurationToData = (value: number | string) => {
      if (value) {
        let duration = moment.duration(value, 'second');
        if (duration) {
          // @ts-ignore
          const data = duration._data;
          for (let item in data) {
            let key = item;
            let value = data[key];
            if (value) {
              amount.value = value;
              unit.value = key;
            }
          }
        }
      }
    };

    const convertDataToDuration = (amount: number, unit: string) => {
      if (amount && unit) {
        const u = unit as moment.unitOfTime.DurationConstructor;
        const result = moment.duration(amount, u).toISOString();
        durationValue.value = result;
      }
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          convertDurationToData(newValue);
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => unit.value,
      (newValue) => {
        if (newValue) {
          convertDataToDuration(amount.value, newValue);
        }
      },
    );

    watch(
      () => amount.value,
      (newValue) => {
        if (newValue) {
          convertDataToDuration(newValue, unit.value);
        }
      },
    );

    return {
      durationValue,
      amount,
      unit,
      options,
    };
  },
});
</script>
