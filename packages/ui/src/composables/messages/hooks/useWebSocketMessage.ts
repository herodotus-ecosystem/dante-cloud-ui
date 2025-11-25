import type { DialogueDetailEntity } from '@/lib/declarations';

import { VARIABLES } from '@/configurations';
import { MessageChannelEnum } from '../enums';

import {
  useRSocketWebSocketStore,
  useWebFluxWebSocketStore,
  useStompWebSocketStore,
  useNotificationStore,
  useRealTimeInformationStore,
} from '../stores';

export default function useWebSocketMessage() {
  const isUseWebSocket = VARIABLES.isUseWebSocket();
  const isReactiveProject = VARIABLES.isReactiveProject();
  const stompWebSocketStore = useStompWebSocketStore();
  const webfluxWebSocketStore = useWebFluxWebSocketStore();
  const rsocketWebSocketStore = useRSocketWebSocketStore();
  const notificationStore = useNotificationStore();
  const realtimeStore = useRealTimeInformationStore();

  const webSocketOperations = {
    pullNotifications: () => {
      notificationStore.pullAllNotification();
    },
    syncOnlineUserCount: (data: string) => {
      const count = data as unknown as number;
      realtimeStore.onlineUserCount = count;
    },
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
          stompWebSocketStore.connect(webSocketOperations);
        } else {
          stompWebSocketStore.disconnect();
        }
        break;
    }
  };

  const connect = () => {
    if (isUseWebSocket) {
      if (isReactiveProject) {
        messageChannel(MessageChannelEnum.RSOCKET, true);
      } else {
        messageChannel(MessageChannelEnum.STOMP, true);
      }
    }
  };

  const disconnect = () => {
    if (isUseWebSocket) {
      if (isReactiveProject) {
        messageChannel(MessageChannelEnum.RSOCKET, false);
      } else {
        messageChannel(MessageChannelEnum.STOMP, false);
      }
    }
  };

  const sendNotice = (content: string) => {
    if (isReactiveProject) {
      rsocketWebSocketStore.sendNotice(content);
    } else {
      stompWebSocketStore.sendNotice(content);
    }
  };

  const sendToUser = (detail: DialogueDetailEntity) => {
    if (isReactiveProject) {
      rsocketWebSocketStore.sendToUser(detail);
    } else {
      stompWebSocketStore.sendToUser(detail);
    }
  };

  return {
    connect,
    disconnect,
    messageChannel,
    sendNotice,
    sendToUser,
  };
}
