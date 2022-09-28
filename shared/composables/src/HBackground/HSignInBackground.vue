<template>
  <div>
    <div class="corner-top">
      <h-sign-in-corner-top :start-color="lightColor" :end-color="darkColor"></h-sign-in-corner-top>
    </div>
    <div class="corner-bottom">
      <h-sign-in-corner-bottom :start-color="darkColor" :end-color="lightColor"></h-sign-in-corner-bottom>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';

import { getColorPalette } from '@herodotus/utils';
import HSignInCornerBottom from './HSignInCornerBottom.vue';
import HSignInCornerTop from './HSignInCornerTop.vue';

export default defineComponent({
  name: 'HSignInBackground',

  components: {
    HSignInCornerBottom,
    HSignInCornerTop
  },

  props: {
    themeColor: String
  },

  setup(props) {
    const { themeColor } = toRefs(props);
    const lightColor = computed(() => {
      return getColorPalette(themeColor.value as string, 3);
    });

    const darkColor = computed(() => {
      return getColorPalette(props.themeColor as string, 6);
    });

    return {
      lightColor,
      darkColor
    };
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
