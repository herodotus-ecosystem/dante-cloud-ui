import { Batch, AxiosHttpResult, ProcessInstance, ActivityInstance, ProcessInstanceQueryParams, ProcessInstanceModificationBody, ProcessInstanceDeleteQueryParams, ProcessInstanceDeleteAsyncBody, ProcessInstanceDeleteAsyncHistoricQueryBasedBody, ProcessInstanceJobRetriesBody, ProcessInstanceJobRetriesHistoricQueryBasedBody, ProcessInstanceAsyncBody, ProcessInstanceSuspendBody, ProcessInstanceSuspendInBody } from '../../declarations';
import { HttpConfig, BaseBpmnService } from '../base';
declare class ProcessInstanceService extends BaseBpmnService<ProcessInstance, ProcessInstanceQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessInstanceService;
    getBaseAddress(): string;
    getActivityInstance(id: string): Promise<AxiosHttpResult<ActivityInstance>>;
    modification(id: string, data: ProcessInstanceModificationBody): Promise<AxiosHttpResult<string>>;
    modificationAsync(id: string, data: ProcessInstanceModificationBody): Promise<AxiosHttpResult<Batch>>;
    deleteById(id: string, query: ProcessInstanceDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    deleteAsync(data: ProcessInstanceDeleteAsyncBody): Promise<AxiosHttpResult<Batch>>;
    deleteAsyncHistoricQueryBased(data: ProcessInstanceDeleteAsyncHistoricQueryBasedBody): Promise<AxiosHttpResult<Batch>>;
    jobRetries(data: ProcessInstanceJobRetriesBody): Promise<AxiosHttpResult<Batch>>;
    jobRetriesHistoricQueryBased(data: ProcessInstanceJobRetriesHistoricQueryBasedBody): Promise<AxiosHttpResult<Batch>>;
    variablesAsync(data: ProcessInstanceAsyncBody): Promise<AxiosHttpResult<Batch>>;
    messageAsync(data: ProcessInstanceAsyncBody): Promise<AxiosHttpResult<Batch>>;
    suspendById(id: string, data: ProcessInstanceSuspendBody): Promise<AxiosHttpResult<string>>;
    suspend(data: ProcessInstanceSuspendBody): Promise<AxiosHttpResult<string>>;
    suspendedAsync(data: ProcessInstanceSuspendInBody): Promise<AxiosHttpResult<Batch>>;
}
export { ProcessInstanceService };
