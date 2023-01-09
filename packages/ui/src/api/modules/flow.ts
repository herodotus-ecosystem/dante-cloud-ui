import type { LeaveFlow, HttpConfig } from '/@/lib/declarations';

import { BaseService } from '/@/lib/definitions';

import { api } from '/@/lib/utils';

class LeaveFlowService extends BaseService<LeaveFlow> {
  private static instance: LeaveFlowService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): LeaveFlowService {
    if (this.instance == null) {
      this.instance = new LeaveFlowService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig() + '/flow/leave';
  }
}

export function useFlowApi() {
  const config: HttpConfig = api.getConfig();
  return {
    leave: LeaveFlowService.getInstance(config)
  };
}
