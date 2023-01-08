import { defineStore } from 'pinia';
import { Client } from '@stomp/stompjs';

import type { Dictionary, DialogueDetail, Sort, Page, Notification, NotificationConditions } from '/@/lib/declarations';
import { api, toast, lodash, variables } from '/@/lib/utils';
import { useAuthenticationStore } from '../authentication';
import { useNotificationStore } from './notification';

export const useWebSocketStore = defineStore('WebSocketMessage', {
  state: () => ({
    client: {} as Client,
    onlineCount: 0
  }),

  actions: {
    getWebSocketAddress(): string {
      const store = useAuthenticationStore();
      return `ws://${location.host}/socket` + api.getConfig().getMsg(false) + '/stomp/ws?openid=' + store.userId;
    },

    getAuthorizationHeader(): Record<string, string> {
      const store = useAuthenticationStore();
      return store.getAuthorizationHeader();
    },

    createClient(): void {
      const store = useAuthenticationStore();

      this.client = new Client({
        brokerURL: this.getWebSocketAddress(),
        // 此处的 Header 仅在后端 ChannelInterpetor中有效
        connectHeaders: {
          ...this.getAuthorizationHeader()
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,

        onStompError: frame => {
          // Will be invoked in case of error encountered at Broker
          // Bad login/passcode typically will cause an error
          // Complaint brokers will set `message` header with a brief message. Body may contain details.
          // Compliant brokers will terminate the connection after any error
          console.log('Broker reported error: ', frame.headers);
          console.log('Additional details: ', frame.body);
        },

        onWebSocketError: () => {
          if (this.client) {
            this.client.deactivate();
          }
        },

        webSocketFactory: () => {
          return new WebSocket(this.getWebSocketAddress(), [store.token, 'v10.stomp']);
        }
      });
    },

    subscribe(): void {
      const notification = useNotificationStore();
      this.client.onConnect = frame => {
        console.log('WebSocket connnected: ' + frame.headers['message']);
        this.client.subscribe('/broadcast/notice', res => {
          console.log(res);
          toast.info(res.body);
          notification.pullAllNotification();
        });

        this.client.subscribe('/broadcast/online', res => {
          toast.info(res.body);
          this.onlineCount = res.body as unknown as number;
        });

        this.client.subscribe('/user/personal/message', res => {
          console.log(res);
          toast.info(res.body);
          notification.pullAllNotification();
        });

        this.pullStat();
        notification.pullAllNotification();
      };
    },
    sendNotice(content: string): void {
      this.client.publish({
        destination: '/app/public/notice',
        body: content,
        headers: this.getAuthorizationHeader()
      });
    },

    sendToUser(detail: DialogueDetail) {
      this.client.publish({
        destination: '/app/private/message',
        body: JSON.stringify(detail),
        headers: this.getAuthorizationHeader()
      });
    },

    connect(): void {
      if (variables.isUseWebSocket()) {
        const store = useAuthenticationStore();
        if (store.token) {
          this.createClient();
          this.subscribe();
          this.client.activate();
        }
      }
    },

    disconnect(): void {
      if (variables.isUseWebSocket()) {
        if (!lodash.isEmpty(this.client)) {
          this.client.deactivate();
        }
      }
    },

    pullStat(): void {
      if (this.onlineCount === 0) {
        api
          .webSocketMessage()
          .fetchAllStat()
          .then(result => {
            const data = result.data as Dictionary<any>;
            this.onlineCount = data.onlineCount;
          });
      }
    }
  }
});
