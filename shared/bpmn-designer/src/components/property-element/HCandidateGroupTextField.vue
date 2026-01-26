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
          @click="onOpen()"
        />
      </template>
    </h-text-field>
    <h-dialog v-model="isOpen" @confirm="onSave()" :title="title">
      <h-group-select-table v-model="selected"></h-group-select-table>
    </h-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref } from 'vue';

import type { GroupEntity } from '@/declarations';

import { isEmpty, join, map, split } from 'lodash-es';

import { HDialog } from '@/components/widgets';
import { HTextField } from '@/components/base';
import HGroupSelectTable from './HGroupSelectTable.vue';

defineOptions({
  name: 'HCandidateGroupTextField',
  components: {
    HDialog,
    HGroupSelectTable,
    HTextField,
  },
});

defineProps({
  label: { type: String },
  title: { type: String, default: '' },
});

const assignee = defineModel({
  type: String,
  default: '',
});

const isOpen = ref(false);
const selected = ref([]) as Ref<Array<GroupEntity>>;

const onClose = () => {
  isOpen.value = false;
};

const onSave = () => {
  onClose();
  if (!isEmpty(selected.value)) {
    assignee.value = join(
      map(selected.value, (item) => item.id),
      ',',
    );
  } else {
    assignee.value = '';
  }
};

const onOpen = () => {
  if (assignee.value) {
    const items = split(assignee.value);
    selected.value = map(items, (item) => {
      return { id: item, name: '', type: '' };
    });
  }

  isOpen.value = true;
};
</script>
