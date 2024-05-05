export enum MessageChannelEnum {
  /**
   * STOMP 协议的WebSocket 实现。当前主要指代的是 Herodotus 基于 Servlet 环境的 WebSocket 实现
   */
  STOMP = 'stomp',
  /**
   * Spring WebFlux 自带的 WebSocket 实现。WebFlux 目前还不支持 STOMP
   */
  WEBFLUX = 'webflux',
  /**
   * 基于 Spring RSocket 实现的 WebSocket
   */
  RSOCKET = 'rsocket'
}
