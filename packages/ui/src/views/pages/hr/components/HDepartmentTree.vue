<template>
  <q-card>
    <q-card-section dense>
      <div class="text-h6 q-mb-sm">单位下设部门</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-tree
        v-if="!hasNoDepartments"
        :nodes="treeItems"
        node-key="id"
        label-key="name"
        selected-color="primary"
        v-model:selected="selectedValue"
        default-expand-all
        no-results-label="请先在右侧选择单位"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';

import type { SysDepartmentEntity, SysDepartmentConditions } from '@/composables/declarations';
import { API } from '@/configurations';
import { useTreeItems } from '@/composables/hooks';
import { isEmpty } from 'lodash-es';

export default defineComponent({
  name: 'HDepartmentTree',

  props: {
    selected: { type: String },
    organizationId: { type: String, default: '' },
  },

  emits: ['update:selected'],

  setup(props, { emit }) {
    const { treeItems, conditions } = useTreeItems<SysDepartmentEntity, SysDepartmentConditions>(
      API.core.sysDepartment(),
      false,
    );

    const selectedValue = computed({
      get: () => props.selected,
      set: (newValue) => {
        emit('update:selected', newValue);
      },
    });

    const hasNoDepartments = computed(() => {
      return isEmpty(treeItems.value);
    });

    watch(
      () => props.organizationId,
      (newValue: string) => {
        if (newValue) {
          conditions.value.organizationId = newValue;
          selectedValue.value = '';
        }
      },
    );

    return {
      treeItems,
      selectedValue,
      conditions,
      hasNoDepartments,
    };
  },
});
</script>
