import type { HistoryTaskEntity, HistoryTaskQueryParams, HistoryTaskSortBy } from '@/declarations';

import { HttpConfig, BpmnQueryByPostService } from '../../base';

class HistoryTaskService extends BpmnQueryByPostService<
  HistoryTaskEntity,
  HistoryTaskQueryParams,
  HistoryTaskSortBy
> {
  private static instance: HistoryTaskService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): HistoryTaskService {
    if (this.instance == null) {
      this.instance = new HistoryTaskService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/history/task';
  }
}

export { HistoryTaskService };
