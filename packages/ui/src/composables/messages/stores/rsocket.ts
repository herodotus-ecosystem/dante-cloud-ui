import { defineStore } from 'pinia';

import type { WebSocketOperations, DialogueDetailEntity, Entity } from '@/lib/declarations';
import type {
  RSocket,
  Payload,
  OnTerminalSubscriber,
  OnNextSubscriber,
  OnExtensionSubscriber,
  Requestable,
  Cancellable,
} from 'rsocket-core';

import { API } from '@/configurations';
import { isFunction } from 'lodash-es';

import { RSocketConnector } from 'rsocket-core';
import { WebsocketClientTransport } from 'rsocket-websocket-client';
import {
  WellKnownMimeType,
  encodeRoute,
  encodeCompositeMetadata,
  encodeBearerAuthMetadata,
} from '@rsocket/composite-metadata';
import { useAuthenticationStore } from '@herodotus-cloud/framework-kernel';

export const useRSocketWebSocketStore = defineStore('RSocketWebSocket', {
  state: () => ({
    rsocket: {} as RSocket,
    client: {} as RSocketConnector,
  }),

  actions: {
    // ---------- 工具方法 ----------
    decodeData(buffer: Buffer): string {
      const utf8decoder = new TextDecoder();
      return utf8decoder.decode(buffer);
    },

    encodeData(value: object): Buffer {
      return Buffer.from(JSON.stringify(value));
    },

    // ---------- 通用响应返回方法 ----------
    onCancel(): void {
      console.warn('[RSocket] onCancel - 操作取消');
    },

    onComplete(): void {
      console.log('[RSocket] onComplete - 操作完成');
    },

    onNext(payload: Payload, isComplete: boolean): void {
      const data = payload.data as Buffer;
      console.log('[RSocket] onNext payload ', this.decodeData(data));
      console.log('[RSocket] onNext isComplete ', isComplete);
    },

    onExtension(
      extendedType: number,
      content: Buffer | null | undefined,
      canBeIgnored: boolean,
    ): void {
      console.log('[RSocket] onExtension extendedType ', extendedType);
      console.log('[RSocket] onExtension content ', content);
      console.log('[RSocket] onExtension canBeIgnored ', canBeIgnored);
    },

    onRequest(requestN: number): void {
      console.log('[RSocket] onExtension content ', requestN);
    },

    onError(error: Error): void {
      console.error('[RSocket] onError : 传输失败!', error);
    },

    // 客户端配置方法
    getRSocketWebSocketAddress(): string {
      const address =
        `ws://${location.host}/reactive` + API.core.getConfig().getMsg(false) + '/websocket';
      // const address = 'ws://192.168.101.10:8847/herodotus-cloud-message/websocket';
      // const address = 'ws://localhost:9997/websocket';
      return address;
    },

    createMetadata(route?: string) {
      const { token } = useAuthenticationStore();

      const map = new Map<WellKnownMimeType, Buffer>();
      map.set(WellKnownMimeType.MESSAGE_RSOCKET_AUTHENTICATION, encodeBearerAuthMetadata(token));

      if (route) {
        map.set(WellKnownMimeType.MESSAGE_RSOCKET_ROUTING, encodeRoute(route));
      }

      return encodeCompositeMetadata(map);
    },

    createSetup() {
      const { userId, username } = useAuthenticationStore();

      return {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: WellKnownMimeType.APPLICATION_JSON.string,
        metadataMimeType: WellKnownMimeType.MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        payload: {
          data: this.encodeData({ id: userId, name: username }),
          metadata: this.createMetadata('SETUP'),
        },
      };
    },

    createTransport(): WebsocketClientTransport {
      return new WebsocketClientTransport({
        url: this.getRSocketWebSocketAddress(),
        wsCreator: (url) => {
          return new WebSocket(url);
        },
        debug: true,
      });
    },

    createRSocketConnector(operation: WebSocketOperations): RSocketConnector {
      return new RSocketConnector({
        setup: this.createSetup(),
        transport: this.createTransport(),
        responder: {
          fireAndForget: (payload: Payload, responderStream: OnTerminalSubscriber) => {
            const data = this.decodeData(payload.data as Buffer);
            console.log('[RSocket] fireAndForget responder data', data);
            console.log('[RSocket] fireAndForget responder responderStream', responderStream);

            if (isFunction(operation.pullNotifications)) {
              operation.pullNotifications();
            }
            if (isFunction(operation.syncOnlineUserCount)) {
              operation.syncOnlineUserCount(data);
            }
            return {
              cancel: this.onCancel,
            };
          },

          requestStream: (
            payload: Payload,
            initialRequestN: number,
            responderStream: OnTerminalSubscriber & OnNextSubscriber & OnExtensionSubscriber,
          ) => {
            console.log(
              '[RSocket] requestStream responder data',
              this.decodeData(payload.data as Buffer),
            );
            console.log('[RSocket] requestStream responder initialRequestN', initialRequestN);
            console.log('[RSocket] requestStream responder responderStream', responderStream);
            return {
              onComplete: this.onComplete,
              onNext: this.onNext,
              onExtension: this.onExtension,
              request: this.onRequest,
              cancel: this.onCancel,
            };
          },

          requestChannel: (
            payload: Payload,
            initialRequestN: number,
            isCompleted: boolean,
            responderStream: OnTerminalSubscriber &
              OnNextSubscriber &
              OnExtensionSubscriber &
              Requestable &
              Cancellable,
          ) => {
            console.log(
              '[RSocket] requestResponse responder data',
              this.decodeData(payload.data as Buffer),
            );
            console.log('[RSocket] requestResponse responder initialRequestN', initialRequestN);
            console.log('[RSocket] requestResponse responder isCompleted', isCompleted);
            console.log('[RSocket] requestResponse responder responderStream', responderStream);
            return responderStream;
          },

          requestResponse: (
            payload: Payload,
            responderStream: OnTerminalSubscriber & OnNextSubscriber & OnExtensionSubscriber,
          ) => {
            const data = this.decodeData(payload.data as Buffer);
            console.log('[RSocket] requestResponse responder data', data);
            console.log('[RSocket] requestResponse responder responderStream', responderStream);
            return {
              onExtension: this.onExtension,
              cancel: this.onCancel,
            };
          },
        },
      });
    },

    init(): void {
      if (this.client) {
        this.client.connect().then((socket) => {
          if (socket) {
            console.info('连接 RSocket Server 成功');
            console.log('[RSocket] core ---', socket);
            this.rsocket = socket;

            // this.fireAndForget('sdfsfsfsfsffs', 'echo');
          }
        });
      }
    },

    connect(operation: WebSocketOperations): void {
      this.client = this.createRSocketConnector(operation);
      this.init();
    },

    disconnect(): void {
      if (this.rsocket) {
        this.rsocket.close();
      }
    },

    reconnect(): void {
      this.init();
    },

    createPayload(data: Entity, destination: string): Payload {
      return {
        data: Buffer.from(JSON.stringify(data)),
        metadata: this.createMetadata(destination),
      };
    },

    fireAndForget(data: Entity, destination: string): void {
      this.rsocket.fireAndForget(this.createPayload(data, destination), {
        onError: this.onError,
        onComplete: this.onComplete,
      });
    },

    requestResponse(data: string, destination: string): void {
      this.rsocket.requestResponse(this.createPayload(data, destination), {
        onError: this.onError,
        onComplete: this.onComplete,
        onNext: this.onNext,
        onExtension: this.onExtension,
      });
    },

    requestStream(data: string, destination: string, initialRequestN = 100): void {
      this.rsocket.requestStream(this.createPayload(data, destination), initialRequestN, {
        onError: this.onError,
        onComplete: this.onComplete,
        onNext: this.onNext,
        onExtension: this.onExtension,
      });
    },

    requestChannel(
      data: string,
      destination: string,
      initialRequestN = 100,
      isCompleted = false,
    ): void {
      this.rsocket.requestChannel(
        this.createPayload(data, destination),
        initialRequestN,
        isCompleted,
        {
          onError: this.onError,
          onComplete: this.onComplete,
          onNext: this.onNext,
          onExtension: this.onExtension,
          request: this.onRequest,
          cancel: this.onCancel,
        },
      );
    },

    sendNotice(content: string): void {},

    sendToUser(detail: DialogueDetailEntity) {
      this.fireAndForget(detail, 'personal');
    },
  },
});
