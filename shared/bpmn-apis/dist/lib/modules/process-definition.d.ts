import type { AxiosHttpResult, Batch, BpmnPathParams, BpmnDeleteQueryParams, ProcessDefinition, ProcessDefinitionQueryParams, StatisticsQueryParams, ProcessDefinitionActivityInstanceStatistics, CalledProcessDefinition, ProcessDefinitionFormVariablesQueryParams, ProcessDefinitionFormVariables, ProcessDefinitionStartForm, ProcessDefinitionProcessInstanceStatisticsQueryParams, ProcessDefinitionProcessInstanceStatistics, ProcessDefinitionXml, ProcessInstance, ProcessDefinitionStartBody, ProcessDefinitionSubmitFormBody, ProcessDefinitionSuspendedByIdBody, ProcessDefinitionSuspendedByKeyBody, ProcessDefinitionHistoryTimeToLiveBody, ProcessDefinitionRestartAsyncBody } from '../../declarations';
import { HttpConfig, BaseBpmnService } from '../base';
declare class ProcessDefinitionService extends BaseBpmnService<ProcessDefinition, ProcessDefinitionQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessDefinitionService;
    getBaseAddress(): string;
    getActivityInstanceStatistics(path: BpmnPathParams, query: StatisticsQueryParams): Promise<AxiosHttpResult<ProcessDefinitionActivityInstanceStatistics>>;
    getStaticCalled(path: BpmnPathParams): Promise<AxiosHttpResult<CalledProcessDefinition>>;
    getDiagram(path: BpmnPathParams): Promise<AxiosHttpResult<string>>;
    getFormVariables(path: BpmnPathParams, query: ProcessDefinitionFormVariablesQueryParams): Promise<AxiosHttpResult<ProcessDefinitionFormVariables>>;
    getRenderedForm(path: BpmnPathParams): Promise<AxiosHttpResult<string>>;
    getStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionStartForm>>;
    getProcessInstanceStatistics(query: ProcessDefinitionProcessInstanceStatisticsQueryParams): Promise<AxiosHttpResult<ProcessDefinitionProcessInstanceStatistics>>;
    getXml(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionXml>>;
    get(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinition>>;
    getDeployedStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<any>>;
    start(path: BpmnPathParams, data: ProcessDefinitionStartBody): Promise<AxiosHttpResult<ProcessInstance>>;
    submitForm(path: BpmnPathParams, data: ProcessDefinitionSubmitFormBody): Promise<AxiosHttpResult<ProcessInstance>>;
    suspendById(path: BpmnPathParams, data: ProcessDefinitionSuspendedByIdBody): Promise<AxiosHttpResult<string>>;
    suspendByKey(data: ProcessDefinitionSuspendedByKeyBody): Promise<AxiosHttpResult<string>>;
    historyTimeToLive(path: BpmnPathParams, data: ProcessDefinitionHistoryTimeToLiveBody): Promise<AxiosHttpResult<string>>;
    deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    deleteByKey(key: string, tenantId: string | undefined, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    restart(id: string, data: ProcessDefinitionRestartAsyncBody): Promise<AxiosHttpResult<string>>;
    restartAsync(id: string, data: ProcessDefinitionRestartAsyncBody): Promise<AxiosHttpResult<Batch>>;
}
export { ProcessDefinitionService };
