<template>
  <div :class="display">{{ text }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'HLabel' });

interface Props {
  size?:
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
    | '';
  weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder';
  align?: 'left' | 'right' | 'center' | 'justify';
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: '',
  weight: 'medium',
  align: 'center',
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
