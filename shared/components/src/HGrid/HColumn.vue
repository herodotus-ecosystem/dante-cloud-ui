<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { createColClass, createTextColor, Grid, BreakPointEnum } from '/@/lib';

export default defineComponent({
  name: 'HColumn',

  props: {
    cols: { type: [String, Number], default: '' },
    xs: { type: String, default: '' },
    sm: { type: String, default: '' },
    md: { type: String, default: '' },
    lg: { type: String, default: '' },
    xl: { type: String, default: '' },
    auto: { type: Boolean, default: false },
    color: { type: String, default: '' }
  },

  setup(props) {
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

    return { classes };
  }
});
</script>
