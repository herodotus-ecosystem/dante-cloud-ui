<template>
  <q-toolbar>
    <q-tabs shrink stretch inline-label outside-arrows mobile-arrows dense active-color="primary">
      <q-route-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :tabindex="i"
        :name="tab.name as string"
        :label="tab.meta.title as string"
        :icon="tab.meta.icon as string"
        :to="tab.path"
      >
        <q-icon
          v-if="isNotLastTab(i)"
          size="xs"
          name="mdi-close-circle"
          class="q-ml-md"
          @click="onCloseTab(tab)"
        />
        <q-icon v-else size="xs" name="mdi-lock-outline" class="q-ml-md" />
      </q-route-tab>
    </q-tabs>
    <q-space />
    <q-btn-dropdown size="sm" color="red">
      <q-list>
        <h-list-item
          :disable="disableRefreshCurrentTab"
          label="刷新当前"
          icon="mdi-refresh"
          @click="onRefresh"
        ></h-list-item>
        <h-list-item
          label="关闭当前"
          :disable="disableCloseCurrentTab"
          icon="mdi-close"
          @click="onCloseCurrentTab()"
        ></h-list-item>
        <h-list-item
          label="关闭其它"
          icon="mdi-format-horizontal-align-center"
          @click="onCloseOtherTabs()"
        ></h-list-item>
        <h-list-item
          label="关闭左侧"
          :disable="disableCloseLeftTabs"
          icon="mdi-format-horizontal-align-right"
          @click="onCloseLeftTabs()"
        ></h-list-item>
        <h-list-item
          label="关闭右侧"
          :disable="disableCloseRightTabs"
          icon="mdi-format-horizontal-align-left"
          @click="onCloseRightTabs()"
        ></h-list-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<script lang="ts">
import { defineComponent, watch, inject } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import type { Tab } from '@herodotus-cloud/framework-kernel';

import { useTabsViewStore } from '@herodotus-cloud/framework-kernel';
import { refreshTabInjectionKey } from '@/composables/symbols';

export default defineComponent({
  name: 'HAppTabsView',

  setup(props) {
    const route = useRoute();

    const store = useTabsViewStore();
    const {
      tabs,
      isNotLastTab,
      disableCloseCurrentTab,
      disableCloseRightTabs,
      disableCloseLeftTabs,
      disableRefreshCurrentTab,
    } = storeToRefs(store);
    const { closeTab, smartTab, closeCurrentTab, closeOtherTabs, closeLeftTabs, closeRightTabs } =
      store;

    const refreshTab = inject<Function>(refreshTabInjectionKey);

    watch(
      () => route.path,
      () => {
        smartTab(route);
      },
      { immediate: true },
    );

    const onCloseTab = (tab: Tab) => {
      closeTab(tab);
    };

    const onCloseCurrentTab = () => {
      closeCurrentTab();
    };

    const onCloseOtherTabs = () => {
      closeOtherTabs();
    };

    const onCloseLeftTabs = () => {
      closeLeftTabs();
    };

    const onCloseRightTabs = () => {
      closeRightTabs();
    };

    const onRefresh = () => {
      refreshTab && refreshTab();
    };

    return {
      onCloseTab,
      onCloseCurrentTab,
      onCloseOtherTabs,
      onCloseLeftTabs,
      onCloseRightTabs,
      onRefresh,
      tabs,
      isNotLastTab,
      disableCloseCurrentTab,
      disableCloseRightTabs,
      disableCloseLeftTabs,
      disableRefreshCurrentTab,
    };
  },
});
</script>
