<template>
  <h-button flat round :color="color" :dense="dense" :size="size" v-bind="$attrs"></h-button>
</template>

<script setup lang="ts">
import HButton from './HButton.vue';

defineOptions({
  name: 'HIconButton',
  components: {
    HButton,
  },
});

interface Props {
  color?: string;
  size?: string;
  dense?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: '',
  size: '',
  dense: false,
});
</script>
