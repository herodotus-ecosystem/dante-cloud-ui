import { BatchEntity, AxiosHttpResult, ProcessInstanceEntity, ActivityInstance, ProcessInstanceQueryParams, ProcessInstanceModificationRequestBody, ProcessInstanceDeleteQueryParams, ProcessInstanceDeleteAsyncRequestBody, ProcessInstanceDeleteAsyncHistoricQueryBasedRequestBody, ProcessInstanceJobRetriesRequestBody, ProcessInstanceJobRetriesHistoricQueryBasedRequestBody, ProcessInstanceAsyncRequestBody, ProcessInstanceSuspendRequestBody, ProcessInstanceSuspendInRequestBody, ProcessInstanceSortBy } from '../../declarations';
import { HttpConfig, BaseBpmnService } from '../base';
declare class ProcessInstanceService extends BaseBpmnService<ProcessInstanceEntity, ProcessInstanceQueryParams, ProcessInstanceSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessInstanceService;
    getBaseAddress(): string;
    getActivityInstance(id: string): Promise<AxiosHttpResult<ActivityInstance>>;
    modification(id: string, data: ProcessInstanceModificationRequestBody): Promise<AxiosHttpResult<string>>;
    modificationAsync(id: string, data: ProcessInstanceModificationRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    deleteById(id: string, query: ProcessInstanceDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    deleteAsync(data: ProcessInstanceDeleteAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    deleteAsyncHistoricQueryBased(data: ProcessInstanceDeleteAsyncHistoricQueryBasedRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    jobRetries(data: ProcessInstanceJobRetriesRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    jobRetriesHistoricQueryBased(data: ProcessInstanceJobRetriesHistoricQueryBasedRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    variablesAsync(data: ProcessInstanceAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    messageAsync(data: ProcessInstanceAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    suspendById(id: string, data: ProcessInstanceSuspendRequestBody): Promise<AxiosHttpResult<string>>;
    suspend(data: ProcessInstanceSuspendRequestBody): Promise<AxiosHttpResult<string>>;
    suspendedAsync(data: ProcessInstanceSuspendInRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
}
export { ProcessInstanceService };
