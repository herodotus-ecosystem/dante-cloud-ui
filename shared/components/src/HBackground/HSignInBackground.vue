<template>
  <div>
    <div class="corner-top">
      <h-sign-in-corner-top :start-color="startColor" :end-color="endColor"></h-sign-in-corner-top>
    </div>
    <div class="corner-bottom">
      <h-sign-in-corner-bottom
        :start-color="endColor"
        :end-color="startColor"
      ></h-sign-in-corner-bottom>
    </div>
  </div>
</template>

<script setup lang="ts">
import HSignInCornerBottom from './HSignInCornerBottom.vue';
import HSignInCornerTop from './HSignInCornerTop.vue';

defineOptions({
  name: 'HSignInBackground',
  components: {
    HSignInCornerBottom,
    HSignInCornerTop,
  },
});

interface Props {
  startColor: string;
  endColor: string;
}

defineProps<Props>();
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
