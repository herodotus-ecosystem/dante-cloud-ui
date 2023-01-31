import type { BpmnEntity, BpmnListQueryParams } from '../../base';
export type HistoryProcessInstanceState = 'ACTIVE' | 'SUSPENDED' | 'COMPLETED' | 'EXTERNALLY_TERMINATED' | 'INTERNALLY_TERMINATED';
export interface HistoryProcessInstanceEntity extends BpmnEntity {
    /**
     * The id of the process instance.
     */
    id: string;
    /**
     * The process instance id of the root process instance that initiated the process.
     */
    rootProcessInstanceId: string;
    /**
     * The id of the parent process instance, if it exists.
     */
    superProcessInstanceId: string;
    /**
     * The id of the parent case instance, if it exists.
     */
    superCaseInstanceId: string;
    /**
     * The id of the parent case instance, if it exists.
     */
    caseInstanceId: string;
    /**
     * The name of the process definition that this process instance belongs to.
     */
    processDefinitionName: string;
    /**
     * The key of the process definition that this process instance belongs to.
     */
    processDefinitionKey: string;
    /**
     * 	The version of the process definition that this process instance belongs to.
     */
    processDefinitionVersion: number;
    /**
     * The id of the process definition that this process instance belongs to.
     */
    processDefinitionId: string;
    /**
     * The business key of the process instance.
     */
    businessKey: string;
    /**
     * The time the instance was started. Default format* yyyy-MM-dd’T’HH:mm:ss.SSSZ.
     */
    startTime: string;
    /**
     * The time the instance ended. Default format* yyyy-MM-dd’T’HH:mm:ss.SSSZ.
     */
    endTime: string;
    /**
     * The time after which the instance should be removed by the History Cleanup job. Default format* yyyy-MM-dd’T’HH:mm:ss.SSSZ.
     */
    removalTime: string;
    /**
     * The time the instance took to finish (in milliseconds).
     */
    durationInMillis: number;
    /**
     *The id of the user who started the process instance.
     */
    startUserId: string;
    /**The id of the initial activity that was executed (e.g., a start event).The id of the activity instance.
     */
    startActivityId: string;
    /**
     * The provided delete reason in case the process instance was canceled during execution.
     */
    deleteReason: string;
    /**
     * The tenant id of the process instance.
     */
    tenantId: string;
    /**
     * last state of the process instance, possible values are:
     * ACTIVE - running process instance
     * SUSPENDED - suspended process instances
     * COMPLETED - completed through normal end event
     * EXTERNALLY_TERMINATED - terminated externally, for instance through REST API
     * INTERNALLY_TERMINATED - terminated internally, for instance by terminating boundary event
     */
    state: HistoryProcessInstanceState;
}
export type HistoryProcessInstanceSortBy = 'instanceId' | 'definitionId' | 'definitionKey' | 'definitionName' | 'definitionVersion' | 'businessKey' | 'startTime' | 'endTime' | 'duration' | 'tenantId';
export interface HistoryProcessInstanceQueryParams extends BpmnListQueryParams {
    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;
    /**
     * Filter by process instance ids. Must be a comma-separated list of process instance ids.
     */
    processInstanceIds?: string;
    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;
    /**
     * Filter by a comma-separated list of business keys. A process instance must have one of the given business keys.
     */
    processInstanceBusinessKeyIn?: string;
    /**
     * Filter by process instance business key that the parameter is a substring of.
     */
    processInstanceBusinessKeyLike?: string;
    /**
     * Restrict the query to all process instances that are top level process instances.
     */
    rootProcessInstances?: string;
    /**
     * Restrict query to all process instances that are sub process instances of the given process instance. Takes a process instance id.
     */
    superProcessInstanceId?: string;
    /**
     * Restrict query to one process instance that has a sub process instance with the given id.
     */
    subProcessInstanceId?: string;
    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
     */
    superCaseInstanceId?: string;
    /**
     * Restrict query to one process instance that has a sub case instance with the given id.
     */
    subCaseInstanceId?: string;
    /**
     * Restrict query to all process instances that are sub process instances of the given case instance. Takes a case instance id.
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
     * Filter by a comma-separated list of process definition keys. A process instance must have one of the given process definition keys.
     */
    processDefinitionKeyIn?: string;
    /**
     * Exclude instances that belong to a set of process definitions. Must be a comma-separated list of process definition keys.
     */
    processDefinitionKeyNotIn?: string;
    /**
     * Filter by the name of the process definition the instances run on.
     */
    processDefinitionName?: string;
    /**
     * Filter by process definition names that the parameter is a substring of.
     */
    processDefinitionNameLike?: string;
    /**
     * Only include finished process instances. This flag includes all process instances that are completed or terminated. Value may only be true,
  as false is the default behavior.
     */
    finished?: boolean;
    /**
     * Only include unfinished process instances. Value may only be true, as false is the default behavior.
     */
    unfinished?: boolean;
    /**
     * Only include process instances which have an incident. Value may only be true, as false is the default behavior.
     */
    withIncidents?: boolean;
    /**
     * Only include process instances which have a root incident. Value may only be true, as false is the default behavior.
     */
    withRootIncidents?: boolean;
    /**
     * Filter by the incident type. See the User Guide for a list of incident types.
     */
    incidentType?: string;
    /**
     * Only include process instances which have an incident in status either open or resolved. To get all process instances, use the query parameter withIncidents.
     */
    incidentStatus?: string;
    /**
     * Filter by the incident message. Exact match.
     */
    incidentMessage?: string;
    /**
     * Filter by the incident message that the parameter is a substring of.
     */
    incidentMessageLike?: string;
    /**
     * Only include process instances that were started by the given user.
     */
    startedBy?: string;
    /**
     * Restrict to instances that were started before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    startedBefore?: string;
    /**
     * Restrict to instances that were started after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    startedAfter?: string;
    /**
     * Restrict to instances that were finished before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    finishedBefore?: string;
    /**
     * Restrict to instances that were finished after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    finishedAfter?: string;
    /**
     * Filter by a comma-separated list of tenant ids. A process instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;
    /**
     * Only include historic process instances which belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;
    /**
     * Only include process instances that have/had variables with certain values. Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form key_operator_value. key is the variable name, operator is the comparison operator to be used and value the variable value.
     *
     * Note: Values are always treated as String objects on server side.
     *
     * Valid operator values are:
     *  eq - equal to;
     *  neq - not equal to;
     *  gt - greater than;
     *  gteq - greater than or equal to;
     *  lt - lower than;
     *  lteq - lower than or equal to;
     *  like.
     * key and value may not contain underscore or comma characters.
     */
    variables?: string;
    /**
     * Match all variable names provided in variables case-insensitively. If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;
    /**
     * Match all variable values provided in variables case-insensitively. If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
    /**
     * Restrict to instances that executed an activity before the given date (inclusive). By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    executedActivityBefore?: string;
    /**
     * Restrict to instances that executed an activity after the given date (inclusive). By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    executedActivityAfter?: string;
    /**
     * Restrict to instances that executed an activity with one of given ids.
     */
    executedActivityIdIn?: string;
    /**
     * Restrict to instances that have an active activity with one of given ids.
     */
    activeActivityIdIn?: string;
    /**
     * Restrict to instances that executed an job before the given date (inclusive). By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    executedJobBefore?: string;
    /**
     * Restrict to instances that executed an job after the given date (inclusive). By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    executedJobAfter?: string;
    /**
     * Restrict to instances that are active
     */
    active?: boolean;
    /**
     * Restrict to instances that are suspended
     */
    suspended?: boolean;
    /**
     * Restrict to instances that are completed
     */
    completed?: boolean;
    /**
     * Restrict to instances that are externally terminated
     */
    externallyTerminated?: boolean;
    /**
     * Restrict to instances that are internally terminated
     */
    internallyTerminated?: boolean;
}
