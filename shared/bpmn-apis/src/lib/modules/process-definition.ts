import type {
  AxiosHttpResult,
  Batch,
  BpmnPathParams,
  BpmnDeleteQueryParams,
  ProcessDefinition,
  ProcessDefinitionQueryParams,
  StatisticsQueryParams,
  ProcessDefinitionActivityInstanceStatistics,
  CalledProcessDefinition,
  ProcessDefinitionFormVariablesQueryParams,
  ProcessDefinitionFormVariables,
  ProcessDefinitionStartForm,
  ProcessDefinitionProcessInstanceStatisticsQueryParams,
  ProcessDefinitionProcessInstanceStatistics,
  ProcessDefinitionXml,
  ProcessInstance,
  ProcessDefinitionStartBody,
  ProcessDefinitionSubmitFormBody,
  ProcessDefinitionSuspendedByIdBody,
  ProcessDefinitionSuspendedByKeyBody,
  ProcessDefinitionHistoryTimeToLiveBody,
  ProcessDefinitionRestartAsyncBody
} from '/@/declarations';
import { HttpConfig, BaseBpmnService } from '../base';

class ProcessDefinitionService extends BaseBpmnService<ProcessDefinition, ProcessDefinitionQueryParams> {
  private static instance: ProcessDefinitionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProcessDefinitionService {
    if (this.instance == null) {
      this.instance = new ProcessDefinitionService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/process-definition';
  }

  public getActivityInstanceStatistics(path: BpmnPathParams, query: StatisticsQueryParams) {
    return this.getConfig()
      .getHttp()
      .get<ProcessDefinitionActivityInstanceStatistics>(this.createAddressWithParam(path, 'statistics'), query);
  }

  public getStaticCalled(path: BpmnPathParams) {
    return this.getConfig()
      .getHttp()
      .get<CalledProcessDefinition>(this.createAddressWithParam(path, 'static-called-process-definitions'));
  }

  public getDiagram(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<string>(this.createAddressWithParam(path, 'diagram'));
  }

  public getFormVariables(path: BpmnPathParams, query: ProcessDefinitionFormVariablesQueryParams) {
    return this.getConfig()
      .getHttp()
      .get<ProcessDefinitionFormVariables>(this.createAddressWithParam(path, 'form-variables'), query);
  }

  public getRenderedForm(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<string>(this.createAddressWithParam(path, 'rendered-form'));
  }

  public getStartForm(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<ProcessDefinitionStartForm>(this.createAddressWithParam(path, 'startForm'));
  }

  public getProcessInstanceStatistics(query: ProcessDefinitionProcessInstanceStatisticsQueryParams) {
    const address = this.getBaseAddress() + '/statistics';
    return this.getConfig().getHttp().get<ProcessDefinitionProcessInstanceStatistics>(address, query);
  }

  public getXml(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<ProcessDefinitionXml>(this.createAddressWithParam(path, 'xml'));
  }

  public get(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinition>> {
    return this.getConfig().getHttp().get<ProcessDefinition>(this.createAddressWithParam(path));
  }

  public getDeployedStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<any>> {
    return this.getConfig().getHttp().get<any>(this.createAddressWithParam(path, 'deployed-start-form'));
  }

  public start(path: BpmnPathParams, data: ProcessDefinitionStartBody): Promise<AxiosHttpResult<ProcessInstance>> {
    return this.getConfig()
      .getHttp()
      .post<ProcessInstance, ProcessDefinitionStartBody>(this.createAddressWithParam(path, 'start'), data);
  }

  public submitForm(
    path: BpmnPathParams,
    data: ProcessDefinitionSubmitFormBody
  ): Promise<AxiosHttpResult<ProcessInstance>> {
    return this.getConfig()
      .getHttp()
      .post<ProcessInstance, ProcessDefinitionSubmitFormBody>(this.createAddressWithParam(path, 'submit-form'), data);
  }

  public suspendById(path: BpmnPathParams, data: ProcessDefinitionSuspendedByIdBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessDefinitionSuspendedByIdBody>(this.createAddressWithParam(path, 'suspended'), data);
  }

  public suspendByKey(data: ProcessDefinitionSuspendedByKeyBody): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + '/suspended';
    return this.getConfig().getHttp().put<string, ProcessDefinitionSuspendedByKeyBody>(address, data);
  }

  public historyTimeToLive(
    path: BpmnPathParams,
    data: ProcessDefinitionHistoryTimeToLiveBody
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessDefinitionHistoryTimeToLiveBody>(
        this.createAddressWithParam(path, 'history-time-to-live'),
        data
      );
  }

  public deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public deleteByKey(key: string, tenantId = '', query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ key: key, tenantId: tenantId }, 'delete'), query);
  }

  public restart(id: string, data: ProcessDefinitionRestartAsyncBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ProcessDefinitionRestartAsyncBody>(this.createAddressWithParam({ id: id }, 'restart'), data);
  }

  public restartAsync(id: string, data: ProcessDefinitionRestartAsyncBody): Promise<AxiosHttpResult<Batch>> {
    return this.getConfig()
      .getHttp()
      .post<Batch, ProcessDefinitionRestartAsyncBody>(this.createAddressWithParam({ id: id }, 'restart-async'), data);
  }
}

export { ProcessDefinitionService };
