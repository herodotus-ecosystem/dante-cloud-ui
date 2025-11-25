import { defineStore } from 'pinia';

export const useWebFluxWebSocketStore = defineStore('WebFluxWebSocket', {
  state: () => ({
    webSocket: {} as WebSocket
  }),

  actions: {
    connect(): void {
      this.webSocket = new WebSocket('http://192.168.101.10:8847/reactive/herodotus-cloud-reactive/echo');
      this.webSocket.onopen = this.onOpen;
      this.webSocket.onerror = this.onError;
      this.webSocket.onmessage = this.onMessage;
      this.webSocket.onclose = this.onclose;
    },

    disconnect(): void {
      this.webSocket.close();
    },

    reconnect(): void {
      this.connect();
    },

    onOpen(): void {
      console.log('WebFlux WebSocket连接成功');
      //心跳检测重置
      //this.heartCheck.reset().start();
    },

    onError(): void {
      console.log('WebFlux WebSocket连接发生错误');
    },

    onMessage: function (e: Event) {
      console.log('监听关闭' + e);
      console.log('-----接收消息-------', e);
    },

    onclose(e: Event): void {
      console.log('connection closed (' + e + ')');
    },

    send(text: string): void {
      this.webSocket.send(text);
    }
  }
});
