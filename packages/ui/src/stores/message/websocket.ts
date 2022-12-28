import { defineStore } from 'pinia';
import { Client } from '@stomp/stompjs';

import { api, toast, lodash, variables } from '/@/lib/utils';
import { useAuthenticationStore } from '../authentication';
import { useNotificationStore } from './notification';

export const useWebSocketStore = defineStore('WebSocketMessage', {
  state: () => ({
    client: {} as Client
  }),

  actions: {
    getWebSocketAddress(): string {
      return `ws://${location.host}/socket` + api.getConfig().getMsg(false) + '/stomp/ws';
    },

    getAuthorizationHeader(): Record<string, string> {
      const store = useAuthenticationStore();
      return store.getAuthorizationHeader();
    },

    createClient(): void {
      this.client = new Client({
        brokerURL: this.getWebSocketAddress(),
        connectHeaders: {
          ...this.getAuthorizationHeader()
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000
      });
    },

    subscribe(): void {
      const notification = useNotificationStore();
      this.client.onConnect = frame => {
        console.log('WebSocket connnected: ' + frame.headers['message']);
        this.client.subscribe('/broadcast/notice', res => {
          console.log(res);
          toast.info(res.body);
          notification.receive();
        });

        this.client.subscribe('/personal/message', res => {
          console.log(res);
          toast.info(res.body);
          notification.receive();
        });
      };

      this.client.onStompError = frame => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ', frame.headers);
        console.log('Additional details: ', frame.body);
      };

      this.client.onWebSocketError = frame => {
        console.log('Broker reported error: ', frame.headers);
        console.log('Additional details: ', frame.body);
        this.client.deactivate();
      };
    },
    sendNotice(content: string): void {
      this.client.publish({
        destination: '/app/public/notice',
        body: content,
        headers: this.getAuthorizationHeader()
      });
    },

    sendToUser(userId: string, content: string) {
      this.client.publish({
        destination: '/app/private/message/' + userId,
        body: content,
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
    }
  }
});
