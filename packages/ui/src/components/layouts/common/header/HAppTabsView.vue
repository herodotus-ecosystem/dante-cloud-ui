<script setup lang="ts">
import { defineOptions, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTabsStore } from '/@/stores';

defineOptions({ name: 'HAppTabsView' });

const route = useRoute();
const store = useTabsStore();

watch(
  () => route.path,
  () => {
    store.smartTab(route);
  },
  { immediate: true }
);
</script>

<template>
  <q-toolbar>
    <q-tabs shrink inline-label outside-arrows mobile-arrows dense active-color="primary">
      <q-route-tab
        class="tab-tabview"
        v-for="(tab, i) in store.tabs"
        :tabindex="i"
        :to="tab.path"
        :key="tab.path"
        :name="tab.path">
        <template v-slot>
          <q-icon size="1.1rem" v-if="tab.meta.icon" :name="tab.meta.icon as string" />
          <span class="tab-label">{{ tab.meta['title'] }}</span>
          <q-icon v-if="store.isLocked(tab)" name="mdi-lock-outline" />
          <q-icon v-else name="close" class="tab-close" @click.prevent.stop="store.closeTab(tab)" />
          <q-menu touch-position context-menu>
            <q-list v-if="i === store.activatedTabIndex" dense bordered separator>
              <q-item :disable="store.disableRefreshCurrentTab" clickable v-close-popup v-ripple>
                <q-item-section @click="store.refreshCurrent()">刷新当前</q-item-section>
              </q-item>
              <q-item clickable v-close-popup v-ripple>
                <q-item-section @click="store.closeOtherTabs()">关闭其它</q-item-section>
              </q-item>
              <q-item :disable="store.disableCloseLeftTabs" clickable v-close-popup v-ripple>
                <q-item-section @click="store.closeLeftTabs()">关闭左侧</q-item-section>
              </q-item>
              <q-item :disable="store.disableCloseRightTabs" clickable v-close-popup v-ripple>
                <q-item-section @click="store.closeRightTabs()">关闭右侧</q-item-section>
              </q-item>
            </q-list>
            <q-list dense bordered separator>
              <q-item clickable v-close-popup v-ripple>
                <q-item-section @click="store.closeAllTabs()">关闭所有</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </template>
      </q-route-tab>
    </q-tabs>
    <q-space />
    <q-btn-dropdown size="sm" color="red">
      <q-list>
        <HListItem
          label="刷新当前"
          :disable="store.disableRefreshCurrentTab"
          icon="mdi-refresh"
          @click="store.refreshCurrent()" />
        <HListItem label="关闭其它" icon="mdi-format-horizontal-align-center" @click="store.closeOtherTabs()" />
        <HListItem
          label="关闭左侧"
          :disable="store.disableCloseLeftTabs"
          icon="mdi-format-horizontal-align-right"
          @click="store.closeLeftTabs()" />
        <HListItem
          label="关闭右侧"
          :disable="store.disableCloseRightTabs"
          icon="mdi-format-horizontal-align-left"
          @click="store.closeRightTabs()" />
        <HListItem label="关闭所有" :disable="false" icon="mdi-broom" @click="store.closeAllTabs()" />
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<style lang="scss" scoped>
.tab-tabview {
  padding: 0 8px;
}

.tab-label {
  margin: 0 7px;
  white-space: nowrap;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-close {
  display: inline-flex;
  font-size: 20px;
  border-radius: 4px;
  padding: 2px;
  opacity: 0.5;
  transition: all 0.3s;

  &:hover {
    opacity: 3;
    background-color: #b7bcd1;
  }
}
</style>
