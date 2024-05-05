<template>
  <q-table
    dense
    flat
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    selection="multiple"
    v-model:selected="selectedItems"
    v-model:pagination="pagination"
    :loading="loading"
    @request="findItems">
    <template v-slot:top>
      <h-text-field v-model="fieldValue" debounce="1000" label="名称" dense @clear="onClear()"></h-text-field>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from 'vue';

import type { GroupEntity, GroupQueryParams, GroupSortBy, QTableColumnProps } from '/@/declarations';

import {useTableItems} from '/@/hooks';
import { useResourceStore } from '/@/stores';

import { HTextField } from '../base';

export default defineComponent({
  name: 'HGroupSelectTable',

  components: {
    HTextField
  },

  props: {
    modelValue: { type: Array as PropType<Array<GroupEntity>>, default: () => [] as Array<GroupEntity> }
  },

  setup(props, { emit }) {
    const resource = useResourceStore();

    const { tableRows, totalPages, pagination, loading, findItems, conditions } = useTableItems<
      GroupEntity,
      GroupQueryParams,
      GroupSortBy
    >(resource.groupService, {
      sortBy: 'id',
      sortOrder: 'desc'
    });

    const selectedItems = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const rowKey = 'id' as keyof GroupEntity;
    const fieldValue = ref<string>('');

    watch(fieldValue, newValue => {
      if (newValue) {
        conditions.value.nameLike = '%' + newValue + '%';
      }
    });

    const columns: QTableColumnProps = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'name', field: 'name', align: 'center', label: '名称' },
      { name: 'type', field: 'type', align: 'center', label: '类型' }
    ];

    const onClear = () => {
      conditions.value = {} as GroupQueryParams;
    };

    return {
      tableRows,
      totalPages,
      pagination,
      loading,
      fieldValue,
      selectedItems,
      rowKey,
      columns,
      findItems,
      onClear
    };
  }
});
</script>
