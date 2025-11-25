<template>
  <q-list v-if="hasAnnouncement" bordered separator>
    <q-item v-for="(item, index) in items" :key="index">
      <q-item-section>
        <q-item-label>{{ item.senderName }}</q-item-label>
        <q-item-label caption lines="2">{{ item.content }}.</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>{{ convertDate(item.createTime as Date) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <h-center-label v-else text="暂没有新消息"></h-center-label>
</template>

<script lang="ts">
import { NotificationCategoryEnum } from '@/lib/definitions';
import { defineComponent } from 'vue';

import { useNotifications } from '../hooks';

export default defineComponent({
  name: 'HAppAnnouncementNotification',

  setup() {
    const { items, hasAnnouncement, convertDate } = useNotifications(
      NotificationCategoryEnum.ANNOUNCEMENT,
    );

    return {
      items,
      hasAnnouncement,
      convertDate,
    };
  },
});
</script>
