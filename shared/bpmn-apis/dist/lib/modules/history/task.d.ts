import { HttpConfig, BpmnQueryByPostService } from '../../base';
import { HistoryTaskEntity, HistoryTaskQueryParams, HistoryTaskSortBy } from '../../../declarations';

declare class HistoryTaskService extends BpmnQueryByPostService<HistoryTaskEntity, HistoryTaskQueryParams, HistoryTaskSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryTaskService;
    getBaseAddress(): string;
}
export { HistoryTaskService };
