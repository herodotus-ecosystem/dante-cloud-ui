import type { HistoryTask, HistoryTaskQueryParam, HistoryTaskSortBy } from '../../../declarations';
import { HttpConfig, BpmnQueryByPostService } from '../../base';
declare class HistoryTaskService extends BpmnQueryByPostService<HistoryTask, HistoryTaskQueryParam, HistoryTaskSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): HistoryTaskService;
    getBaseAddress(): string;
}
export { HistoryTaskService };
