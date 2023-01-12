import type {
  AxiosHttpResult,
  BatchEntity,
  BpmnPathParams,
  BpmnDeleteQueryParams,
  ProcessDefinitionEntity,
  ProcessDefinitionQueryParams,
  ProcessDefinitionActivityInstanceStatisticsQueryParams,
  ProcessDefinitionActivityInstanceStatisticsEntity,
  CalledProcessDefinitionEntity,
  ProcessDefinitionFormVariablesQueryParams,
  ProcessDefinitionFormVariablesEntity,
  ProcessDefinitionStartFormEntity,
  ProcessDefinitionProcessInstanceStatisticsQueryParams,
  ProcessDefinitionProcessInstanceStatisticsEntity,
  ProcessDefinitionXmlEntity,
  ProcessInstanceEntity,
  ProcessDefinitionStartRequestBody,
  ProcessDefinitionSubmitFormRequestBody,
  ProcessDefinitionSuspendedByIdRequestBody,
  ProcessDefinitionSuspendedByKeyRequestBody,
  ProcessDefinitionHistoryTimeToLiveRequestBody,
  ProcessDefinitionRestartAsyncRequestBody,
  ProcessDefinitionSortBy
} from '/@/declarations';
import { HttpConfig, BpmnQueryService } from '../base';

class ProcessDefinitionService extends BpmnQueryService<
  ProcessDefinitionEntity,
  ProcessDefinitionQueryParams,
  ProcessDefinitionSortBy
> {
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

  public getActivityInstanceStatistics(
    path: BpmnPathParams,
    query: ProcessDefinitionActivityInstanceStatisticsQueryParams
  ) {
    return this.getConfig()
      .getHttp()
      .get<ProcessDefinitionActivityInstanceStatisticsEntity>(this.createAddressWithParam(path, 'statistics'), query);
  }

  public getStaticCalled(path: BpmnPathParams) {
    return this.getConfig()
      .getHttp()
      .get<CalledProcessDefinitionEntity>(this.createAddressWithParam(path, 'static-called-process-definitions'));
  }

  public getDiagram(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<string>(this.createAddressWithParam(path, 'diagram'));
  }

  public getFormVariables(path: BpmnPathParams, query: ProcessDefinitionFormVariablesQueryParams) {
    return this.getConfig()
      .getHttp()
      .get<ProcessDefinitionFormVariablesEntity>(this.createAddressWithParam(path, 'form-variables'), query);
  }

  public getRenderedForm(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<string>(this.createAddressWithParam(path, 'rendered-form'));
  }

  public getStartForm(path: BpmnPathParams) {
    return this.getConfig()
      .getHttp()
      .get<ProcessDefinitionStartFormEntity>(this.createAddressWithParam(path, 'startForm'));
  }

  public getProcessInstanceStatistics(query: ProcessDefinitionProcessInstanceStatisticsQueryParams) {
    const address = this.getBaseAddress() + '/statistics';
    return this.getConfig().getHttp().get<ProcessDefinitionProcessInstanceStatisticsEntity>(address, query);
  }

  public getXml(path: BpmnPathParams) {
    return this.getConfig().getHttp().get<ProcessDefinitionXmlEntity>(this.createAddressWithParam(path, 'xml'));
  }

  public getByPathParams(path: BpmnPathParams): Promise<AxiosHttpResult<ProcessDefinitionEntity>> {
    return this.getConfig().getHttp().get<ProcessDefinitionEntity>(this.createAddressWithParam(path));
  }

  public getDeployedStartForm(path: BpmnPathParams): Promise<AxiosHttpResult<any>> {
    return this.getConfig().getHttp().get<any>(this.createAddressWithParam(path, 'deployed-start-form'));
  }

  public start(
    path: BpmnPathParams,
    data: ProcessDefinitionStartRequestBody
  ): Promise<AxiosHttpResult<ProcessInstanceEntity>> {
    return this.getConfig()
      .getHttp()
      .post<ProcessInstanceEntity, ProcessDefinitionStartRequestBody>(this.createAddressWithParam(path, 'start'), data);
  }

  public submitForm(
    path: BpmnPathParams,
    data: ProcessDefinitionSubmitFormRequestBody
  ): Promise<AxiosHttpResult<ProcessInstanceEntity>> {
    return this.getConfig()
      .getHttp()
      .post<ProcessInstanceEntity, ProcessDefinitionSubmitFormRequestBody>(
        this.createAddressWithParam(path, 'submit-form'),
        data
      );
  }

  public suspendById(
    path: BpmnPathParams,
    data: ProcessDefinitionSuspendedByIdRequestBody
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessDefinitionSuspendedByIdRequestBody>(this.createAddressWithParam(path, 'suspended'), data);
  }

  public suspendByKey(data: ProcessDefinitionSuspendedByKeyRequestBody): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + '/suspended';
    return this.getConfig().getHttp().put<string, ProcessDefinitionSuspendedByKeyRequestBody>(address, data);
  }

  public historyTimeToLive(
    path: BpmnPathParams,
    data: ProcessDefinitionHistoryTimeToLiveRequestBody
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessDefinitionHistoryTimeToLiveRequestBody>(
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

  public restart(id: string, data: ProcessDefinitionRestartAsyncRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ProcessDefinitionRestartAsyncRequestBody>(this.createAddressWithParam({ id: id }, 'restart'), data);
  }

  public restartAsync(
    id: string,
    data: ProcessDefinitionRestartAsyncRequestBody
  ): Promise<AxiosHttpResult<BatchEntity>> {
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ProcessDefinitionRestartAsyncRequestBody>(
        this.createAddressWithParam({ id: id }, 'restart-async'),
        data
      );
  }
}

export { ProcessDefinitionService };
