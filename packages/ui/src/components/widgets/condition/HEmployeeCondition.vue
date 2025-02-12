<template>
  <q-list>
    <q-expansion-item label="查询条件：" default-opened>
      <q-card>
        <q-card-section>
          <h-row align="center" gutter="md" horizontal>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.employeeName"
                debounce="1000"
                label="姓名"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.mobilePhoneNumber"
                debounce="1000"
                label="手机号码"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-text-field
                v-model="conditionsModelValue.email"
                debounce="1000"
                label="电子邮件"
                dense
                class="q-pb-none"></h-text-field>
            </h-column>
            <h-column :cols="2">
              <h-dictionary-select
                v-model="conditionsModelValue.identity"
                dictionary="identity"
                label="身份"
                dense
                class="q-pb-none"></h-dictionary-select>
            </h-column>
            <h-column :cols="2">
              <h-dictionary-select
                v-model="conditionsModelValue.gender"
                dictionary="gender"
                label="性别"
                dense
                class="q-pb-none"></h-dictionary-select>
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
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

import type { SysEmployeeConditions } from '/@/lib/declarations';

import { HDictionarySelect } from '../manage';

export default defineComponent({
  name: 'HEmployeeCondition',

  components: {
    HDictionarySelect
  },

  props: {
    conditions: { type: Object as PropType<SysEmployeeConditions>, required: true }
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
      conditionsModelValue.value = {} as SysEmployeeConditions;
    };

    return {
      conditionsModelValue,
      onClear
    };
  }
});
</script>
