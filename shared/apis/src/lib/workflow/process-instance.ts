import { ApiConfig, BaseBpmnService } from '../base';

import {
  Batch,
  AxiosHttpResult,
  ProcessInstance,
  ActivityInstance,
  ProcessInstanceParams,
  ProcessInstanceModificationBody,
  ProcessInstanceDeleteQueryParams,
  ProcessInstanceDeleteAsyncBody,
  ProcessInstanceDeleteAsyncHistoricQueryBasedBody,
  ProcessInstanceJobRetriesBody,
  ProcessInstanceJobRetriesHistoricQueryBasedBody,
  ProcessInstanceAsyncBody,
  ProcessInstanceSuspendBody,
  ProcessInstanceSuspendInBody
} from '/@/declarations';

class ProcessInstanceService extends BaseBpmnService<ProcessInstance, ProcessInstanceParams> {
  private static instance: ProcessInstanceService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): ProcessInstanceService {
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

  public modification(id: string, data: ProcessInstanceModificationBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ProcessInstanceModificationBody>(this.createAddressWithParam({ id: id }, 'modification'), data);
  }

  public modificationAsync(id: string, data: ProcessInstanceModificationBody): Promise<AxiosHttpResult<Batch>> {
    return this.getConfig()
      .getHttp()
      .post<Batch, ProcessInstanceModificationBody>(
        this.createAddressWithParam({ id: id }, 'modification-async'),
        data
      );
  }

  public deleteById(id: string, query: ProcessInstanceDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public deleteAsync(data: ProcessInstanceDeleteAsyncBody): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'delete';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceDeleteAsyncBody>(address, data);
  }

  public deleteAsyncHistoricQueryBased(
    data: ProcessInstanceDeleteAsyncHistoricQueryBasedBody
  ): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'delete-historic-query-based';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceDeleteAsyncHistoricQueryBasedBody>(address, data);
  }

  public jobRetries(data: ProcessInstanceJobRetriesBody): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'job-retries';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceJobRetriesBody>(address, data);
  }

  public jobRetriesHistoricQueryBased(
    data: ProcessInstanceJobRetriesHistoricQueryBasedBody
  ): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'job-retries-historic-query-based';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceJobRetriesHistoricQueryBasedBody>(address, data);
  }

  public variablesAsync(data: ProcessInstanceAsyncBody): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'variables-async';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceAsyncBody>(address, data);
  }

  public messageAsync(data: ProcessInstanceAsyncBody): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'message-async';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceAsyncBody>(address, data);
  }

  public suspendById(id: string, data: ProcessInstanceSuspendBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ProcessInstanceSuspendBody>(this.createAddressWithParam({ id: id }, 'suspended'), data);
  }

  public suspend(data: ProcessInstanceSuspendBody): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + 'suspended';
    return this.getConfig().getHttp().put<string, ProcessInstanceSuspendBody>(address, data);
  }

  public suspendedAsync(data: ProcessInstanceSuspendInBody): Promise<AxiosHttpResult<Batch>> {
    const address = this.getBaseAddress() + 'suspended-async';
    return this.getConfig().getHttp().post<Batch, ProcessInstanceSuspendInBody>(address, data);
  }
}

export { ProcessInstanceService };
