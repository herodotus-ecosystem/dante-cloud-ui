import { HistoryProcessInstanceEntity, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy } from '../../../declarations';
import { HttpConfig, BpmnQueryByPostService } from '../../base';

declare class HistoryProcessInstanceService extends BpmnQueryByPostService<HistoryProcessInstanceEntity, HistoryProcessInstanceQueryParams, HistoryProcessInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryProcessInstanceService;
    getBaseAddress(): string;
}
export { HistoryProcessInstanceService };
