import { AxiosHttpResult, ExtendedTaskEntity, Page, Pageable, Conditions } from '../../declarations';
import { HttpConfig, AbstractService } from '../base';
declare class ExtendedTaskService extends AbstractService<ExtendedTaskEntity> {
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
