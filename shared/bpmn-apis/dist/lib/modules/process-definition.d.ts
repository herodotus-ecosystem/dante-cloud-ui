import { HttpConfig, BpmnQueryService } from '../base';
import { AxiosHttpResult, BatchEntity, BpmnUnionPathParams, ProcessDefinitionEntity, ProcessDefinitionQueryParams, ProcessDefinitionSortBy, ProcessDefinitionDeleteQueryParams, ActivityInstanceStatisticsQueryParams, ActivityInstanceStatisticsEntity, CalledProcessDefinitionEntity, StartFormVariablesQueryParams, StartFormVariablesEntity, StartFormKeyEntity, ProcessInstanceStatisticsQueryParams, ProcessInstanceStatisticsEntity, XmlEntity, ProcessInstanceEntity, StartInstanceRequestBody, SubmitStartFormRequestBody, ActivateOrSuspendedByIdRequestBody, ActivateOrSuspendedByKeyRequestBody, UpdateHistoryTimeToLiveRequestBody, RestartProcessInstanceRequestBody } from '../../declarations';

declare class ProcessDefinitionService extends BpmnQueryService<ProcessDefinitionEntity, ProcessDefinitionQueryParams, ProcessDefinitionSortBy, ProcessDefinitionDeleteQueryParams> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProcessDefinitionService;
    getBaseAddress(): string;
    /**
     * Retrieves runtime statistics of a given process definition, grouped by activities.
     * These statistics include the number of running activity instances, optionally the number of failed jobs and also optionally the number
     * of incidents either grouped by incident types or for a specific incident type.
     *
     * Note: This does not include historic data.
     *
     * @param path
     * @param query
     * @returns
     */
    getActivityInstanceStatistics(path: BpmnUnionPathParams, params: ActivityInstanceStatisticsQueryParams): Promise<AxiosHttpResult<ActivityInstanceStatisticsEntity>>;
    /**
     * For the given process, returns a list of called process definitions corresponding to the CalledProcessDefinition interface in the engine.
     * The list contains all process definitions that are referenced statically by call activities in the given process.
     * This endpoint does not resolve process definitions that are referenced with expressions.
     * Each called process definition contains a list of call activity ids, which specifies the call activities that are calling that process.
     * This endpoint does not resolve references to case definitions.\
     *
     * @param id The id of the process definition.
     * @returns A JSON Array of objects corresponding to the CalledProcessDefinition interface in the engine. The Array can be empty, if the endpoint cannot resolve the called process(es) because the reference is an expression which is resolved by the engine during runtime of the calling process
     */
    getStaticCalledProcessDefinitions(id: string): Promise<AxiosHttpResult<CalledProcessDefinitionEntity>>;
    /**
     * Retrieves the diagram of a process definition.
     *
     * If the process definition’s deployment contains an image resource with the same file name as the process definition, the deployed image
     * will be returned by the Get Diagram endpoint.
     *
     * Example: someProcess.bpmn and someProcess.png. Supported file extentions for the image are: svg, png, jpg, and gif.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns The image diagram of this process.
     */
    getDiagram(path: BpmnUnionPathParams): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the start form variables for a process definition (only if they are defined via the Generated Task Form approach).
     * The start form variables take form data specified on the start event into account.
     * If form fields are defined, the variable types and default values of the form fields are taken into account.
     *
     * @param path {@link BpmnUnionPathParams}
     * @param params {@link StartFormVariablesQueryParams}
     * @returns A JSON object containing a property for each variable returned. The key is the variable name, the value is a JSON object with the following properties:
     */
    getStartFormVariables(path: BpmnUnionPathParams, params: StartFormVariablesQueryParams): Promise<AxiosHttpResult<StartFormVariablesEntity>>;
    /**
     * Retrieves the rendered form for a process definition. This method can be used for getting the HTML rendering of a Generated Task Form.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns An HTML response body providing the rendered (generated) form content.
     */
    getRenderedFormStartForm(path: BpmnUnionPathParams): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the key of the start form for a process definition. The form key corresponds to the FormData#formKey property in the engine.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns A JSON object containing the form key.
     */
    getStartFormKey(path: BpmnUnionPathParams): Promise<AxiosHttpResult<StartFormKeyEntity>>;
    /**
     * Retrieves runtime statistics of the process engine, grouped by process definitions.
     * These statistics include the number of running process instances, optionally the number of failed jobs and also optionally the number
     * of incidents either grouped by incident types or for a specific incident type.
     *
     * Note: This does not include historic data.
     *
     * @param params {@link ProcessInstanceStatisticsQueryParams}
     * @returns A JSON array containing statistics results per process definition
     */
    getProcessInstanceStatistics(params: ProcessInstanceStatisticsQueryParams): Promise<AxiosHttpResult<ProcessInstanceStatisticsEntity>>;
    /**
     * Retrieves the BPMN 2.0 XML of a process definition.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns A JSON object containing the id of the definition and the BPMN 2.0 XML.
     */
    getXml(path: BpmnUnionPathParams): Promise<AxiosHttpResult<XmlEntity>>;
    /**
     * Retrieves a process definition according to the ProcessDefinition interface in the engine.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns A JSON object corresponding to the ProcessDefinition interface in the engine
     */
    getByPathParams(path: BpmnUnionPathParams): Promise<AxiosHttpResult<ProcessDefinitionEntity>>;
    /**
     * Instantiates a given process definition. Process variables and business key may be supplied in the request body.
     *
     * @param path {@link BpmnUnionPathParams}
     * @param data {@link StartInstanceRequestBody}
     * @returns A JSON object representing the newly created process instance
     */
    start(path: BpmnUnionPathParams, data: StartInstanceRequestBody): Promise<AxiosHttpResult<ProcessInstanceEntity>>;
    /**
     * Starts a process instance using a set of process variables and the business key.
     * If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have
     * validators defined. See Documentation on Generated Task Forms.
     *
     * @param path {@link BpmnUnionPathParams}
     * @param data {@link SubmitStartFormRequestBody}
     * @returns A JSON object corresponding to the ProcessInstance interface in the engine
     */
    submitStartForm(path: BpmnUnionPathParams, data: SubmitStartFormRequestBody): Promise<AxiosHttpResult<ProcessInstanceEntity>>;
    /**
     * Activates or suspends a given process definition by id or by latest version of process definition key.
     *
     * @param path {@link BpmnUnionPathParams}
     * @param data {@link ActivateOrSuspendedByIdRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendById(path: BpmnUnionPathParams, data: ActivateOrSuspendedByIdRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Activates or suspends process definitions with the given process definition key.
     *
     * @param data {@link ActivateOrSuspendedByKeyRequestBody}
     * @returns This method returns no content.
     */
    activateOrSuspendByKey(data: ActivateOrSuspendedByKeyRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates history time to live for process definition. The field is used within History cleanup.
     *
     * @param path {@link BpmnUnionPathParams}
     * @param data {@link UpdateHistoryTimeToLiveRequestBody}
     * @returns This method returns no content.
     */
    updateHistoryTimeToLive(path: BpmnUnionPathParams, data: UpdateHistoryTimeToLiveRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Deletes process definitions by a given key.
     *
     * @param key The key of the process definitions to be deleted.
     * @param tenantId The id of the tenant the process definitions belong to.
     * @param params {@link ProcessDefinitionDeleteQueryParams}
     * @returns This method returns no content.
     */
    deleteByKey(key: string, tenantId: string | undefined, params: ProcessDefinitionDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the deployed form that can be referenced from a start event. For further information please refer to User Guide.
     *
     * @param path {@link BpmnUnionPathParams}
     * @returns An object with the deployed start form content.
     */
    getDeployedStartForm(path: BpmnUnionPathParams): Promise<AxiosHttpResult<any>>;
    /**
     * Restarts process instances that were canceled or terminated synchronously.
     * Can also restart completed process instances. It will create a new instance using the original instance information.
     * To execute the restart asynchronously, use the Restart Process Instance Async method.
     *
     * @param id The id of the process definition of the process instances to restart.
     * @param data {@link RestartProcessInstanceRequestBody}
     * @returns This method returns no content.
     */
    restartProcessInstance(id: string, data: RestartProcessInstanceRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Restarts process instances that were canceled or terminated asynchronously.
     * Can also restart completed process instances. It will create a new instance using the original instance information.
     * To execute the restart synchronously, use the Restart Process Instance method.
     *
     * @param id The id of the process definition of the process instances to restart.
     * @param data {@link RestartProcessInstanceRequestBody}
     * @returns A JSON object corresponding to the Batch interface in the engine.
     */
    restartAsync(id: string, data: RestartProcessInstanceRequestBody): Promise<AxiosHttpResult<BatchEntity>>;
}
export { ProcessDefinitionService };
