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

<script setup lang="ts">
import { watch, ref, shallowRef } from 'vue';

import { moment } from '@herodotus-cloud/core';

import { DURATION_UNITS } from '@/lib/utils';

import { HSelect, HTextField } from '../HForm';
import { HContainer } from '../HGrid';

defineOptions({
  name: 'HDuration',
  components: {
    HSelect,
    HTextField,
    HContainer,
  },
});

const durationValue = defineModel<string | number>({
  default: '',
});

const amount = shallowRef(0);
const unit = shallowRef('');
const options = ref(DURATION_UNITS);

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
  durationValue,
  (newValue) => {
    if (newValue) {
      convertDurationToData(newValue);
    }
  },
  {
    immediate: true,
  },
);

watch(unit, (newValue) => {
  if (newValue) {
    convertDataToDuration(amount.value, newValue);
  }
});

watch(amount, (newValue) => {
  if (newValue) {
    convertDataToDuration(newValue, unit.value);
  }
});
</script>
