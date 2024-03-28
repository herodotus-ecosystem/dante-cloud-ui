import { HttpConfig, BaseService } from '../base';
import { AxiosHttpResult, ExtendedTaskEntity, Page, Pageable, Conditions } from '../../declarations';

declare class ExtendedTaskService extends BaseService<ExtendedTaskEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ExtendedTaskService;
    getBaseAddress(): string;
    getToDoTasksAddress(): string;
    getCompletedTasksAddress(): string;
    fetchToDoTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>>;
    fetchCompletedTasksByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<ExtendedTaskEntity>>>;
}
export { ExtendedTaskService };
