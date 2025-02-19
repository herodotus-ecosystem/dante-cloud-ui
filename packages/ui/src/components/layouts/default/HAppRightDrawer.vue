<template>
  <q-drawer v-model="application.rightDrawer" side="right" behavior="mobile" bordered :width="300">
    <q-toolbar>
      <q-toolbar-title>系统设置</q-toolbar-title>
      <q-btn
        flat
        @click="application.rightDrawer = !application.rightDrawer"
        round
        dense
        icon="mdi-close-box"
      />
    </q-toolbar>
    <q-separator></q-separator>
    <q-list dense>
      <h-divider label="全局主题" class="q-ma-sm" wider="end" :offset="2"> </h-divider>
      <h-setting-switch
        v-model="settings.theme.mode"
        label="深色主题"
        :true-value="ThemeModeEnum.DARK"
        :false-value="ThemeModeEnum.LIGHT"
      ></h-setting-switch>
      <h-divider label="界面显示" class="q-ma-sm" wider="end" :offset="2"> </h-divider>
      <h-setting-switch
        v-model="settings.display.showBreadcrumbs"
        label="面包屑"
      ></h-setting-switch>
      <h-setting-switch
        v-model="settings.display.showBreadcrumbsIcon"
        label="面包屑图标"
      ></h-setting-switch>
      <h-setting-switch v-model="settings.display.isTabsView" label="多标签页"></h-setting-switch>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useApplicationStore, useSettingsStore } from '@/stores';
import { ThemeModeEnum } from '@/lib/enums';

export default defineComponent({
  name: 'HAppRightDrawer',

  setup() {
    const application = useApplicationStore();
    const settings = useSettingsStore();

    return {
      application,
      settings,
      ThemeModeEnum,
    };
  },
});
</script>
