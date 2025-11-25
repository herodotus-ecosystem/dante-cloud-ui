<template>
  <div class="title-toolbar row items-center q-pr-sm">
    <div class="card-title q-my-xs q-mr-sm cursor-pointer">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HCardTitle',
});

defineProps({
  text: { type: String, default: '' },
});
</script>

<style lang="css" scoped>
.title-toolbar {
  min-height: 40px;
  transition: color 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.card-title {
  margin-left: -12px;
  padding: 4px 8px 4px 28px;
  position: relative;
  border-radius: 3px 5px 5px 0;
  background: #d8e1e5;
  color: #757575;
  font-size: 18px;
  letter-spacing: 0.7px;
}

.card-title:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 0;
  height: 0;
  border: 0 solid transparent;
  border-width: 9px 0 0 11px;
  border-top-color: #b0c2ca;
}
</style>
