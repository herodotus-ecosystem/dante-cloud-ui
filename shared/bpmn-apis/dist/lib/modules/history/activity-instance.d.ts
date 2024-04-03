import { HttpConfig, BpmnQueryByPostService } from '../../base';
import { HistoryActivityInstanceEntity, HistoryActivityInstanceQueryParams, HistoryActivityInstanceSortBy } from '../../../declarations';

declare class HistoryActivityInstanceService extends BpmnQueryByPostService<HistoryActivityInstanceEntity, HistoryActivityInstanceQueryParams, HistoryActivityInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryActivityInstanceService;
    getBaseAddress(): string;
}
export { HistoryActivityInstanceService };
