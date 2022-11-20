<template>
  <div>
    <q-icon name="today" class="text-orange" size="2em" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default {
  name: 'OssTest',

  setup() {
    const element = {
      name: 'q-icon',
      attrs: {
        name: 'warning',
        color: 'warning',
        size: '4rem'
      }
    };

    return { element };
  }
};
</script>
