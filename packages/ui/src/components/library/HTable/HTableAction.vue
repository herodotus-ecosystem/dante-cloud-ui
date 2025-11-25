<template>
  <q-toolbar>
    <h-icon-button
      :icon="
        settings.display.table.dense ? 'mdi-arrow-expand-vertical' : 'mdi-arrow-collapse-vertical'
      "
      :tooltip="settings.display.table.dense ? '宽松' : '紧凑'"
      @click="settings.display.table.dense = !settings.display.table.dense"
    ></h-icon-button>
    <q-btn flat round icon="mdi-view-grid-outline">
      <q-tooltip>表格边框</q-tooltip>
      <q-menu auto-close>
        <q-list>
          <h-list-item
            label="显示水平边框"
            icon="mdi-reorder-horizontal"
            @click="onHorizontal()"
          ></h-list-item>
          <h-list-item
            label="显示垂直边框"
            icon="mdi-reorder-vertical"
            @click="onVertical()"
          ></h-list-item>
          <h-list-item label="显示所有边框" icon="mdi-grid" @click="onCell()"></h-list-item>
          <h-list-item label="不显示边框" icon="mdi-grid-off" @click="onNone()"></h-list-item>
        </q-list>
      </q-menu>
    </q-btn>
    <h-icon-button
      :icon="inFullscreen ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'"
      :tooltip="inFullscreen ? '退出全屏' : '全屏显示'"
      @click="toggleFullscreen()"
    ></h-icon-button>
  </q-toolbar>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { QTableSeparatorProps } from '@/lib/declarations';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';

defineProps({
  modelValue: { type: String as PropType<QTableSeparatorProps>, default: 'horizontal' },
  inFullscreen: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'toggleFullscreen']);

const settings = useSettingsStore();

const toggleFullscreen = () => {
  emit('toggleFullscreen');
};

const onHorizontal = () => {
  emit('update:modelValue', 'horizontal');
};

const onVertical = () => {
  emit('update:modelValue', 'vertical');
};

const onCell = () => {
  emit('update:modelValue', 'cell');
};

const onNone = () => {
  emit('update:modelValue', 'none');
};
</script>
