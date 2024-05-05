import { computed } from 'vue';

import { useRealTimeInformationStore } from '../stores';

export default function useRealTimeInformation() {
  const realtimeStore = useRealTimeInformationStore();

  const onlineUserCount = computed(() => {
    return realtimeStore.onlineUserCount;
  });

  return {
    onlineUserCount
  };
}
