import type { HistoryProcessInstance, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy } from '../../../declarations';
import { HttpConfig, BpmnQueryByPostService } from '../../base';
declare class HistoryProcessInstanceService extends BpmnQueryByPostService<HistoryProcessInstance, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryProcessInstanceService;
    getBaseAddress(): string;
}
export { HistoryProcessInstanceService };
