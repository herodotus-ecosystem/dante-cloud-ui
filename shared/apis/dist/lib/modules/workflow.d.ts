import type { AxiosHttpResult, ExtendedTask, Page, Pageable, Conditions } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class ExtendedTaskService extends BaseService<ExtendedTask> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ExtendedTaskService;
    getBaseAddress(): string;
    getToDoTasksAddress(): string;
    getCompletedTasksAddress(): string;
    fetchToDoTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTask>>>;
    fetchCompletedTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTask>>>;
}
export { ExtendedTaskService };
