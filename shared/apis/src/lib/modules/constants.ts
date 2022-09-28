import type { Dictionary, ConstantDictionary } from '/@/declarations';

import { ApiConfig, BaseService } from '../base';

class UaaConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
  private static instance: UaaConstantService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): UaaConstantService {
    if (this.instance == null) {
      this.instance = new UaaConstantService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/constant/enums';
  }
}

class UpmsConstantService extends BaseService<Dictionary<ConstantDictionary[]>> {
  private static instance: UpmsConstantService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): UpmsConstantService {
    if (this.instance == null) {
      this.instance = new UpmsConstantService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/constants/enums';
  }
}

export { UaaConstantService, UpmsConstantService };
