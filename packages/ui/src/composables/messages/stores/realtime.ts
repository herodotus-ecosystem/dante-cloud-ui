import { defineStore } from 'pinia';

export const useRealTimeInformationStore = defineStore('RealTimeInformation', {
  state: () => ({
    // 实时在线用户数
    onlineUserCount: 0
  })
});
