import type { AxiosHttpResult, ExtendedTask, Page, Pageable, Conditions } from '/@/declarations';

import { ContentTypeEnum } from '/@/enums';

import { HttpConfig, BaseService } from '../base';

class ExtendedTaskService extends BaseService<ExtendedTask> {
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

  public fetchToDoTasksByPage(params: Pageable, others: Conditions = {}): Promise<AxiosHttpResult<Page<ExtendedTask>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get<Page<ExtendedTask>>(this.getToDoTasksAddress(), fullParams);
  }

  public fetchCompletedTasksByPage(
    params: Pageable,
    others: Conditions = {}
  ): Promise<AxiosHttpResult<Page<ExtendedTask>>> {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get<Page<ExtendedTask>>(this.getCompletedTasksAddress(), fullParams);
  }
}

export { ExtendedTaskService };
