import type { AxiosHttpResult, BatchEntity, BpmnPathParams, BpmnDeleteQueryParams, ProcessDefinitionEntity, ProcessDefinitionQueryParams, ProcessDefinitionActivityInstanceStatisticsQueryParams, ProcessDefinitionActivityInstanceStatisticsEntity, CalledProcessDefinitionEntity, ProcessDefinitionFormVariablesQueryParams, ProcessDefinitionFormVariablesEntity, ProcessDefinitionStartFormEntity, ProcessDefinitionProcessInstanceStatisticsQueryParams, ProcessDefinitionProcessInstanceStatisticsEntity, ProcessDefinitionXmlEntity, ProcessInstanceEntity, ProcessDefinitionStartRequestBody, ProcessDefinitionSubmitFormRequestBody, ProcessDefinitionSuspendedByIdRequestBody, ProcessDefinitionSuspendedByKeyRequestBody, ProcessDefinitionHistoryTimeToLiveRequestBody, ProcessDefinitionRestartAsyncRequestBody, ProcessDefinitionSortBy } from '../../declarations';
import { HttpConfig, BpmnQueryService } from '../base';
declare class ProcessDefinitionService extends BpmnQueryService<ProcessDefinitionEntity, ProcessDefinitionQueryParams, ProcessDefinitionSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessDefinitionService;
    getBaseAddress(): string;
    getActivityInstanceStatistics(path: BpmnPathParams, query: ProcessDefinitionActivityInstanceStatisticsQueryParams): Promise<AxiosHttpResult<ProcessDefinitionActivityInstanceStatisticsEntity>>;
    getStaticCalled(path: BpmnPathParams): Promise<AxiosHttpResult<CalledProcessDefinitionEntity>>;
    getDiagram(path: BpmnPathParams): Promise<AxiosHttpResult<string>>;
    getFormVariables(path: BpmnPathParams, query: ProcessDefinitionFormVariablesQueryParams): Promise<AxiosHttpResult<ProcessDefinitionFormVariablesEntity>>;
    getRenderedForm(path: BpmnPathParams): Promise<AxiosHttpResult<string>>;
    getStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionStartFormEntity>>;
    getProcessInstanceStatistics(query: ProcessDefinitionProcessInstanceStatisticsQueryParams): Promise<AxiosHttpResult<ProcessDefinitionProcessInstanceStatisticsEntity>>;
    getXml(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionXmlEntity>>;
    getByPathParams(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionEntity>>;
    getDeployedStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<any>>;
    start(path: BpmnPathParams, data: ProcessDefinitionStartRequestBody): Promise<AxiosHttpResult<ProcessInstanceEntity>>;
    submitForm(path: BpmnPathParams, data: ProcessDefinitionSubmitFormRequestBody): Promise<AxiosHttpResult<ProcessInstanceEntity>>;
    suspendById(path: BpmnPathParams, data: ProcessDefinitionSuspendedByIdRequestBody): Promise<AxiosHttpResult<string>>;
    suspendByKey(data: ProcessDefinitionSuspendedByKeyRequestBody): Promise<AxiosHttpResult<string>>;
    historyTimeToLive(path: BpmnPathParams, data: ProcessDefinitionHistoryTimeToLiveRequestBody): Promise<AxiosHttpResult<string>>;
    deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    deleteByKey(key: string, tenantId: string | undefined, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    restart(id: string, data: ProcessDefinitionRestartAsyncRequestBody): Promise<AxiosHttpResult<string>>;
    restartAsync(id: string, data: ProcessDefinitionRestartAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
}
export { ProcessDefinitionService };
