import { defineStore } from 'pinia';
import type { Sort, Page, NotificationEntity, NotificationConditions } from '/@/lib/declarations';

import { NotificationCategoryEnum } from '/@/lib/enums';
import { api } from '/@/lib/utils';
import { useAuthenticationStore } from '../authentication';

export const useNotificationStore = defineStore('Notification', {
  state: () => ({
    totalNumber: 0,
    dialogueCount: 0,
    announcementCount: 0
  }),

  getters: {
    hasDialogue: state => state.dialogueCount !== 0,
    hasAnnouncement: state => state.announcementCount !== 0,
    totalCount: state => {
      if (state.totalNumber === 0) {
        return state.dialogueCount + state.announcementCount;
      } else {
        return state.totalNumber;
      }
    }
  },

  actions: {
    setAllRead(): void {
      const authenticationStore = useAuthenticationStore();
      api
        .notification()
        .setAllRead(authenticationStore.userId)
        .then(() => {
          this.totalNumber = 0;
          this.dialogueCount = 0;
          this.announcementCount = 0;
        });
    },

    recordCount(type: NotificationCategoryEnum, count: number): void {
      if (type === NotificationCategoryEnum.DIALOGUE) {
        this.dialogueCount = count;
      } else {
        this.announcementCount = count;
      }
      this.totalNumber = 0;
    },

    pullAllNotification(): void {
      const sort: Sort = { direction: 'DESC', properties: ['createTime'] };
      const store = useAuthenticationStore();
      api
        .notification()
        .fetchByPage(
          {
            pageNumber: 0,
            pageSize: 5,
            ...sort
          },
          { userId: store.userId, read: false } as NotificationConditions
        )
        .then(result => {
          const data = result.data as Page<NotificationEntity>;
          // 用户文档列表中无结果时也要更新列表数据
          if (data) {
            this.totalNumber = parseInt(data.totalElements, 0);
          } else {
            this.totalNumber = 0;
          }
        });
    }
  }
});
