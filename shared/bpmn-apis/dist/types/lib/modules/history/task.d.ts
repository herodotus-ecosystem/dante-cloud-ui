import { HistoryTaskEntity, HistoryTaskQueryParams, HistoryTaskSortBy } from '../../../declarations';
import { HttpConfig, BpmnQueryByPostService } from '../../base';
declare class HistoryTaskService extends BpmnQueryByPostService<HistoryTaskEntity, HistoryTaskQueryParams, HistoryTaskSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryTaskService;
    getBaseAddress(): string;
}
export { HistoryTaskService };
