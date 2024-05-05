import { variables } from '/@/lib/utils';

import { MessageChannelEnum } from '../enums';

import {
  useRSocketWebSocketStore,
  useWebFluxWebSocketStore,
  useStompWebSocketStore,
  useNotificationStore,
  useRealTimeInformationStore
} from '../stores';

export default function useWebSocketMessage() {
  const isUseWebSocket = variables.isUseWebSocket();
  const stompWebSocketStore = useStompWebSocketStore();
  const webfluxWebSocketStore = useWebFluxWebSocketStore();
  const rsocketWebSocketStore = useRSocketWebSocketStore();
  const notificationStore = useNotificationStore();
  const realtimeStore = useRealTimeInformationStore();

  const webSocketOperations = {
    pullNotifications: (data: string) => {
      notificationStore.pullAllNotification();
    },
    syncOnlineUserCount: (data: string) => {
      const count = data as unknown as number;
      realtimeStore.onlineUserCount = count;
    }
  };

  const messageChannel = (category = MessageChannelEnum.RSOCKET, isConnected = true) => {
    switch (category) {
      case MessageChannelEnum.RSOCKET:
        if (isConnected) {
          rsocketWebSocketStore.connect(webSocketOperations);
        } else {
          rsocketWebSocketStore.disconnect();
        }
        break;
      case MessageChannelEnum.WEBFLUX:
        if (isConnected) {
          webfluxWebSocketStore.connect();
        } else {
          webfluxWebSocketStore.disconnect();
        }
        break;
      default:
        if (isConnected) {
          stompWebSocketStore.connect();
        } else {
          stompWebSocketStore.disconnect();
        }
        break;
    }
  };

  const connect = (category = MessageChannelEnum.RSOCKET) => {
    if (isUseWebSocket) {
      messageChannel(category, true);
    }
  };

  const disconnect = (category = MessageChannelEnum.RSOCKET) => {
    if (isUseWebSocket) {
      messageChannel(category, false);
    }
  };

  return {
    connect,
    disconnect
  };
}
