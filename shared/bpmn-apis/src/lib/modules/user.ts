import type { UserEntity, UserQueryParams, UserSortBy } from '@/declarations';

import { HttpConfig, BpmnQueryByGetService } from '../base';

class UserService extends BpmnQueryByGetService<UserEntity, UserQueryParams, UserSortBy> {
  private static instance: UserService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): UserService {
    if (this.instance == null) {
      this.instance = new UserService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/user';
  }

  public getCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }
}

export { UserService };
