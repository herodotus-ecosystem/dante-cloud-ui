import type {
  BatchEntity,
  AxiosHttpResult,
  ProcessInstanceEntity,
  ProcessInstanceQueryParams,
  ProcessInstanceSortBy,
  ProcessInstanceDeleteQueryParams,
  ActivityInstanceEntity,
  ModifyRequestBody,
  DeleteAsyncRequestBody,
  DeleteAsyncHistoricQueryBasedRequestBody,
  SetJobRetriesAsyncRequestBody,
  SetJobRetriesAsyncHistoricQueryBasedRequestBody,
  SetVariablesAsyncRequestBody,
  CorrelateMessageAsyncRequestBody,
  ActivateOrSuspendByIdRequestBody,
  ActivateOrSuspendByProcessDefinitionIdRequestBody,
  ActivateOrSuspendByProcessDefinitionKeyRequestBody,
  ActivateOrSuspendInRequestBody,
} from '@/declarations';

import { HttpConfig, BaseBpmnService } from '../base';

class ProcessInstanceService extends BaseBpmnService<
  ProcessInstanceEntity,
  ProcessInstanceQueryParams,
  ProcessInstanceSortBy,
  ProcessInstanceDeleteQueryParams
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

  /**
   * Retrieves an Activity Instance (Tree) for a given process instance by id.
   *
   * @param id The id of the process instance for which the activity instance should be retrieved.
   * @returns A JSON object corresponding to the Activity Instance tree of the given process instance.
   */
  public getActivityInstance(id: string): Promise<AxiosHttpResult<ActivityInstanceEntity>> {
    return this.getConfig()
      .getHttp()
      .get<ActivityInstanceEntity, string>(this.createAddressById(id, 'activity-instances'));
  }

  /**
   * Submits a list of modification instructions to change a process instance's execution state.
   * A modification instruction is one of the following:
   * · Starting execution before an activity
   * · Starting execution after an activity on its single outgoing sequence flow
   * · Starting execution on a specific sequence flow
   * · Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   * Instructions are executed immediately and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * @param id The id of the process instance to modify.
   * @param data {@link ModifyRequestBody}
   * @returns This method returns no content.
   */
  public modify(id: string, data: ModifyRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ModifyRequestBody>(this.createAddressById(id, 'modification'), data);
  }

  /**
   * Submits a list of modification instructions to change a process instance's execution state async.
   * A modification instruction is one of the following:
   * · Starting execution before an activity
   * · Starting execution after an activity on its single outgoing sequence flow
   * · Starting execution on a specific sequence flow
   * · Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   * Instructions are executed asynchronous and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * @param id The id of the process instance to modify.
   * @param data {@link ModifyRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public modifyAsync(id: string, data: ModifyRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ModifyRequestBody>(this.createAddressById(id, 'modification-async'), data);
  }

  /**
   * Deletes multiple process instances asynchronously (batch).
   *
   * @param data {@link DeleteAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public deleteAsync(data: DeleteAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + '/delete';
    return this.getConfig().getHttp().post<BatchEntity, DeleteAsyncRequestBody>(address, data);
  }

  /**
   * Deletes a set of process instances asynchronously (batch) based on a historic process instance query.
   *
   * @param data {@link DeleteAsyncHistoricQueryBasedRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public deleteAsyncHistoricQueryBased(
    data: DeleteAsyncHistoricQueryBasedRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + '/delete-historic-query-based';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, DeleteAsyncHistoricQueryBasedRequestBody>(address, data);
  }

  /**
   * Create a batch to set retries of jobs associated with given processes asynchronously.
   *
   * @param data {@link SetJobRetriesAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public setJobRetriesAsync(
    data: SetJobRetriesAsyncRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + '/job-retries';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, SetJobRetriesAsyncRequestBody>(address, data);
  }

  /**
   * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
   *
   * @param data {@link SetJobRetriesAsyncHistoricQueryBasedRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public setJobRetriesAsyncHistoricQueryBased(
    data: SetJobRetriesAsyncHistoricQueryBasedRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + '/job-retries-historic-query-based';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, SetJobRetriesAsyncHistoricQueryBasedRequestBody>(address, data);
  }

  /**
   * Update or create runtime process variables in the root scope of process instances.
   *
   * @param data {@link SetVariablesAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public setVariablesAsync(
    data: SetVariablesAsyncRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'variables-async';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, SetVariablesAsyncRequestBody>(address, data);
  }

  /**
   * Correlates a message asynchronously to executions that are waiting for this message. Messages will not be correlated to
   * process definition-level start message events to start process instances.
   *
   * @param data {@link CorrelateMessageAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  public correlateMessageAsync(
    data: CorrelateMessageAsyncRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'message-async';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, CorrelateMessageAsyncRequestBody>(address, data);
  }

  /**
   * Activates or suspends a given process instance by id.
   *
   * @param id The id of the process instance to activate or suspend.
   * @param data {@link ActivateOrSuspendByIdRequestBody}
   * @returns This method returns no content.
   */
  public activateOrSuspendById(
    id: string,
    data: ActivateOrSuspendByIdRequestBody,
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, ActivateOrSuspendByIdRequestBody>(this.createAddressById(id, 'suspended'), data);
  }

  /**
   * Activates or suspends process instances with the given process definition id.
   *
   * @param data {@link ActivateOrSuspendByProcessDefinitionIdRequestBody}
   * @returns This method returns no content.
   */
  public activateOrSuspendByProcessDefinitionId(
    data: ActivateOrSuspendByProcessDefinitionIdRequestBody,
  ): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + '/suspended';
    return this.getConfig()
      .getHttp()
      .put<string, ActivateOrSuspendByProcessDefinitionIdRequestBody>(address, data);
  }

  /**
   * Activates or suspends process instances with the given process definition key.
   *
   * @param data {@link ActivateOrSuspendByProcessDefinitionKeyRequestBody}
   * @returns This method returns no content.
   */
  public activateOrSuspendByProcessDefinitionKey(
    data: ActivateOrSuspendByProcessDefinitionKeyRequestBody,
  ): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + '/suspended';
    return this.getConfig()
      .getHttp()
      .put<string, ActivateOrSuspendByProcessDefinitionKeyRequestBody>(address, data);
  }

  /**
   * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
   * and/or a historical process instance query
   *
   * @param data {@link ActivateOrSuspendInRequestBody}
   * @returns This method returns no content.
   */
  public activateOrSuspendInGroup(
    data: ActivateOrSuspendInRequestBody,
  ): Promise<AxiosHttpResult<string>> {
    const address = this.getBaseAddress() + 'suspended-async';
    return this.getConfig().getHttp().post<string, ActivateOrSuspendInRequestBody>(address, data);
  }

  /**
   * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
   * and/or a historical process instance query
   *
   * @param data {@link ActivateOrSuspendInGroupRequestBody}
   * @returns This method returns no content.
   */
  public activateOrSuspendInBatch(
    data: ActivateOrSuspendInRequestBody,
  ): Promise<AxiosHttpResult<BatchEntity>> {
    const address = this.getBaseAddress() + 'suspended-async';
    return this.getConfig()
      .getHttp()
      .post<BatchEntity, ActivateOrSuspendInRequestBody>(address, data);
  }
}

export { ProcessInstanceService };
