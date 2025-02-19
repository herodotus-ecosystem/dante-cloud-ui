<template>
  <q-list>
    <q-expansion-item label="查询条件：" default-opened>
      <q-card>
        <q-card-section>
          <h-row align="center" gutter="md" horizontal>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.path"
                debounce="1000"
                label="请求路径"
                dense
                class="q-pb-none"
              ></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.title"
                debounce="1000"
                label="组件标题"
                dense
                class="q-pb-none"
              ></h-text-field
            ></h-column>
            <h-column :cols="2"></h-column>
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

import type { SysElementConditions } from '@/lib/declarations';

export default defineComponent({
  name: 'HElementCondition',

  props: {
    conditions: { type: Object as PropType<SysElementConditions>, required: true },
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
      conditionsModelValue.value = {} as SysElementConditions;
    };

    return {
      conditionsModelValue,
      onClear,
    };
  },
});
</script>
