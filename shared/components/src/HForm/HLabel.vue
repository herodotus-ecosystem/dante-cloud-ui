<template>
  <div :class="display">{{ text }}</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';

defineOptions({ name: 'HLabel' });

const props = defineProps({
  size: {
    type: String as PropType<
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'caption'
      | 'overline'
      | 'subtitle-1'
      | 'subtitle-2'
      | 'body-1'
      | 'body-2'
    >,
    default: '',
  },
  weight: {
    type: String as PropType<'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder'>,
    default: 'medium',
  },
  align: { type: String as PropType<'left' | 'right' | 'center' | 'justify'>, default: 'center' },
  text: { type: String, required: true },
});

const getTextClass = (value: string) => {
  return 'text-' + value;
};

const getWeight = () => {
  return 'font-weight-' + props.weight;
};

const getTypography = () => {
  if (props.size) {
    return getTextClass(props.size);
  } else {
    return '';
  }
};

const getAlignment = () => {
  return getTextClass(props.align);
};

const display = computed(() => {
  const value = [getAlignment(), getWeight()];
  const typography = getTypography();
  if (typography) {
    value.push(typography);
  }

  return value.join(' ');
});
</script>
