import { BpmnBaseEntity, BpmnListQueryParams } from '../../base';
export interface HistoryTask extends BpmnBaseEntity {
    /**
     * The task id.
     */
    id: string;
    /**
     * The key of the process definition the task belongs to.
     */
    processDefinitionKey: string;
    /**
     * The id of the process definition the task belongs to.
     */
    processDefinitionId: string;
    /**
     * The id of the process instance the task belongs to.
     */
    processInstanceId: string;
    /**
     * The id of the execution the task belongs to.
     */
    executionId: string;
    /**
     * The key of the case definition the task belongs to.
     */
    caseDefinitionKey: string;
    /**
     * The id of the case definition the task belongs to.
     */
    caseDefinitionId: string;
    /**
     * The id of the case instance the task belongs to.
     */
    caseInstanceId: string;
    /**
     * The id of the case execution the task belongs to.
     */
    caseExecutionId: string;
    /**
     * The id of the activity that this object is an instance of.
     */
    activityInstanceId: string;
    /**
     *The task name.
     */
    name: string;
    /**
     * The task's description.
     */
    description: string;
    /**
     * The task's delete reason.
     */
    deleteReason: string;
    /**
     * The owner's id.
     */
    owner: string;
    /**
     * The assignee's id.
     */
    assignee: string;
    /**
     * The time the task was started. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    startTime: string;
    /**
     * The time the task ended. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    endTime: string;
    /**
     * The time the task took to finish (in milliseconds).
     */
    duration: number;
    /**
     *The task's key.
     */
    taskDefinitionKey: string;
    /**
     * The task's priority.
     */
    priority: number;
    /**
     * The task's due date. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    due: string;
    /**
     * The id of the parent task, if this task is a subtask.
     */
    parentTaskId: string;
    /**
     * The follow-up date for the task. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    followUp: string;
    /**
     * The tenant id of the task instance.
     */
    tenantId: string;
    /**
     * The time after which the task should be removed by the History Cleanup job. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    removalTime: string;
    /**
     * The process instance id of the root process instance that initiated the process containing this task.
     */
    rootProcessInstanceId: string;
}
export declare type HistoryTaskSortBy = 'taskId' | 'activityInstanceId' | 'processDefinitionId' | 'processInstanceId' | 'executionId' | 'duration' | 'endTime' | 'startTime' | 'taskName' | 'taskDescription' | 'assignee' | 'owner' | 'dueDate' | 'followUpDate' | 'deleteReason' | 'taskDefinitionKey' | 'priority' | 'caseDefinitionId' | 'caseInstanceId' | 'caseExecutionId' | 'tenantId';
export interface HistoryTaskQueryParams extends BpmnListQueryParams {
    /**
     * Filter by task id.
     */
    taskId?: string;
    /**
     * Filter by parent task id.
     */
    taskParentTaskId?: string;
    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;
    /**
     * Filter by process instance business key.
     */
    processInstanceBusinessKey?: string;
    /**
     * Filter by process instances with one of the give business keys. The keys need to be in a comma-separated list.
     */
    processInstanceBusinessKeyIn?: string;
    /**
     * Filter by process instance business key that has the parameter value as a substring.
     */
    processInstanceBusinessKeyLike?: string;
    /**
     * Filter by the id of the execution that executed the task.
     */
    executionId?: string;
    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;
    /**
     * Restrict to tasks that belong to a process definition with the given key.
     */
    processDefinitionKey?: string;
    /**
     * 	Restrict to tasks that belong to a process definition with the given name.
     */
    processDefinitionName?: string;
    /**
     * Filter by case instance id.
     */
    caseInstanceId?: string;
    /**
     * Filter by the id of the case execution that executed the task.
     */
    caseExecutionId?: string;
    /**
     * Filter by case definition id.
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
     * Only include tasks which belong to one of the passed and comma-separated activity instance ids.
     */
    activityInstanceIdIn?: string;
    /**
     * Restrict to tasks that have the given name.
     */
    taskName?: string;
    /**
     * Restrict to tasks that have a name with the given parameter value as substring.
     */
    taskNameLike?: string;
    /**
     * Restrict to tasks that have the given description.
     */
    taskDescription?: string;
    /**
     * Restrict to tasks that have a description that has the parameter value as a substring.
     */
    taskDescriptionLike?: string;
    /**
     * Restrict to tasks that have the given key.
     */
    taskDefinitionKey?: string;
    /**
     * 	Restrict to tasks that have one of the passed and comma-separated task definition keys.
     */
    taskDefinitionKeyIn?: string;
    /**
     * Restrict to tasks that have the given delete reason.
     */
    taskDeleteReason?: string;
    /**
     * Restrict to tasks that have a delete reason that has the parameter value as a substring.
     */
    taskDeleteReasonLike?: string;
    /**
     * Restrict to tasks that the given user is assigned to.
     */
    taskAssignee?: string;
    /**
     * Restrict to tasks that are assigned to users with the parameter value as a substring.
     */
    taskAssigneeLike?: string;
    /**
     * Restrict to tasks that the given user owns.
     */
    taskOwner?: string;
    /**
     * Restrict to tasks that are owned by users with the parameter value as a substring.
     */
    taskOwnerLike?: string;
    /**
     * Restrict to tasks that have the given priority.
     */
    taskPriority?: number;
    /**
     * If set to true, restricts the query to all tasks that are assigned.
     */
    assigned?: boolean;
    /**
     * If set to true, restricts the query to all tasks that are unassigned.
     */
    unassigned?: boolean;
    /**
     * Only include finished tasks. Value may only be true, as false is the default behavior.
     */
    finished?: boolean;
    /**
     * Only include unfinished tasks. Value may only be true, as false is the default behavior.
     */
    unfinished?: boolean;
    /**
     * Only include tasks of finished processes. Value may only be true, as false is the default behavior.
     */
    processFinished?: boolean;
    /**
     * Only include tasks of unfinished processes. Value may only be true, as false is the default behavior.
     */
    processUnfinished?: boolean;
    /**
     * Restrict to tasks that are due on the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskDueDate?: string;
    /**
     * Restrict to tasks that are due before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskDueDateBefore?: string;
    /**
     * Restrict to tasks that are due after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskDueDateAfter?: string;
    /**
     * Only include tasks which have no due date. Value may only be true, as false is the default behavior.
     */
    withoutTaskDueDate?: boolean;
    /**
     * Restrict to tasks that have a followUp date on the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskFollowUpDate?: string;
    /**
     * Restrict to tasks that have a followUp date before the given date. By default*, the date must have the format
  yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskFollowUpDateBefore?: string;
    /**
     * Restrict to tasks that have a followUp date after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    taskFollowUpDateAfter?: string;
    /**
     * Restrict to tasks that were started before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    startedBefore?: string;
    /**
     * Restrict to tasks that were started after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    startedAfter?: string;
    /**
     * Restrict to tasks that were finished before the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    finishedBefore?: string;
    /**
     * 	Restrict to tasks that were finished after the given date. By default*, the date must have the format yyyy-MM-dd'T'HH:mm:ss.SSSZ, e.g., 2013-01-23T14:42:45.000+0200.
     */
    finishedAfter?: string;
    /**
     * Filter by a comma-separated list of tenant ids. A task instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;
    /**
     * Only include historic task instances that belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;
    /**
     * Only include tasks that have variables with certain values. Variable filtering expressions are comma-separated and are structured as follows:
  A valid parameter value has the form key_operator_value. key is the variable name, operator is the comparison operator to be used and value the variable value.
  Note: Values are always treated as String objects on server side.
  
  Valid operator values are: eq - equal to; neq - not equal to; gt - greater than; gteq - greater than or equal to; lt - lower than; lteq - lower than or equal to; like.
  key and value may not contain underscore or comma characters.
     */
    taskVariables?: string;
    /**
     * Only include tasks that belong to process instances that have variables with certain values. Variable filtering expressions are comma-separated and are structured as follows:
  A valid parameter value has the form key_operator_value. key is the variable name, operator is the comparison operator to be used and value the variable value.
  Note: Values are always treated as String objects on server side.
  
  Valid operator values are: eq - equal to; neq - not equal to; gt - greater than; gteq - greater than or equal to; lt - lower than; lteq - lower than or equal to; like;notLike.
  key and value may not contain underscore or comma characters.
     */
    processVariables?: string;
    /**
     * Match the variable name provided in taskVariables and processVariables case-insensitively. If set to true variableName and variablename are treated as equal.
     */
    variableNamesIgnoreCase?: boolean;
    /**
     * Match the variable value provided in taskVariables and processVariables case-insensitively. If set to true variableValue and variablevalue are treated as equal.
     */
    variableValuesIgnoreCase?: boolean;
    /**
     * Restrict to tasks with a historic identity link to the given user.
     */
    taskInvolvedUser?: string;
    /**
     * Restrict to tasks with a historic identity link to the given group.
     */
    taskInvolvedGroup?: string;
    /**
     * Restrict to tasks with a historic identity link to the given candidate user.
     */
    taskHadCandidateUser?: string;
    /**
     * Restrict to tasks with a historic identity link to the given candidate group.
     */
    taskHadCandidateGroup?: string;
    /**
     * Only include tasks which have a candidate group. Value may only be true, as false is the default behavior.
     */
    withCandidateGroups?: boolean;
    /**
     * Only include tasks which have no candidate group. Value may only be true, as false is the default behavior.
     */
    withoutCandidateGroups?: boolean;
}
