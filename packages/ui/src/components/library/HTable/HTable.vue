<template>
  <q-table
    :loading="loading"
    :separator="separator"
    :dense="settings.display.table.dense"
    :rows-per-page-options="rowsPerPageOptions"
    :rows="rows"
    v-bind="$attrs"
  >
    //@ts-ignore
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
      <slot :name="slotName" v-bind="props" />
    </template>

    <template v-if="!$slots['top-right']" #top-right="props">
      <h-table-action
        v-model="separator"
        :inFullscreen="props.inFullscreen"
        @toggle-fullscreen="props.toggleFullscreen"
      ></h-table-action>
    </template>

    <template v-if="loading && !$slots.loading" #loading>
      <h-loading type="DOTS" size="100px"></h-loading>
    </template>

    <template v-if="!showAll && !$slots.pagination" #pagination>
      <h-pagination v-model="pageNumberVModel" :max="totalPages" />
    </template>

    <template v-if="reserved && !$slots['body-cell-reserved']" #body-cell-reserved="props">
      <q-td key="reserved" :props="props">
        <h-reserved-column :status="props.row.reserved"></h-reserved-column>
      </q-td>
    </template>

    <template v-if="status && !$slots['body-cell-status']" #body-cell-status="props">
      <q-td key="status" :props="props">
        <h-status-column
          v-if="options"
          :type="props.row.status"
          :options="options"
        ></h-status-column>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import type { PropType, ShallowRef } from 'vue';
import { computed, shallowRef } from 'vue';

import type { Entity, QTableSeparatorProps } from '@/lib/declarations';

import { useSettingsStore } from '@herodotus-cloud/framework-kernel';
import { useDictionary } from '@/composables/constants';

import HTableAction from './HTableAction.vue';
import HStatusColumn from './HStatusColumn.vue';
import HReservedColumn from './HReservedColumn.vue';

defineOptions({
  name: 'HTable',
  components: {
    HReservedColumn,
    HStatusColumn,
    HTableAction,
  },
});

const props = defineProps({
  rows: { type: Array as PropType<Array<Entity>>, required: true },
  pageNumber: { type: Number, default: 0 },
  totalPages: { type: Number },
  loading: { type: Boolean, default: false },
  showAll: { type: Boolean, default: false },
  status: { type: Boolean, default: false },
  reserved: { type: Boolean, default: false },
});

const emit = defineEmits(['update:pageNumber']);

const settings = useSettingsStore();
const { options } = useDictionary('DataItemStatus');
const separator = shallowRef('horizontal') as ShallowRef<QTableSeparatorProps>;

const pageNumberVModel = computed({
  get: () => props.pageNumber,
  set: (newValue) => {
    emit('update:pageNumber', newValue);
  },
});

const rowsPerPageOptions = computed(() => {
  return props.showAll ? [0] : [5, 10, 15, 20, 25, 50];
});
</script>
