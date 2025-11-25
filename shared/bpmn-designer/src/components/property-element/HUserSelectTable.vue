<template>
  <q-table
    dense
    flat
    :rows="tableRows"
    :columns="columns"
    :row-key="rowKey"
    :selection="selection"
    v-model:selected="selectedItems"
    v-model:pagination="pagination"
    :loading="loading"
    @request="findItems"
  >
    <template v-slot:top>
      <h-text-field
        v-model="fieldValue"
        debounce="2000"
        label="姓名"
        dense
        @clear="onClear()"
      ></h-text-field>
    </template>
  </q-table>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, watch, ref } from 'vue';

import type { UserEntity, UserQueryParams, UserSortBy, QTableColumnProps } from '@/declarations';

import { useTableItems } from '@/hooks';
import { useResourceStore } from '@/stores';

import { HTextField } from '../base';

export default defineComponent({
  name: 'HUserSelectTable',

  components: {
    HTextField,
  },

  props: {
    modelValue: {
      type: Array as PropType<Array<UserEntity>>,
      default: () => [] as Array<UserEntity>,
    },
    selection: { type: String as PropType<'single' | 'multiple'>, default: 'single' },
  },

  setup(props, { emit }) {
    const resource = useResourceStore();

    const { tableRows, totalPages, pagination, loading, findItems, conditions } = useTableItems<
      UserEntity,
      UserQueryParams,
      UserSortBy
    >(resource.userService, {
      sortBy: 'userId',
      sortOrder: 'desc',
    });
    const selectedItems = computed({
      get: () => props.modelValue,
      set: (newValue) => {
        emit('update:modelValue', newValue);
      },
    });

    const rowKey = 'id' as keyof UserEntity;
    const fieldValue = ref<string>('');

    watch(fieldValue, (newValue) => {
      if (newValue) {
        conditions.value.firstNameLike = '%' + newValue + '%';
      }
    });

    const columns: QTableColumnProps = [
      { name: 'id', field: 'id', align: 'center', label: 'ID' },
      { name: 'firstName', field: 'firstName', align: 'center', label: '姓名' },
    ];

    const onClear = () => {
      conditions.value = {} as UserQueryParams;
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
      onClear,
    };
  },
});
</script>
