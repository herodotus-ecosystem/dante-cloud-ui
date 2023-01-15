import type { BpmnEntity, BpmnListQueryParams, BpmnQueryParams, BpmnRequestBody, Variables } from '../base';
export declare type DelegationState = 'PENDING' | 'RESOLVED';
export interface TaskEntity extends BpmnEntity {
    /**
     * The id of the task.
     */
    id: string;
    /**
     * The tasks name.
     */
    name: string;
    /**
     * The user assigned to this task.
     */
    assignee: string;
    /**
     * The time the task was created. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    created: string;
    /**
     * The due date for the task. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    due: string;
    /**
     * The follow-up date for the task. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    followUp: string;
    /**
     * The date the task was updated last. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    lastUpdated: string;
    /**
     * The delegation state of the task. Corresponds to the DelegationState enum in the engine. Possible values are RESOLVED and PENDING.
     */
    delegationState: string;
    /**
     * The task description.
     */
    description: string;
    /**
     * The id of the execution the task belongs to.
     */
    executionId: string;
    /**
     * The owner of the task.
     */
    owner: string;
    /**
     * The id of the parent task, if this task is a subtask.
     */
    parentTaskId: string;
    /**
     * The priority of the task.
     */
    priority: number;
    /**
     * The id of the process definition this task belongs to.
     */
    processDefinitionId: string;
    /**
     * The id of the process instance this task belongs to.
     */
    processInstanceId: string;
    /**
     * The id of the case execution the task belongs to.
     */
    caseExecutionId: string;
    /**
     * The id of the case definition the task belongs to.
     */
    caseDefinitionId: string;
    /**
     * The id of the case instance the task belongs to.
     */
    caseInstanceId: string;
    /**
     * The task definition key.
     */
    taskDefinitionKey: string;
    /**
     * Whether the task belongs to a process instance that is suspended.
     */
    suspended: boolean;
    /**
     * If not null, the form key for the task.
     */
    formKey: string;
    /**
     * If not null, the form binding for the Camunda Form with the following properties.
     * · Name	Type	Description
     * · key	String	The key of the linked Camunda Form.
     * · binding	String	The binding type. Can be one of latest, deployment or version.
     * · version	Integer	The concrete version of the linked Camunda Form. Only non-null when binding is version.
     */
    camundaFormRef: string;
    /**
     * If not null, the tenantId for the task.
     */
    tenantId: string;
}
export declare type TaskSortBy = 'instanceId' | 'caseInstanceId' | 'dueDate' | 'executionId' | 'caseExecutionId' | 'assignee' | 'created' | 'lastUpdated' | 'description' | 'id' | 'name' | 'nameCaseInsensitive' | 'priority';
export interface TaskQueryParams extends BpmnListQueryParams {
    /**
     * Restrict to tasks that belong to process instances with the given id.
     */
    processInstanceId?: string;
    /**
     * Restrict to task with the given id.
     */
    taskId?: string;
    /**
     * Restrict to tasks that belong to process instances with the given ids.
     */
    processInstanceIdIn?: Array<string>;
    /**
     * Restrict to tasks that belong to process instances with the given business key.
     */
    processInstanceBusinessKey?: string;
    /**
     * Restrict to tasks that belong to process instances with the given business key which is described by an expression.
     * See the user guide for more information on available functions.
     */
    processInstanceBusinessKeyExpression?: string;
    /**
     * Restrict to tasks that belong to process instances with one of the give business keys. The keys need to be in a comma-separated list.
     */
    processInstanceBusinessKeyIn?: string;
    /**
     * Restrict to tasks that have a process instance business key that has the parameter value as a substring.
     */
    processInstanceBusinessKeyLike?: string;
    /**
     * Restrict to tasks that have a process instance business key that has the parameter value as a substring and is described by an expression.
     * See the user guide for more information on available functions.
     */
    processInstanceBusinessKeyLikeExpression?: string;
    /**
     * Restrict to tasks that belong to a process definition with the given id.
     */
    processDefinitionId?: string;
    /**
     * Restrict to tasks that belong to a process definition with the given key.
     */
    processDefinitionKey?: string;
    /**
     * Restrict to tasks that belong to a process definition with one of the given keys. The keys need to be in a comma-separated list.
     */
    processDefinitionKeyIn?: string;
    /**
     * Restrict to tasks that belong to a process definition with the given name.
     */
    processDefinitionName?: string;
    /**
     * Restrict to tasks that have a process definition name that has the parameter value as a substring.
     */
    processDefinitionNameLike?: string;
    /**
     * Restrict to tasks that belong to an execution with the given id.
     */
    executionId?: string;
    /**
     * Restrict to tasks that belong to case instances with the given id.
     */
    caseInstanceId?: string;
    /**
     * Restrict to tasks that belong to case instances with the given business key.
     */
    caseInstanceBusinessKey?: string;
    /**
     * Restrict to tasks that have a case instance business key that has the parameter value as a substring.
     */
    caseInstanceBusinessKeyLike?: string;
    /**
     * Restrict to tasks that belong to a case definition with the given id.
     */
    caseDefinitionId?: string;
    /**
     * Restrict to tasks that belong to a case definition with the given key.
     */
    caseDefinitionKey?: string;
    /**
     * Restrict to tasks that belong to a case definition with the given name.
     */
    caseDefinitionName?: string;
    /**
     * Restrict to tasks that have a case definition name that has the parameter value as a substring.
     */
    caseDefinitionNameLike?: string;
    /**
     * Restrict to tasks that belong to a case execution with the given id.
     */
    caseExecutionId?: string;
    /**
     * Only include tasks which belong to one of the passed and comma-separated activity instance ids.
     */
    activityInstanceIdIn?: string;
    /**
     * Only include tasks which belong to one of the passed and comma-separated tenant ids.
     */
    tenantIdIn?: string;
    /**
     * Only include tasks which belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;
    /**
     * Restrict to tasks that the given user is assigned to.
     */
    assignee?: string;
    /**
     * Restrict to tasks that the user described by the given expression is assigned to. See the user guide for more information on available functions.
     */
    assigneeExpression?: string;
    /**
     * Restrict to tasks that have an assignee that has the parameter value as a substring.
     */
    assigneeLike?: string;
    /**
     * Restrict to tasks that have an assignee that has the parameter value described by the given expression as a substring.
     * See the user guide for more information on available functions.
     */
    assigneeLikeExpression?: string;
    /**
     * Only include tasks which are assigned to one of the passed and comma-separated user ids.
     */
    assigneeIn?: string;
    /**
     * Only include tasks which are not assigned to one of the passed and comma-separated user ids.
     */
    assigneeNotIn?: string;
    /**
     * Restrict to tasks that the given user owns.
     */
    owner?: string;
    /**
     * Restrict to tasks that the user described by the given expression owns. See the user guide for more information on available functions.
     */
    ownerExpression?: string;
    /**
     * Only include tasks that are offered to the given group.
     */
    candidateGroup?: string;
    /**
     * Only include tasks that are offered to the group described by the given expression.
     * See the user guide for more information
  on available functions.
     */
    candidateGroupExpression?: string;
    /**
     * Only include tasks that are offered to the given user or to one of his groups.
     */
    candidateUser?: string;
    /**
     * Only include tasks that are offered to the user described by the given expression.
     * See the user guide for more information on available functions.
     */
    candidateUserExpression?: string;
    /**
     * Also include tasks that are assigned to users in candidate queries.
     * Default is to only include tasks that are not assigned to any user if you query by candidate user or group(s).
     */
    includeAssignedTasks?: boolean;
    /**
     * Only include tasks that the given user is involved in.
     * A user is involved in a task if an identity link exists between task and user (e.g., the user is the assignee).
     */
    involvedUser?: boolean;
    /**
     * Only include tasks that the user described by the given expression is involved in.
     * A user is involved in a task if an identity link exists between task and user (e.g., the user is the assignee).
     * See the user guide for more information on available functions.
     */
    involvedUserExpression?: string;
    /**
     * If set to true, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;
    /**
     * If set to true, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;
    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;
    /**
     * Restrict to tasks that have one of the given keys. The keys need to be in a comma-separated list.
     */
    taskDefinitionKeyIn?: string;
    /**
     * Restrict to tasks that have a key that has the parameter value as a substring.
     */
    taskDefinitionKeyLike?: string;
    /**
     * Restrict to tasks that have the given name.
     */
    name?: string;
    /**
     * Restrict to tasks that do not have the given name.
     */
    nameNotEqual?: string;
    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    nameLike?: string;
    /**
     * Restrict to tasks that do not have a name with the given parameter value as substring.
     */
    nameNotLike?: string;
    /**
     * Restrict to tasks that have the given description.
     */
    description?: string;
    /**
     * Restrict to tasks that have a description that has the parameter value as a substring.
     */
    descriptionLike?: string;
    /**
     * Restrict to tasks that have the given priority.
     */
    priority?: number;
    /**
     * Restrict to tasks that have a lower or equal priority.
     */
    maxPriority?: number;
    /**
     * Restrict to tasks that have a higher or equal priority.
     */
    minPriority?: number;
    /**
     * Restrict to tasks that are due on the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.546+0200.
     */
    dueDate?: string;
    /**
     * Restrict to tasks that are due on the date described by the given expression. See the user guide for more information on available functions. The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    dueDateExpression?: string;
    /**
     * Restrict to tasks that are due after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.435+0200.
     */
    dueAfter?: string;
    /**
     * Restrict to tasks that are due after the date described by the given expression. See the user guide for more information on available functions. The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    dueAfterExpression?: string;
    /**
     * Restrict to tasks that are due before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.243+0200.
     */
    dueBefore?: string;
    /**
     * Restrict to tasks that are due before the date described by the given expression. See the user guide for more information on available functions. The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    dueBeforeExpression?: string;
    /**
     * Only include tasks which have no due date. Value may only be true, as false is the default behavior.
     */
    withoutDueDate?: boolean;
    /**
     * Restrict to tasks that have a followUp date on the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.342+0200.
     */
    followUpDate?: string;
    /**
     * Restrict to tasks that have a followUp date on the date described by the given expression. See the user guide for more information on available functions. The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    followUpDateExpression?: string;
    /**
     * Restrict to tasks that have a followUp date after the given date.
     *  By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.542+0200.
     */
    followUpAfter?: string;
    /**
     * Restrict to tasks that have a followUp date after the date described by the given expression.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    followUpAfterExpression?: string;
    /**
     * Restrict to tasks that have a followUp date before the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.234+0200.
     */
    followUpBefore?: string;
    /**
     * Restrict to tasks that have a followUp date before the date described by the given expression. See the user guide for more information on available functions. The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    followUpBeforeExpression?: string;
    /**
     * Restrict to tasks that have no followUp date or a followUp date before the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.432+0200.
     * The typical use case is to query all "active" tasks for a user for a given date.
     */
    followUpBeforeOrNotExistent?: string;
    /**
     * Restrict to tasks that have no followUp date or a followUp date before the date described by the given expression.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    followUpBeforeOrNotExistentExpression?: string;
    /**
     * Restrict to tasks that were created on the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.324+0200.
     */
    createdOn?: string;
    /**
     * Restrict to tasks that were created on the date described by the given expression.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    createdOnExpression?: string;
    /**
     * Restrict to tasks that were created after the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.342+0200.
     */
    createdAfter?: string;
    /**
     * Restrict to tasks that were created after the date described by the given expression.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    createdAfterExpression?: string;
    /**
     * Restrict to tasks that were created before the given date.
     * By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.332+0200.
     */
    createdBefore?: string;
    /**
     * Restrict to tasks that were created before the date described by the given expression.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    createdBeforeExpression?: string;
    /**
     * Restrict to tasks that were updated after the given date. Every action that fires a task update event is considered as updating the task.
     * By default*, the given date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.332+0200.
     */
    updatedAfter?: string;
    /**
     * Restrict to tasks that were updated after the date described by the given expression.
     * Every action that fires a task update event is considered as updating the task.
     * See the user guide for more information on available functions.
     * The expression must evaluate to a java.util.Date or org.joda.time.DateTime object.
     */
    updatedAfterExpression?: string;
    /**
     * Restrict to tasks that are in the given delegation state. Valid values are PENDING and RESOLVED.
     */
    delegationState?: DelegationState;
    /**
     * Restrict to tasks that are offered to any of the given candidate groups.
     * Takes a comma-separated list of group names, so for example developers,support,sales.
     */
    candidateGroups?: string;
    /**
     * Restrict to tasks that are offered to any of the candidate groups described by the given expression.
     * See the user guide for more information on available functions. The expression must evaluate to java.util.List of Strings.
     */
    candidateGroupsExpression?: Array<string>;
    /**
     * Only include tasks which have a candidate group. Value may only be true, as false is the default behavior.
     */
    withCandidateGroups?: boolean;
    /**
     * Only include tasks which have no candidate group. Value may only be true, as false is the default behavior.
     */
    withoutCandidateGroups?: boolean;
    /**
     * Only include tasks which have a candidate user. Value may only be true, as false is the default behavior.
     */
    withCandidateUsers?: boolean;
    /**
     * Only include tasks which have no candidate users. Value may only be true, as false is the default behavior.
  active	Only include active tasks. Value may only be true, as false is the default behavior.
     */
    withoutCandidateUsers?: boolean;
    /**
     * Only include suspended tasks. Value may only be true, as false is the default behavior.
     */
    suspended?: boolean;
    /**
     * Only include tasks that have variables with certain values. Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form key_operator_value. key is the variable name, operator is the comparison operator to be used and value the variable value.
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
    taskVariables?: string;
    /**
     * Only include tasks that belong to process instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
     * A valid parameter value has the form key_operator_value.
     * key is the variable name, operator is the comparison operator to be used and value the variable value.
     * Note: Values are always treated as String objects on server side.
     *
     * Valid operator values are:
     *  eq - equal to;
     *  neq - not equal to;
     *  gt - greater than;
     *  gteq - greater than or equal to;
     *  lt - lower than;
     *  lteq - lower than or equal to;
     *  like;
     *  notLike.
     * key and value may not contain underscore or comma characters.
     */
    processVariables?: string;
    /**
     * Only include tasks that belong to case instances that have variables with certain values.
     * Variable filtering expressions are comma-separated and are structured as follows:
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
    caseInstanceVariables?: string;
    /**
     * Match all variable names in this query case-insensitively. If set variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean | string;
    /**
     * Match all variable values in this query case-insensitively. If set variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean | string;
    /**
     * Restrict query to all tasks that are sub tasks of the given task. Takes a task id.
     */
    parentTaskId?: string;
}
export interface FormKeyEntity extends BpmnEntity {
    /**
     * The form key for the task.
     */
    key: string;
    /**
     * The process application's context path the task belongs to.
     * If the task does not belong to a process application deployment or a process definition at all, this property is not set.
     */
    contextPath: string;
}
interface UserIdRequestBody extends BpmnRequestBody {
    /**
     * The id of the user that claims the task. If userId is empty the task is unclaimed.
     */
    userId: string | undefined;
}
export interface ClaimRequestBody extends UserIdRequestBody {
}
export interface SetAssigneeRequestBody extends UserIdRequestBody {
}
export interface DelegateRequestBody extends UserIdRequestBody {
}
interface VariablesRequestBody extends BpmnRequestBody {
    variables?: Variables;
}
export interface CompleteRequestBody extends VariablesRequestBody {
    /**
     * Indicates whether the response should contain the process variables or not.
     * The default is false with a response code of 204.
     * If set to true the response contains the process variables and has a response code of 200.
     * If the task is not associated with a process instance (e.g. if it's part of a case instance) no variables will be returned.
     */
    withVariablesInReturn: boolean;
}
export interface SubmitFormRequestBody extends VariablesRequestBody {
    /**
     * Indicates whether the response should contain the process variables or not.
     * The default is false with a response code of 204.
     * If set to true the response contains the process variables and has a response code of 200.
     * If the task is not associated with a process instance (e.g. if it's part of a case instance) no variables will be returned.
     */
    withVariablesInReturn: boolean;
}
export interface ResolveRequestBody extends VariablesRequestBody {
}
export interface FormVariablesQueryParams extends BpmnQueryParams {
    /**
     * A comma-separated list of variable names.
     * Allows restricting the list of requested variables to the variable names in the list.
     * It is best practice to restrict the list of variables to the variables actually required by the form in order to minimize fetching of data.
     * If the query parameter is ommitted all variables are fetched.
     * If the query parameter contains non-existent variable names, the variable names are ignored.
     */
    variableNames: string;
    /**
     * Determines whether serializable variable values (typically variables that store custom Java objects) should be deserialized on server side (default true).
     *
     * If set to true, a serializable variable will be deserialized on server side and transformed to JSON using Jackson's POJO/bean property introspection feature.
     * Note that this requires the Java classes of the variable value to be on the REST API's classpath.
     *
     * If set to false, a serializable variable will be returned in its serialized format.
     * For example, a variable that is serialized as XML will be returned as a JSON string containing XML.
     * Note: While true is the default value for reasons of backward compatibility, we recommend setting this parameter to false when developing web applications that are independent of the Java process applications deployed to the engine.
     */
    deserializeValues?: boolean;
}
interface CrudRequestBody extends BpmnRequestBody {
    /**
     * The id of the task.
     */
    id: string;
    /**
     * The task name.
     */
    name: string;
    /**
     * The task description.
     */
    description?: string;
    /**
     * The user to assign to this task.
     */
    assignee?: string;
    /**
     * The owner of the task.
     */
    owner?: string;
    /**
     * The delegation state of the task. Corresponds to the DelegationState enum in the engine. Possible values are RESOLVED and PENDING.
     */
    delegationState?: DelegationState;
    /**
     * The due date for the task. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    due?: string;
    /**
     * The follow-up date for the task. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    followUp?: string;
    /**
     * The priority of the task.
     */
    priority?: number;
    /**
   * The id of the parent task, if this task is a subtask.
  
   */
    parentTaskId?: string;
    /**
     * The id of the case instance the task belongs to.
     */
    caseInstanceId?: string;
    /**
     * The id of the tenant the task belongs to.
     */
    tenantId?: string;
}
export interface CreateRequestBody extends CrudRequestBody {
}
export interface UpdateRequestBody extends CrudRequestBody {
}
export interface BpmnErrorRequestBody extends VariablesRequestBody {
    /**
     * An error code that indicates the predefined error. It is used to identify the BPMN error handler.
     */
    errorCode?: string;
    /**
     * An error message that describes the error.
     */
    errorMessage?: string;
}
export interface BpmnEscalationRequestBody extends VariablesRequestBody {
    /**
     * An escalation code that indicates the predefined escalation. It is used to identify the BPMN escalation handler
     */
    escalationCode?: string;
}
export {};
