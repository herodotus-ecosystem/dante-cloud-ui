import type {
  AxiosHttpResult,
  ExtendedTaskEntity,
  Page,
  Pageable,
  Conditions,
} from '@/declarations';

import { HttpConfig, BaseService } from '../base';

class ExtendedTaskService extends BaseService<ExtendedTaskEntity> {
  private static instance: ExtendedTaskService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ExtendedTaskService {
    if (this.instance == null) {
      this.instance = new ExtendedTaskService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn(true, true) + '/task';
  }

  public getToDoTasksAddress(): string {
    return this.getBaseAddress() + '/todo';
  }

  public getCompletedTasksAddress(): string {
    return this.getBaseAddress() + '/completed';
  }

  public fetchToDoTasksByPage(
    params: Pageable,
    others: Conditions = {},
  ): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig()
      .getHttp()
      .get<Page<ExtendedTaskEntity>>(this.getToDoTasksAddress(), fullParams);
  }

  public fetchCompletedTasksByPage(
    params: Pageable,
    others: Conditions = {},
  ): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig()
      .getHttp()
      .get<Page<ExtendedTaskEntity>>(this.getCompletedTasksAddress(), fullParams);
  }
}

export { ExtendedTaskService };
