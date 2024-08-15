import { BatchEntity, AxiosHttpResult, ProcessInstanceEntity, ProcessInstanceQueryParams, ProcessInstanceSortBy, ProcessInstanceDeleteQueryParams, ActivityInstanceEntity, ModifyRequestBody, DeleteAsyncRequestBody, DeleteAsyncHistoricQueryBasedRequestBody, SetJobRetriesAsyncRequestBody, SetJobRetriesAsyncHistoricQueryBasedRequestBody, SetVariablesAsyncRequestBody, CorrelateMessageAsyncRequestBody, ActivateOrSuspendByIdRequestBody, ActivateOrSuspendByProcessDefinitionIdRequestBody, ActivateOrSuspendByProcessDefinitionKeyRequestBody, ActivateOrSuspendInRequestBody } from '../../declarations';
import { HttpConfig, BaseBpmnService } from '../base';
declare class ProcessInstanceService extends BaseBpmnService<ProcessInstanceEntity, ProcessInstanceQueryParams, ProcessInstanceSortBy, ProcessInstanceDeleteQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessInstanceService;
    getBaseAddress(): string;
    /**
     * Retrieves an Activity Instance (Tree) for a given process instance by id.
     *
     * @param id The id of the process instance for which the activity instance should be retrieved.
     * @returns A JSON object corresponding to the Activity Instance tree of the given process instance.
     */
    getActivityInstance(id: string): Promise<AxiosHttpResult<ActivityInstanceEntity>>;
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
    modify(id: string, data: ModifyRequestBody): Promise<AxiosHttpResult<string>>;
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
    modifyAsync(id: string, data: ModifyRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Deletes multiple process instances asynchronously (batch).
     *
     * @param data {@link DeleteAsyncRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    deleteAsync(data: DeleteAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Deletes a set of process instances asynchronously (batch) based on a historic process instance query.
     *
     * @param data {@link DeleteAsyncHistoricQueryBasedRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    deleteAsyncHistoricQueryBased(data: DeleteAsyncHistoricQueryBasedRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Create a batch to set retries of jobs associated with given processes asynchronously.
     *
     * @param data {@link SetJobRetriesAsyncRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    setJobRetriesAsync(data: SetJobRetriesAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
     *
     * @param data {@link SetJobRetriesAsyncHistoricQueryBasedRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    setJobRetriesAsyncHistoricQueryBased(data: SetJobRetriesAsyncHistoricQueryBasedRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Update or create runtime process variables in the root scope of process instances.
     *
     * @param data {@link SetVariablesAsyncRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    setVariablesAsync(data: SetVariablesAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Correlates a message asynchronously to executions that are waiting for this message. Messages will not be correlated to
     * process definition-level start message events to start process instances.
     *
     * @param data {@link CorrelateMessageAsyncRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    correlateMessageAsync(data: CorrelateMessageAsyncRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
    /**
     * Activates or suspends a given process instance by id.
     *
     * @param id The id of the process instance to activate or suspend.
     * @param data {@link ActivateOrSuspendByIdRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendById(id: string, data: ActivateOrSuspendByIdRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Activates or suspends process instances with the given process definition id.
     *
     * @param data {@link ActivateOrSuspendByProcessDefinitionIdRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendByProcessDefinitionId(data: ActivateOrSuspendByProcessDefinitionIdRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Activates or suspends process instances with the given process definition key.
     *
     * @param data {@link ActivateOrSuspendByProcessDefinitionKeyRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendByProcessDefinitionKey(data: ActivateOrSuspendByProcessDefinitionKeyRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
     * and/or a historical process instance query
     *
     * @param data {@link ActivateOrSuspendInRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendInGroup(data: ActivateOrSuspendInRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
     * and/or a historical process instance query
     *
     * @param data {@link ActivateOrSuspendInGroupRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendInBatch(data: ActivateOrSuspendInRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
}
export { ProcessInstanceService };
