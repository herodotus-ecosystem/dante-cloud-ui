<template>
  <h-expansion-item icon="mdi-variable" label="流程变量">
    <h-text-field v-model="condition.variable" dense label="变量名称" />
    <q-table
      :rows="tableRows"
      :columns="tableColumns"
      row-key="name"
      dense
      flat
      bordered
      hide-pagination
      card-container-class="q-ml-2"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="label" :props="props">
            {{ props.row.label }}
            <q-popup-edit
              v-model="props.row.label"
              title="修改标签"
              buttons
              label-set="确定"
              label-cancel="取消"
              v-slot="scope"
              @update:model-value="onModify"
            >
              <q-input v-model="scope.value" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="value" :props="props">
            {{ props.row.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </h-expansion-item>
</template>

<script lang="ts">
import type { Ref } from 'vue';
import { defineComponent, ref } from 'vue';

import type { QBaseDataItem, QTableColumnProps } from '@/declarations';

import { HTextField, HExpansionItem } from '@/components/library';
import { useFormCanvasStore } from '@/stores';

export default defineComponent({
  name: 'HConditionVariable',

  components: {
    HExpansionItem,
    HTextField,
  },

  setup(props) {
    const store = useFormCanvasStore();

    const { condition } = store;

    const tableColumns: QTableColumnProps = [
      { align: 'center', name: 'label', field: 'calories', label: '标签' },
      { align: 'center', name: 'value', field: 'fat', label: '值' },
    ];

    const tableRows = ref([
      { label: 'option1', value: true },
      { label: 'option2', value: false },
    ]) as Ref<Array<QBaseDataItem<boolean>>>;

    const onModify = () => {
      condition.options = tableRows.value;
    };

    return {
      tableColumns,
      tableRows,
      condition,
      onModify,
    };
  },
});
</script>
