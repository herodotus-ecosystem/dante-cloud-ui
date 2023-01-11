import type { HistoryActivityInstance, HistoryActivityInstanceQueryParams, HistoryActivityInstanceSortBy } from '../../../declarations';
import { HttpConfig, BpmnQueryByPostService } from '../../base';
declare class HistoryActivityInstanceService extends BpmnQueryByPostService<HistoryActivityInstance, HistoryActivityInstanceQueryParams, HistoryActivityInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryActivityInstanceService;
    getBaseAddress(): string;
}
export { HistoryActivityInstanceService };
