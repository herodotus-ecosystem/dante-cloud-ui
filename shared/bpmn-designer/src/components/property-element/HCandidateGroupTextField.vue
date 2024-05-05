<template>
  <div>
    <h-text-field v-model="assignee" dense :label="label">
      <template v-slot:append>
        <q-btn
          round
          dense
          flat
          icon="mdi-text-box-search-outline"
          color="red"
          class="cursor-pointer"
          @click="onOpen()" />
      </template>
    </h-text-field>
    <h-dialog v-model="isOpen" @save="onSave()" :title="title">
      <h-group-select-table v-model="selected"></h-group-select-table>
    </h-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';

import type { GroupEntity } from '/@/declarations';

import { lodash } from '/@/lib/utils';

import { HDialog } from '/@/components/widgets';
import { HTextField } from '/@/components/base';
import HGroupSelectTable from './HGroupSelectTable.vue';

export default defineComponent({
  name: 'HCandidateGroupTextField',

  components: {
    HDialog,
    HGroupSelectTable,
    HTextField
  },

  props: {
    modelValue: { type: String, default: '' },
    label: { type: String },
    title: { type: String }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const assignee = computed({
      get: () => props.modelValue,
      set: newValue => {
        emit('update:modelValue', newValue);
      }
    });

    const isOpen = ref(false);
    const selected = ref([]) as Ref<Array<GroupEntity>>;

    const isDisabled = computed(() => {
      return lodash.isEmpty(selected.value);
    });

    const onClose = () => {
      isOpen.value = false;
    };

    const onSave = () => {
      onClose();
      if (!lodash.isEmpty(selected.value)) {
        assignee.value = lodash.join(
          lodash.map(selected.value, item => item.id),
          ','
        );
      } else {
        assignee.value = '';
      }
    };

    const onOpen = () => {
      if (assignee.value) {
        const items = lodash.split(assignee.value);
        selected.value = lodash.map(items, item => {
          return { id: item, name: '', type: '' };
        });
      }

      isOpen.value = true;
    };

    return {
      isOpen,
      isDisabled,
      selected,
      assignee,
      onClose,
      onSave,
      onOpen
    };
  }
});
</script>
