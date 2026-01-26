<template>
  <div>
    <q-list class="rounded-borders">
      <div v-for="(item, i) in tableRows" :key="i">
        <q-item clickable v-ripple @click="toEdit(item)">
          <q-item-section avatar>
            <h-user-avatar :id="item.senderId" :avatar="item.senderAvatar"></h-user-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ item.senderName }}</q-item-label>
            <q-item-label caption lines="2">
              {{ item.dialogue.latestNews }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>{{ moment(item.dialogue.updateTime).fromNow() }}</q-item-section>
        </q-item>

        <q-separator />
      </div>
    </q-list>
    <h-row justify="center" class="q-mt-md">
      <h-column :cols="4">
        <h-pagination v-model="pagination.page" :max="totalPages" />
      </h-column>
    </h-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import type { DialogueContactEntity, DialogueContactConditions } from '@herodotus-cloud/apis';

import { useTable } from '@/composables/hooks';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';
import { moment } from '@herodotus-cloud/core';
import { API } from '@/configurations';

import { HUserAvatar } from '@/components';

export default defineComponent({
  name: 'MessageDialogueContact',

  components: {
    HUserAvatar,
  },

  setup(props) {
    const {
      tableRows,
      totalPages,
      pagination,
      loading,
      toEdit,
      toCreate,
      findItems,
      deleteItemById,
      conditions,
    } = useTable<DialogueContactConditions, DialogueContactEntity>(
      API.core.dialogueContact(),
      'MessageDialogue',
      false,
      { direction: 'ASC', properties: ['createTime'] },
      false,
    );
    const store = useAuthenticationStore();

    onMounted(() => {
      conditions.value.receiverId = store.userId;
      findItems({ pagination: pagination.value, getCellValue: (col: any, row: any) => {} });
    });

    const items: Array<DialogueContactEntity> = [
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
        },
        ranking: 1,
      },
    ];

    return {
      tableRows,
      totalPages,
      pagination,
      items,
      toEdit,
      moment,
    };
  },
});
</script>
