<template>
  <q-btn v-if="isEnabled" round dense flat color="grey-8" icon="notifications">
    <q-badge v-if="totalCount !== 0" color="red" text-color="white" floating>{{
      totalCount
    }}</q-badge>
    <q-tooltip>Notifications</q-tooltip>
    <q-menu anchor="bottom left">
      <q-card style="width: 450px">
        <q-tabs v-model="tab" active-color="primary">
          <q-tab label="私信" name="dialogue">
            <q-badge v-if="dialogueCount !== 0" color="red" floating>{{ dialogueCount }}</q-badge>
          </q-tab>
          <q-tab label="公告" name="announcement">
            <q-badge v-if="announcementCount !== 0" color="red" floating>{{
              announcementCount
            }}</q-badge>
          </q-tab>
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="dialogue">
            <h-app-dialogue-notification></h-app-dialogue-notification>
          </q-tab-panel>

          <q-tab-panel name="announcement">
            <h-app-announcement-notification></h-app-announcement-notification>
          </q-tab-panel>
        </q-tab-panels>

        <q-separator />

        <q-card-actions align="around">
          <q-btn flat color="primary" @click="onSetAllRead()">全部已读</q-btn>
          <q-btn flat color="primary" to="/message">查看全部</q-btn>
        </q-card-actions>
      </q-card>
    </q-menu>
  </q-btn>
  <q-btn v-else round dense flat color="grey-8" icon="notifications"></q-btn>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

import { storeToRefs } from 'pinia';

import { useWebSocketStore, useNotificationStore } from '@/stores';
import { variables } from '@/lib/utils';
import { HAppAnnouncementNotification, HAppDialogueNotification } from '../notification';

export default defineComponent({
  name: 'HAppMessageActions',

  components: {
    HAppAnnouncementNotification,
    HAppDialogueNotification,
  },

  setup(props) {
    const webSocketStore = useWebSocketStore();
    const notificationStore = useNotificationStore();

    const { totalCount, dialogueCount, announcementCount } = storeToRefs(notificationStore);
    const { connect, disconnect, sendNotice, sendToUser, pullStat } = webSocketStore;

    const tab = ref('dialogue');

    const isEnabled = computed(() => {
      return variables.isUseWebSocket();
    });

    onMounted(() => {
      if (isEnabled) {
        connect();
      }
    });

    onUnmounted(() => {
      if (isEnabled) {
        disconnect();
      }
    });

    const onSetAllRead = () => {
      notificationStore.setAllRead();
    };

    return {
      tab,
      totalCount,
      dialogueCount,
      announcementCount,
      isEnabled,
      onSetAllRead,
    };
  },
});
</script>
