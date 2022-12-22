<template>
  <div>
    <q-list class="rounded-borders">
      <div v-for="(item, i) in items" :key="i">
        <q-item clickable v-ripple @click="toEdit(item)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="item.senderAvatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.senderName }}</q-item-label>
            <q-item-label caption lines="2">
              {{ item.dialogue.latestNews }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>{{ item.createTime }}</q-item-section>
        </q-item>

        <q-separator />
      </div>
    </q-list>
    <h-row justify="center" class="q-mt-md">
      <h-column :cols="4">
        <q-pagination v-model="pageNumber" max="5" direction-links flat color="grey" active-color="primary" />
      </h-column>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useTableItems } from '/@/hooks';
import { ComponentNameEnum } from '/@/lib/enums';
import { lodash, api } from '/@/lib/utils';
import { DialogueContact, DialogueContactConditions } from '/@/lib/declarations';

export default defineComponent({
  name: 'MessageDialogueContact',

  setup(props) {
    const pageNumber = ref<number>(1);
    const { tableRows, totalPages, pagination, loading, toEdit, toCreate, findItems, deleteItemById } = useTableItems<
      DialogueContact,
      DialogueContactConditions
    >(api.dialogueContact(), 'MessageDialogue');

    const items: Array<DialogueContact> = [
      {
        contactId: '1',
        senderId: 'test',
        senderName: 'test',
        receiverId: '1',
        senderAvatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        createTime: new Date(),
        updateTime: new Date(),
        dialogue: {
          dialogueId: '1',
          latestNews: '哈哈哈哈',
          createTime: new Date(),
          updateTime: new Date(),
          ranking: 1
        },
        ranking: 1
      }
    ];

    return {
      pageNumber,
      items,
      toEdit
    };
  }
});
</script>
