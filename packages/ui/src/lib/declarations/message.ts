export interface WebSocketOperations {
  /**
   * 拉取通知操作
   * @param data 预留参数，备用。
   * @returns void
   */
  pullNotifications?: (data: string) => void;
  /**
   * 同步实时在线用户数量
   * @param data 后端返回给前端的数据
   * @returns void
   */
  syncOnlineUserCount?: (data: string) => void;
}
