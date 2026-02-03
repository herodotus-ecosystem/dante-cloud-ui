<template>
  <div class="row text-center" :style="`height: ${height}`">
    <div class="col-12 self-center">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'HCenterLabel' });

interface Props {
  height?: string;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  height: '100px',
});
</script>
