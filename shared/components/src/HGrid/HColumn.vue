<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { createColClass, createTextColor, Grid, BreakPointEnum } from '@/lib';

defineOptions({ name: 'HColumn' });

interface Props {
  cols?: string | number;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  auto?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  cols: '',
  xs: '',
  sm: '',
  md: '',
  lg: '',
  xl: '',
  auto: false,
  color: '',
});

const classes = computed(() => {
  let result = [];

  if (props.auto) {
    result.push(createColClass(Grid.auto));
  } else {
    if (props.cols) {
      result.push(createColClass('', props.cols as string));
    } else {
      result.push(createColClass());

      if (props.xs) {
        result.push(createColClass(BreakPointEnum.xs, props.xs));
      }

      if (props.sm) {
        result.push(createColClass(BreakPointEnum.sm, props.sm));
      }

      if (props.md) {
        result.push(createColClass(BreakPointEnum.md, props.md));
      }

      if (props.lg) {
        result.push(createColClass(BreakPointEnum.lg, props.lg));
      }

      if (props.xl) {
        result.push(createColClass(BreakPointEnum.xl, props.xl));
      }
    }
  }

  if (props.color) {
    result.push(createTextColor(props.color));
  }
  return result;
});
</script>
