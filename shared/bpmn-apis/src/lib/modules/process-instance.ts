import {
  BatchEntity,
  AxiosHttpResult,
  ProcessInstanceEntity,
  ActivityInstance,
  ProcessInstanceQueryParams,
  ProcessInstanceModificationRequestBody,
  ProcessInstanceDeleteQueryParams,
  ProcessInstanceDeleteAsyncRequestBody,
  ProcessInstanceDeleteAsyncHistoricQueryBasedRequestBody,
  ProcessInstanceJobRetriesRequestBody,
  ProcessInstanceJobRetriesHistoricQueryBasedRequestBody,
  ProcessInstanceAsyncRequestBody,
  ProcessInstanceSuspendRequestBody,
  ProcessInstanceSuspendInRequestBody,
  ProcessInstanceSortBy
} from '/@/declarations';

import { HttpConfig, BaseBpmnService } from '../base';

class ProcessInstanceService extends BaseBpmnService<
  ProcessInstanceEntity,
  ProcessInstanceQueryParams,
  ProcessInstanceSortBy
> {
  private static instance: ProcessInstanceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProcessInstanceService {
    if (this.instance == null) {
      this.instance = new ProcessInstanceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/process-instance';
  }

  public getActivityInstance(id: string): Promise<AxiosHttpResult<ActivityInstance>> {
    return this.getConfig()
      .getHttp()
      .get<ActivityInstance, string>(this.createAddressWithParam({ id: id }, 'activity-instances'));
  }

  public modification(id: string, data: ProcessInstanceModificationRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ProcessInstanceModificationRequestBody>(
        this.createAddressWithParam({ id: id }, 'modification'),
        data
      );
  }

  public modificationAsync(id: string, data: ProcessInstanceModificationRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ProcessInstanceModificationRequestBody>(
        this.createAddressWithParam({ id: id }, 'modification-async'),
        data
      );
  }

  public deleteById(id: string, query: ProcessInstanceDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public deleteAsync(data: ProcessInstanceDeleteAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'delete';
    return this.getConfig().getHttp().post<BatchEntity, ProcessInstanceDeleteAsyncRequestBody>(address, data);
  }

  public deleteAsyncHistoricQueryBased(
    data: ProcessInstanceDeleteAsyncHistoricQueryBasedRequestBody
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'delete-historic-query-based';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ProcessInstanceDeleteAsyncHistoricQueryBasedRequestBody>(address, data);
  }

  public jobRetries(data: ProcessInstanceJobRetriesRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'job-retries';
    return this.getConfig().getHttp().post<BatchEntity, ProcessInstanceJobRetriesRequestBody>(address, data);
  }

  public jobRetriesHistoricQueryBased(
    data: ProcessInstanceJobRetriesHistoricQueryBasedRequestBody
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'job-retries-historic-query-based';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ProcessInstanceJobRetriesHistoricQueryBasedRequestBody>(address, data);
  }

  public variablesAsync(data: ProcessInstanceAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'variables-async';
    return this.getConfig().getHttp().post<BatchEntity, ProcessInstanceAsyncRequestBody>(address, data);
  }

  public messageAsync(data: ProcessInstanceAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'message-async';
    return this.getConfig().getHttp().post<BatchEntity, ProcessInstanceAsyncRequestBody>(address, data);
  }

  public suspendById(id: string, data: ProcessInstanceSuspendRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessInstanceSuspendRequestBody>(this.createAddressWithParam({ id: id }, 'suspended'), data);
  }

  public suspend(data: ProcessInstanceSuspendRequestBody): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + 'suspended';
    return this.getConfig().getHttp().put<string, ProcessInstanceSuspendRequestBody>(address, data);
  }

  public suspendedAsync(data: ProcessInstanceSuspendInRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'suspended-async';
    return this.getConfig().getHttp().post<BatchEntity, ProcessInstanceSuspendInRequestBody>(address, data);
  }
}

export { ProcessInstanceService };
