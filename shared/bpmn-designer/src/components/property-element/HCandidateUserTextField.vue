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
      <h-user-select-table v-model="selected" :selection="selection"></h-user-select-table>
    </h-dialog>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue';
import { ref, computed } from 'vue';

import type { UserEntity } from '@/declarations';

import { isEmpty, join, map, split } from 'lodash-es';

import { HDialog } from '@/components/widgets';
import { HTextField } from '@/components/base';
import HUserSelectTable from './HUserSelectTable.vue';

defineOptions({
  name: 'HCandidateUserTextField',
  components: {
    HDialog,
    HTextField,
    HUserSelectTable,
  },
});

defineProps({
  selection: { type: String as PropType<'single' | 'multiple'>, default: 'multiple' },
  label: { type: String, default: '' },
  title: { type: String, default: '' },
});

const assignee = defineModel({
  type: String,
  default: '',
});

const isOpen = ref(false);
const selected = ref([]) as Ref<Array<UserEntity>>;

const isDisabled = computed(() => {
  return isEmpty(selected.value);
});

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
      return { id: item, firstName: '', lastName: '', email: '' };
    });
  }

  isOpen.value = true;
};
</script>
