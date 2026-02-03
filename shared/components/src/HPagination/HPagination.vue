<template>
  <q-pagination
    v-model="pageNumber"
    :max="max"
    :max-pages="maxPage"
    boundary-links
    direction-links
    v-bind="$attrs"
    icon-first="skip_previous"
    icon-last="skip_next"
    icon-prev="fast_rewind"
    icon-next="fast_forward"
  />
</template>

<script setup lang="ts">
import { QPagination } from 'quasar';

defineOptions({ name: 'HPagination', components: { QPagination } });

const pageNumber = defineModel({
  type: Number,
  required: true,
});

interface Props {
  max?: number;
  maxPage?: number;
}

withDefaults(defineProps<Props>(), {
  max: 0,
  maxPage: 7,
});
</script>
