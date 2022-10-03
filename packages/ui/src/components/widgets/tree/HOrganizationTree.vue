<template>
  <q-card>
    <q-card-section>
      <h-dictionary-select
        v-model="conditions.category"
        dictionary="organizationCategory"
        label="组织类别"
        dense
        class="q-pb-none"></h-dictionary-select>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <q-tree
        :nodes="treeItems"
        node-key="id"
        label-key="name"
        selected-color="primary"
        v-model:selected="selectedValue"
        default-expand-all />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

import type { SysOrganization, SysOrganizationConditions } from '/@/lib/declarations';
import { api } from '/@/lib/utils';
import { useTreeItems } from '/@/hooks';

import { HDictionarySelect } from '../select';

export default defineComponent({
  name: 'HOrganizationTree',

  components: {
    HDictionarySelect
  },

  props: {
    selected: { type: String }
  },

  emits: ['update:selected'],

  setup(props, { emit }) {
    const { treeItems, conditions } = useTreeItems<SysOrganization, SysOrganizationConditions>(api.sysOrganization());

    const selectedValue = computed({
      get: () => props.selected,
      set: newValue => {
        emit('update:selected', newValue);
      }
    });

    return {
      treeItems,
      selectedValue,
      conditions
    };
  }
});
</script>
