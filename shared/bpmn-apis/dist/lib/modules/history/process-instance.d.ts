import { HttpConfig, BpmnQueryByPostService } from '../../base';
import { HistoryProcessInstanceEntity, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy } from '../../../declarations';

declare class HistoryProcessInstanceService extends BpmnQueryByPostService<HistoryProcessInstanceEntity, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryProcessInstanceService;
    getBaseAddress(): string;
}
export { HistoryProcessInstanceService };
