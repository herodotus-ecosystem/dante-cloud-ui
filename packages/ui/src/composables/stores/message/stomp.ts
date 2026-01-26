import { defineStore } from 'pinia';
import { Client } from '@stomp/stompjs';

import type { DialogueDetailEntity, WebSocketOperations } from '@/composables/declarations';
import { isEmpty } from 'lodash-es';
import { VARIABLES, API } from '@/configurations';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';

export const useStompWebSocketStore = defineStore('StompWebSocket', {
  state: () => ({
    client: {} as Client,
    operation: {} as WebSocketOperations,
  }),

  actions: {
    pullNotifications(): void {
      if (this.operation && this.operation.pullNotifications) {
        this.operation.pullNotifications();
      }
    },

    syncOnlineUserCount(data: number): void {
      if (this.operation && this.operation.syncOnlineUserCount) {
        this.operation.syncOnlineUserCount(String(data));
      }
    },

    getWebSocketAddress(): string {
      const store = useAuthenticationStore();
      return (
        `ws://${location.host}/socket` +
        API.core.getConfig().getMsg(false) +
        '/stomp/ws?openid=' +
        store.userId
      );
      // return `ws://${location.host}/socket` + API.getConfig().getMsg(false) + '/stomp/ws';
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
          ...this.getAuthorizationHeader(),
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,

        onStompError: (frame) => {
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
        },
      });
    },

    subscribe(): void {
      this.client.onConnect = (frame) => {
        console.log('WebSocket connected: ' + frame.headers['message']);
        this.client.subscribe('/broadcast/notice', (res) => {
          console.log(res);
          // toast.info(res.body);
          this.pullNotifications();
        });

        this.client.subscribe('/broadcast/online', (res) => {
          // toast.info(res.body);
          const count = res.body as unknown as number;
          this.syncOnlineUserCount(count);
        });

        this.client.subscribe('/user/personal/message', (res) => {
          // console.log(res);
          // toast.info(res.body);
          this.pullNotifications();
        });

        this.pullStat();
        this.pullNotifications();
      };
    },

    sendNotice(content: string): void {
      this.client.publish({
        destination: '/app/public/notice',
        body: content,
        headers: this.getAuthorizationHeader(),
      });
    },

    sendToUser(detail: DialogueDetailEntity) {
      this.client.publish({
        destination: '/app/private/message',
        body: JSON.stringify(detail),
        headers: this.getAuthorizationHeader(),
      });
    },

    connect(webSocketOperations: WebSocketOperations): void {
      this.operation = webSocketOperations;
      if (VARIABLES.isUseWebSocket()) {
        const store = useAuthenticationStore();
        if (store.token) {
          this.createClient();
          this.subscribe();
          this.client.activate();
        }
      }
    },

    async disconnect(): Promise<any> {
      if (VARIABLES.isUseWebSocket()) {
        if (!isEmpty(this.client)) {
          await this.client.deactivate();
        }
      }
    },

    pullStat(): void {
      API.core
        .webSocketMessage()
        .fetchAllStat()
        .then((result) => {
          const data = result.data as Record<string, any>;
          this.syncOnlineUserCount(data.onlineCount);
        });
    },
  },
});
