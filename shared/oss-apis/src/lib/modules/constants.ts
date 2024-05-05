import type { ConstantDictionary } from '/@/declarations';

import { HttpConfig, BaseService } from '../base';

class OssConstantService extends BaseService<Record<string, ConstantDictionary[]>> {
  private static instance: OssConstantService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OssConstantService {
    if (this.instance == null) {
      this.instance = new OssConstantService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getOss() + '/oss/minio/constant/enums';
  }
}

export { OssConstantService };
