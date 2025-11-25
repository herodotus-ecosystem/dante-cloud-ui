<template>
  <h-center-form-layout :entity="editedItem" :title="title" :operation="operation" @save="onSave()">
    <h-text-field v-model="editedItem.category" label="分类" disable></h-text-field>
    <h-text-field v-model="editedItem.name" label="字面量"></h-text-field>
    <h-text-field v-model="editedItem.label" label="显示值"></h-text-field>
  </h-center-form-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { SysDictionaryEntity } from '@/lib/declarations';
import { api } from '@/lib/utils';

import { useTableItem } from '@/hooks';
import { HCenterFormLayout } from '@/components';

export default defineComponent({
  name: 'SysDictionaryContent',

  components: {
    HCenterFormLayout,
  },

  setup() {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<SysDictionaryEntity>(
      api.sysDictionary(),
    );

    const onSave = () => {
      saveOrUpdate();
    };

    return {
      editedItem,
      operation,
      title,
      onSave,
    };
  },
});
</script>
