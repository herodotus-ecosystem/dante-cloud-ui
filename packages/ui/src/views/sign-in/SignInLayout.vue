<template>
  <q-parallax class="window-height" :style="{ backgroundColor: backgroundColor }">
    <h-button color="primary" label="新建菜单"></h-button>
    <h-particles></h-particles>
    <h-sign-in-background :start-color="lightColor" :end-color="darkColor"></h-sign-in-background>
  </q-parallax>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useSettingsStore } from '/@/stores';
import { getColorPalette, mixColor } from '/@/lib/utils';

export default defineComponent({
  name: 'SignInLayout',

  setup(props) {
    const settings = useSettingsStore();

    const backgroundThemeColor = computed(() => {
      return settings.isDark ? getColorPalette(settings.getThemePrimary, 7) : settings.getThemePrimary;
    });

    const backgroundColor = computed(() => {
      const COLOR_WHITE = '#ffffff';
      const ratio = settings.isDark ? 0.5 : 0.2;
      return mixColor(COLOR_WHITE, settings.getThemePrimary, ratio);
    });

    const lightColor = computed(() => {
      return getColorPalette(backgroundThemeColor.value, 3);
    });

    const darkColor = computed(() => {
      return getColorPalette(backgroundThemeColor.value, 6);
    });

    return {
      backgroundColor,
      lightColor,
      darkColor
    };
  }
});
</script>

<style lang="scss" scoped>
.q-card {
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 1rem;
  vertical-align: top;
  background: #fff;
  position: relative;
}
</style>
