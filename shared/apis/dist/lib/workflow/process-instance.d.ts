import { ApiConfig, BaseBpmnService } from '../base';
import { Batch, AxiosHttpResult, ProcessInstance, ActivityInstance, ProcessInstanceParams, ProcessInstanceModificationBody, ProcessInstanceDeleteQueryParams, ProcessInstanceDeleteAsyncBody, ProcessInstanceDeleteAsyncHistoricQueryBasedBody, ProcessInstanceJobRetriesBody, ProcessInstanceJobRetriesHistoricQueryBasedBody, ProcessInstanceAsyncBody, ProcessInstanceSuspendBody, ProcessInstanceSuspendInBody } from '../../declarations';
declare class ProcessInstanceService extends BaseBpmnService<ProcessInstance, ProcessInstanceParams> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): ProcessInstanceService;
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
