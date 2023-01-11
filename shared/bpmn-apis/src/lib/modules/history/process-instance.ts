import type {
  HistoryProcessInstance,
  HistoryProcessInstanceQueryParam,
  HistoryProcessInstanceSortBy
} from '/@/declarations';

import { HttpConfig, BpmnQueryByPostService } from '../../base';

class HistoryProcessInstanceService extends BpmnQueryByPostService<
  HistoryProcessInstance,
  HistoryProcessInstanceQueryParam,
  HistoryProcessInstanceSortBy
> {
  private static instance: HistoryProcessInstanceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): HistoryProcessInstanceService {
    if (this.instance == null) {
      this.instance = new HistoryProcessInstanceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/history/process-instance';
  }
}

export { HistoryProcessInstanceService };
