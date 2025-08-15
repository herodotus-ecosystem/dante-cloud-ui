<template>
  <div :class="getClasses()">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { defineComponent, onMounted, reactive } from 'vue';

const constants = {
  row: 'row',
  column: 'column',
  justify: 'justify',
  self: 'self',
  align: 'items',
  gutter: 'q-gutter',
  gutterWithCol: 'q-col-gutter',
};

defineOptions({ name: 'HRow' });

const props = defineProps({
  column: { type: Boolean, default: false },
  self: { type: Boolean, default: false },
  align: { type: String as PropType<'none' | 'start' | 'center' | 'end'>, default: 'none' },
  justify: {
    type: String as PropType<'none' | 'center' | 'end' | 'around' | 'between' | 'evenly'>,
    default: 'none',
  },
  gutter: {
    type: String as PropType<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'none',
  },
  gutterCol: { type: Boolean, default: false },
  /**
   * horizontal gutter
   */
  horizontal: { type: Boolean, default: false },
  /**
   * vertical gutter
   */
  vertical: { type: Boolean, default: false },
});

const classes: string[] = reactive([]);

const createBase = () => {
  return props.column ? constants.column : constants.row;
};

const createGutter = (size = '', direction = '') => {
  let result = constants.gutter;
  if (props.gutterCol) {
    result = constants.gutterWithCol;
  }

  if (direction) {
    result = result + '-' + direction;
  }

  result = result + '-' + size;

  return result;
};

const createJustify = () => {
  if (props.justify !== 'none') {
    return constants.justify + '-' + props.justify;
  } else {
    return '';
  }
};

const createAlign = () => {
  if (props.align !== 'none') {
    let result = constants.align;
    if (props.self) {
      result = constants.self;
    }
    return result + '-' + props.align;
  } else {
    return '';
  }
};

const createHorizontalGutter = (size: string) => {
  return createGutter(size, 'x');
};

const createVerticalGutter = (size: string) => {
  return createGutter(size, 'y');
};

const appendClass = (value: string): void => {
  if (value) {
    classes.push(value);
  }
};

const getClasses = (): string => {
  if (classes.length > 1) {
    return classes.join(' ') as string;
  } else if (classes.length === 1) {
    return classes[0]!;
  } else {
    return constants.row;
  }
};

const initialize = () => {
  appendClass(createBase());
  appendClass(createJustify());
  appendClass(createAlign());

  if (props.gutter !== 'none') {
    if (!props.horizontal && !props.vertical) {
      appendClass(createGutter(props.gutter));
    } else {
      if (props.horizontal) {
        appendClass(createHorizontalGutter(props.gutter));
      }

      if (props.vertical) {
        appendClass(createVerticalGutter(props.gutter));
      }
    }
  }
};

onMounted(() => {
  initialize();
});
</script>
