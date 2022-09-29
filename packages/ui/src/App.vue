<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick, provide, ref, onMounted, onUnmounted } from 'vue';

import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',

  setup() {}
});
</script>

<style lang="scss">
h2 {
  line-height: unset !important;
}

.swal2-container {
  z-index: 10000 !important;
}
</style>
