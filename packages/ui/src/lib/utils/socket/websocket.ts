import type { StompConfig } from '/@/lib/declarations';

import StompJs, { Client } from '@stomp/stompjs';

const config: StompConfig = {
  token: ''
};

class WebSocketUtilities {
  private static instance: WebSocketUtilities;

  private static client: Client;

  private constructor(config: StompConfig) {
    WebSocketUtilities.client = new StompJs.Client({
      // Typically login, passcode and vhost
      // Adjust these for your broker
      connectHeaders: {
        login: 'guest',
        passcode: 'guest'
      },

      // Broker URL, should start with ws:// or wss:// - adjust for your broker setup
      brokerURL: 'ws://localhost:15674/ws',

      // Keep it off for production, it can be quit verbose
      // Skip this key to disable
      debug: function (str) {
        console.log('STOMP: ' + str);
      },

      // If disconnected, it will retry after 200ms
      reconnectDelay: 200,

      // Subscriptions should be done inside onConnect as those need to reinstated when the broker reconnects
      onConnect: frame => {
        // The return object has a method called `unsubscribe`
        const subscription = WebSocketUtilities.client.subscribe('/topic/chat', function (message) {
          const payload = JSON.parse(message.body);
          console.log(payload);
        });
      }
    });
  }

  public static getInstance(config: StompConfig): WebSocketUtilities {
    if (!this.instance) {
      this.instance = new WebSocketUtilities(config);
    }
    return this.instance;
  }

  public connect(): void {}
}

export const WebSocketUtils = WebSocketUtilities.getInstance(config);
