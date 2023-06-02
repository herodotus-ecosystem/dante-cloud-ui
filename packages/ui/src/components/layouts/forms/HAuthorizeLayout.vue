<template>
  <h-detail-container :title="title" :overlay="overlay">
    <h-container mode="two" :offset="2" wider="start">
      <slot></slot>

      <template #right>
        <slot name="right"></slot>
      </template>
    </h-container>
  </h-detail-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HAuthorizeLayout',

  props: {
    overlay: { type: Boolean, default: false },
    title: { type: String, default: '' }
  }
});
</script>
