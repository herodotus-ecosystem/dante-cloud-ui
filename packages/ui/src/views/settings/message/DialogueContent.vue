<template>
  <h-detail-container :title="editedItem.senderName"></h-detail-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import type { DialogueContact } from '/@/lib/declarations';

import { HDetailContainer } from '/@/components';

import { api } from '/@/lib/utils';
import { useTableItem } from '/@/hooks';

export default defineComponent({
  name: 'MessageDialogueContent',

  components: {
    HDetailContainer
  },

  setup(props) {
    const { editedItem, operation, title, saveOrUpdate } = useTableItem<DialogueContact>(api.dialogueContact());
    return {
      editedItem
    };
  }
});
</script>
