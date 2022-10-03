<template>
  <div>
    <div class="corner-top">
      <h-sign-in-corner-top :start-color="startColor" :end-color="endColor"></h-sign-in-corner-top>
    </div>
    <div class="corner-bottom">
      <h-sign-in-corner-bottom :start-color="endColor" :end-color="startColor"></h-sign-in-corner-bottom>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HSignInCornerBottom from './HSignInCornerBottom.vue';
import HSignInCornerTop from './HSignInCornerTop.vue';

export default defineComponent({
  name: 'HSignInBackground',

  components: {
    HSignInCornerBottom,
    HSignInCornerTop
  },

  props: {
    startColor: { type: String, required: true },
    endColor: { type: String, required: true }
  }
});
</script>

<style scoped>
.corner-top {
  position: absolute;
  right: -300px;
  top: -900px;
}
.corner-bottom {
  position: absolute;
  left: -200px;
  bottom: -400px;
}
</style>
