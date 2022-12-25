import { defineStore } from 'pinia';

import { api } from '/@/lib/utils';
import { useAuthenticationStore } from '../authentication';

export const useNotificationStore = defineStore('Notification', {
  state: () => ({
    reloading: false,
    totalNumber: 0
  }),

  getters: {
    hasNotification: state => state.totalNumber !== 0
  },

  actions: {
    setAllRead(): void {
      const authenticationStore = useAuthenticationStore();
      api
        .notification()
        .setAllRead(authenticationStore.userId)
        .then(() => {
          this.totalNumber = 0;
        });
    },

    recordCount(count: number): void {
      this.totalNumber += count;
    },

    receive(): void {
      this.totalNumber = 0;
      this.reloading = true;
    }
  }
});
