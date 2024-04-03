import { HistoryProcessInstanceQueryParams } from './history/process-instance';
import { BpmnDeleteQueryParams, BpmnEntity, BpmnListQueryParams, Instruction, Variables, Link, BpmnRequestBody, BpmnSkip } from '../base';

export interface ProcessInstanceEntity extends BpmnEntity {
    /**
     * The id of the process instance.
     */
    id: string;
    /**
     * The id of the process definition.
     */
    definitionId: string;
    /**
     * The business key of the process instance.
     */
    businessKey: string;
    /**
     * The case instance id of the process instance.
     */
    caseInstanceId: string;
    /**
     * A flag indicating whether the instance is still running or not.
     */
    ended: boolean;
    /**
     * A flag indicating whether the instance is suspended or not.
     */
    suspended: boolean;
    /**
     * The tenant id of the process instance.
     */
    tenantId: string;
    links?: Array<Link>;
    variables?: Variables;
}
export type ProcessInstanceSortBy = 'instanceId' | 'definitionKey' | 'definitionId' | 'tenantId' | 'businessKey';
export interface ProcessInstanceQueryParams extends BpmnListQueryParams {
    /**
     * A list of process instance ids which defines a group of process instances which will be activated or suspended by the operation.
     */
    processInstanceIds?: Array<string>;
    /**
     * Filter by process instance business key.
     */
    businessKey?: string;
    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    businessKeyLike?: string;
    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;
    /**
     * Filter by the process definition the instances run on.
     */
    processDefinitionId?: string;
    /**
     * Filter by the key of the process definition the instances run on.
     */
    processDefinitionKey?: string;
    /**
     * Filter by a list of process definition keys. A process instance must have one of the given process definition keys.
     * Must be a JSON array of Strings.
     */
    processDefinitionKeyIn?: Array<string>;
    /**
     * Exclude instances by a list of process definition keys. A process instance must not have one of the given process definition keys.
     * Must be a JSON array of Strings.
     */
    processDefinitionKeyNotIn?: Array<string>;
    /**
     * Filter by the deployment the id belongs to.
     */
    deploymentId?: string;
    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstance?: string;
    /**
     * Restrict query to all process instances that have the given process instance as a sub process instance. Takes a process instance id.
     */
    subProcessInstance?: string;
    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstance?: string;
    /**
     * Restrict query to all process instances that have the given case instance as a sub case instance. Takes a case instance id.
     */
    subCaseInstance?: string;
    /**
     * Only include active process instances. Value may only be true, as false is the default behavior.
     */
    active?: boolean;
    /**
     * Only include suspended process instances. Value may only be true, as false is the default behavior.
     */
    suspended?: boolean;
    /**
     * Filter by the incident id.
     */
    incidentId?: string;
    /**
     * Filter by the incident type. See the User Guide for a list of incident types.
     * failedJob: is raised when automatic retries for a job (timer or asynchronous continuation) have been depleted.
     * The incident indicates that the corresponding execution is stuck and will not continue automatically. Administrative action is necessary.
     * The incident is resolved when the job is manually executed or when the retries for the corresponding job are set to a value > 0
     * failedExternalTask: is raised when a worker of an External Task reports a failure and the given retries are set to a value <= 0.
     * The incident indicates that the corresponding external task is stuck and will not be fetched by a worker.
     * Administrative action is necessary to reset the retries.
     */
    incidentType?: 'failedJob' | 'failedExternalTask';
    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;
    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;
    /**
     * Filter by a list of tenant ids. A process instance must have one of the given tenant ids. Must be a JSON array of Strings.
     */
    tenantIdIn?: Array<string>;
    /**
     * Only include process instances which belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: string;
    /**
     * Filter by a list of activity ids. A process instance must currently wait in a leaf activity with one of the given activity ids.
     */
    activityIdIn?: Array<string>;
    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: Array<string>;
    /**
     * Only include process instances which process definition has no tenant id.
     */
    processDefinitionWithoutTenantId?: string;
    variables?: Variables;
}
export interface ProcessInstanceDeleteQueryParams extends BpmnDeleteQueryParams {
    /**
     * If set to true, subprocesses related to deleted processes will be skipped.
     */
    skipSubprocesses?: boolean;
    /**
     * If set to false, the request will still be successful if the process id is not found.
     */
    failIfNotExists?: boolean;
}
interface Incident {
    /**
     * the id of the incident
     */
    id: string;
    /**
     * the activity id in which the incident happened
     */
    activityId: string;
}
interface Instance extends Incident {
    /**
     * The name of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job)
     */
    activityName: string;
    /**
     * The type of the activity that this instance enters (asyncBefore job) or leaves (asyncAfter job).
     * Corresponds to the XML element name in the BPMN 2.0, e.g., 'userTask'.
     */
    activityType: string;
    /**
     * The id of the process instance.
     */
    processInstanceId: string;
    /**
     * The id of the process definition.
     */
    processDefinitionId: string;
    /**
     * List of String	A list of incident ids.
     */
    incidentIds: Array<string>;
    /**
     * List of Objects	A list of JSON objects containing incident specific properties:
     * id: the id of the incident
     * activityId: the activity id in which the incident happened
     */
    incidents: Array<Incident>;
}
interface TransitionInstanceEntity extends Instance {
    /**
     * 	The id of the corresponding execution.
     */
    executionId: string;
}
export interface ActivityInstanceEntity extends Instance {
    /**
     * List of activityInstance	A list of child activity instances.
     */
    childActivityInstances: Array<ActivityInstanceEntity>;
    /**
     * List of transitionInstance	A list of child transition instances.
     * A transition instance represents an execution waiting in an asynchronous continuation.
     */
    childTransitionInstances: Array<TransitionInstanceEntity>;
    /**
     * List of String	A list of execution ids.
     */
    executionIds: Array<string>;
}
export interface ModifyInstruction extends Instruction {
    /**
     * Can be used with instructions of type cancel. Specifies the activity instance to cancel.
     * Valid values are the activity instance IDs supplied by the Get Activity Instance request.
     */
    activityInstanceId: string;
    /**
     * Can be used with instructions of type cancel. Specifies the transition instance to cancel.
     * Valid values are the transition instance IDs supplied by the Get Activity Instance request.
     */
    transitionInstanceId: string;
    /**
     * Can be used with instructions of type startBeforeActivity, startAfterActivity, and startTransition.
     * Valid values are the activity instance IDs supplied by the Get Activity Instance request.
     *
     * If there are multiple parent activity instances of the targeted activity, this specifies the ancestor scope in which
     * hierarchy the activity/transition is to be instantiated.
     *
     * Example: When there are two instances of a subprocess and an activity contained in the subprocess is to be started,
     * this parameter allows to specifiy under which subprocess instance the activity should be started.
     */
    ancestorActivityInstanceId: string;
    variables: Variables;
}
export interface ModifyRequestBody extends BpmnSkip, BpmnRequestBody {
    instructions: Array<ModifyInstruction>;
    /**
     * An arbitrary text annotation set by a user for auditing reasons.
     */
    annotation: string;
}
interface DeleteRequestBody extends BpmnRequestBody {
    /**
     * A list of process instance ids which defines a group of process instances which will be activated or suspended by the operation.
     */
    processInstanceIds?: Array<string>;
    /**
     * A string with delete reason.
     */
    deleteReason?: string;
    /**
     * Skip execution listener invocation for activities that are started or ended as part of this request.
     */
    skipCustomListeners?: boolean;
    /**
     * Skip deletion of the subprocesses related to deleted processes as part of this request.
     */
    skipSubprocesses?: boolean;
}
export interface DeleteAsyncRequestBody extends DeleteRequestBody {
    /**
     * A string with delete reason.
     */
    processInstanceQuery?: ProcessInstanceQueryParams;
    /**
     * If set to false, the request will still be successful if one ore more of the process ids are not found.
     */
    failIfNotExists?: boolean;
}
export interface DeleteAsyncHistoricQueryBasedRequestBody extends DeleteRequestBody {
    /**
     * A historic process instance query like the request body described by POST /history/process-instance .
     */
    historicProcessInstanceQuery?: HistoryProcessInstanceQueryParams;
}
export interface JobRetriesRequestBody extends BpmnRequestBody {
    /**
     * A list of process instance ids to fetch jobs, for which retries will be set.
     */
    processInstances?: Array<string>;
    /**
     * An integer representing the number of retries. Please note that the value cannot be negative or null.
     */
    retries?: number;
}
export interface SetJobRetriesAsyncRequestBody extends JobRetriesRequestBody {
    processInstanceQuery?: ProcessInstanceQueryParams;
}
export interface SetJobRetriesAsyncHistoricQueryBasedRequestBody extends JobRetriesRequestBody {
    /**
     * A historic process instance query like the request body described by POST /history/process-instance .
     */
    historicProcessInstanceQuery?: HistoryProcessInstanceQueryParams;
}
export interface SetVariablesAsyncRequestBody extends BpmnRequestBody {
    /**
     * A list of process instance ids to fetch jobs, for which retries will be set.
     */
    processInstances?: Array<string>;
    processInstanceQuery?: ProcessInstanceQueryParams;
    /**
     * A historic process instance query like the request body described by POST /history/process-instance .
     */
    historicProcessInstanceQuery?: HistoryProcessInstanceQueryParams;
    variables?: Variables;
}
export interface CorrelateMessageAsyncRequestBody extends SetVariablesAsyncRequestBody {
    /**
     * The name of the message to correlate. Corresponds to the 'name' element of the message defined in BPMN 2.0 XML. Can be null to correlate by other criteria only.
     */
    messageName?: string;
}
export interface ActivateOrSuspendByIdRequestBody extends BpmnRequestBody {
    /**
     * A Boolean value which indicates whether to activate or suspend all process instances that were defined with the other parameters.
     * When the value is set to true, all process instances defined will be suspended and
     * when the value is set to false, all process instances defined will be activated.
     */
    suspended: boolean;
}
export interface ActivateOrSuspendByProcessDefinitionIdRequestBody extends ActivateOrSuspendByIdRequestBody {
    /**
     * The process definition id of the process instances to activate or suspend.
     */
    processDefinitionId: string;
}
export interface ActivateOrSuspendByProcessDefinitionKeyRequestBody extends ActivateOrSuspendByIdRequestBody {
    /**
     * The process definition key of the process instances to activate or suspend.
     */
    processDefinitionKey: string;
    /**
     * Only activate or suspend process instances of a process definition which belongs to a tenant with the given id.
     */
    processDefinitionTenantId: string;
    /**
     * Only activate or suspend process instances of a process definition which belongs to no tenant.
     * Value may only be true, as false is the default behavior.
     */
    processDefinitionWithoutTenantId: boolean;
}
export interface ActivateOrSuspendInRequestBody extends ActivateOrSuspendByProcessDefinitionIdRequestBody {
    /**
     * A process instance query which defines a group of process instances which will be activated or suspended by the operation.
     * See GET /process-instance
     */
    processInstanceQuery?: ProcessInstanceQueryParams;
    /**
     * A historical process instance query which defines a group of process instances which will be activated or suspended by the operation.
     * See GET history/process-instance
     */
    historicProcessInstanceQuery?: HistoryProcessInstanceQueryParams;
}
export {};
