<template>
  <q-parallax class="window-height" :style="{ backgroundColor: backgroundColor }">
    <h-particles />
    <h-container class="window-width" style="z-index: 2" wider="center" :offset="2">
      <h-row class="justify-center">
        <h-column xl="6" lg="8" md="10" sm="12" xs="12">
          <q-card>
            <q-toolbar class="text-primary">
              <q-btn round class="q-ma-md">
                <q-avatar size="40px" icon="mdi-google-nearby"></q-avatar>
              </q-btn>
              <q-separator vertical inset />
              <q-toolbar-title class="q-ml-md">欢迎使用 {{ projectName }}</q-toolbar-title>
            </q-toolbar>
            <slot></slot>
          </q-card>
        </h-column>
      </h-row>
    </h-container>
    <h-sign-in-background :start-color="lightColor" :end-color="darkColor"></h-sign-in-background>
  </q-parallax>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue';

import { getColorPalette, mixColor } from './color';
import { VARIABLES } from '@/configurations';
import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

defineOptions({
  name: 'HSignInLayout',
});

const settings = useSettingsStore();

const backgroundThemeColor = computed(() => {
  return settings.isLight ? settings.theme.primary : getColorPalette(settings.theme.primary, 7);
});

const backgroundColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = settings.isDark ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
});

const lightColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 3);
});

const darkColor = computed(() => {
  return getColorPalette(backgroundThemeColor.value as string, 6);
});

const projectName = shallowRef(VARIABLES.getProjectName());
</script>

<style lang="scss" scoped>
.q-card {
  box-shadow:
    0 1px 5px rgb(0 0 0 / 20%),
    0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
  border-radius: 1rem;
  vertical-align: top;
  background: #fff;
  position: relative;
}
</style>
