<template>
  <q-list>
    <q-expansion-item label="查询条件：" default-opened>
      <q-card>
        <q-card-section>
          <h-row align="center" gutter="md" horizontal>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.actualIp"
                debounce="1000"
                label="IP地址"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.assetId"
                debounce="1000"
                label="资产编号"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.cabinetNumber"
                debounce="1000"
                label="机柜号"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.serialNumber"
                debounce="1000"
                label="序列号"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.hostName"
                debounce="1000"
                label="主机名"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column auto>
              <h-button color="red" icon="mdi-broom" tooltip="清空" @click.stop="onClear()"></h-button>
            </h-column>
          </h-row>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import type { AssetServerConditions } from '/@/lib/declarations';

export default defineComponent({
  name: 'HServerCondition',

  props: {
    conditions: { type: Object as PropType<AssetServerConditions>, required: true }
  },

  emits: ['update:conditions'],

  setup(props, { emit }) {
    const conditionsModelValue = computed({
      get: () => props.conditions,
      set: newValue => {
        emit('update:conditions', newValue);
      }
    });

    const onClear = () => {
      conditionsModelValue.value = {} as AssetServerConditions;
    };

    return {
      conditionsModelValue,
      onClear
    };
  }
});
</script>
