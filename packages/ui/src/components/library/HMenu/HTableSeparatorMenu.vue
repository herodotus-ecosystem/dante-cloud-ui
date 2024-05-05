<template>
  <q-menu auto-close>
    <q-list>
      <h-list-item label="显示水平边框" icon="mdi-reorder-horizontal" @click="onHorizontal()"></h-list-item>
      <h-list-item label="显示垂直边框" icon="mdi-reorder-vertical" @click="onVerticall()"></h-list-item>
      <h-list-item label="显示所有边框" icon="mdi-grid" @click="onCell()"></h-list-item>
      <h-list-item label="不显示边框" icon="mdi-grid-off" @click="onNone()"></h-list-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { QTableSeparatorProps } from '/@/lib/declarations';

import { useSettingsStore } from '/@/stores';

export default defineComponent({
  name: 'HTableSeparatorMenu',

  props: {
    modelValue: { type: String as PropType<QTableSeparatorProps>, default: 'horizontal' }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const settings = useSettingsStore();

    const onHorizontal = () => {
      settings.display.table.separator = 'horizontal';
    };

    const onVerticall = () => {
      settings.display.table.separator = 'vertical';
    };

    const onCell = () => {
      settings.display.table.separator = 'cell';
    };

    const onNone = () => {
      settings.display.table.separator = 'none';
    };

    return {
      onHorizontal,
      onVerticall,
      onCell,
      onNone
    };
  }
});
</script>
