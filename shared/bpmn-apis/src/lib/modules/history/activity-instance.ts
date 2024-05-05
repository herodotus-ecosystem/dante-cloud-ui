import type {
  HistoryActivityInstanceEntity,
  HistoryActivityInstanceQueryParams,
  HistoryActivityInstanceSortBy
} from '/@/declarations';

import { HttpConfig, BpmnQueryByPostService } from '../../base';

class HistoryActivityInstanceService extends BpmnQueryByPostService<
  HistoryActivityInstanceEntity,
  HistoryActivityInstanceQueryParams,
  HistoryActivityInstanceSortBy
> {
  private static instance: HistoryActivityInstanceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): HistoryActivityInstanceService {
    if (this.instance == null) {
      this.instance = new HistoryActivityInstanceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/history/activity-instance';
  }
}

export { HistoryActivityInstanceService };
