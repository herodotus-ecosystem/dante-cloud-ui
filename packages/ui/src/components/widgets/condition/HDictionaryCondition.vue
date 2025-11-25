<template>
  <q-list>
    <q-expansion-item label="查询条件：" default-opened>
      <q-card>
        <q-card-section>
          <h-row align="center" gutter="md" horizontal>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.category"
                debounce="1000"
                label="分类"
                dense
                class="q-pb-none"
              ></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.name"
                debounce="1000"
                label="字面量"
                dense
                class="q-pb-none"
              ></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.label"
                debounce="1000"
                label="显示值"
                dense
                class="q-pb-none"
              ></h-text-field>
            </h-column>
            <h-column :cols="2"></h-column>
            <h-column :cols="2"></h-column>
            <h-column auto>
              <h-button
                color="red"
                icon="mdi-broom"
                tooltip="清空"
                @click.stop="onClear()"
              ></h-button>
            </h-column>
          </h-row>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

import type { SysDictionaryConditions } from '@/lib/declarations';

export default defineComponent({
  name: 'HElementCondition',

  props: {
    conditions: { type: Object as PropType<SysDictionaryConditions>, required: true },
  },

  emits: ['update:conditions'],

  setup(props, { emit }) {
    const conditionsModelValue = computed({
      get: () => props.conditions,
      set: (newValue) => {
        emit('update:conditions', newValue);
      },
    });

    const onClear = () => {
      conditionsModelValue.value = {} as SysDictionaryConditions;
    };

    return {
      conditionsModelValue,
      onClear,
    };
  },
});
</script>
