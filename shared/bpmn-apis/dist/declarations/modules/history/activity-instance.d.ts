import { BpmnEntity, BpmnListQueryParams } from '../../base';
export interface HistoryActivityInstanceEntity extends BpmnEntity {
    /**
     * The id of the activity instance.
     */
    id: string;
    /**
     * The id of the parent activity instance, for example a sub process instance.
     */
    parentActivityInstanceId: string;
    /**
     * The id of the activity that this object is an instance of.
     */
    activityId: string;
    /**
     * The name of the activity that this object is an instance of.
     */
    activityName: string;
    /**
     * The type of the activity that this object is an instance of.
     */
    activityType: string;
    /**
     * The key of the process definition that this activity instance belongs to.
     */
    processDefinitionKey: string;
    /**
     * The id of the process definition that this activity instance belongs to.
     */
    processDefinitionId: string;
    /**
     * The id of the process instance that this activity instance belongs to.
     */
    processInstanceId: string;
    /**
     * The id of the execution that executed this activity instance.
     */
    executionId: string;
    /**
     * The id of the task that is associated to this activity instance. Is only set if the activity is a user task.
     */
    taskId: string;
    /**
     * The assignee of the task that is associated to this activity instance. Is only set if the activity is a user task.
     */
    assignee: string;
    /**
     * The id of the called process instance. Is only set if the activity is a call activity and the called instance a process instance.
     */
    calledProcessInstanceId: string;
    /**
     * The id of the called case instance. Is only set if the activity is a call activity and the called instance a case instance.
     */
    calledCaseInstanceId: string;
    /**
     * The time the instance was started. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    startTime: string;
    /**
     * The time the instance ended. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    endTime: string;
    /**
     * The time the instance took to finish (in milliseconds).
     */
    durationInMillis: number;
    /**
     * If true, this activity instance is canceled.
     */
    canceled: boolean;
    /**
     * If true, this activity instance did complete a BPMN 2.0 scope.
     */
    completeScope: boolean;
    /**
     * The tenant id of the activity instance.
     */
    tenantId: string;
    /**
     * The time after which the activity instance should be removed by the History Cleanup job. Default format* yyyy-MM-dd'T'HH:mm:ss.SSSZ.
     */
    removalTime: string;
    /**
     * The process instance id of the root process instance that initiated the process containing this activity instance.
     */
    rootProcessInstanceId: string;
}
export declare type HistoryActivityInstanceSortBy = 'activityInstanceId' | 'instanceId' | 'executionId' | 'activityId' | 'activityName' | 'activityType' | 'startTime' | 'endTime' | 'duration' | 'definitionId' | 'occurrence' | 'tenantId';
export interface HistoryActivityInstanceQueryParams extends BpmnListQueryParams {
    /**
     * Filter by activity instance id.
     */
    activityInstanceId?: string;
    /**
     * Filter by process instance id.
     */
    processInstanceId?: string;
    /**
     * Filter by process definition id.
     */
    processDefinitionId?: string;
    /**
     * Filter by the id of the execution that executed the activity instance.
     */
    executionId?: string;
    /**
     * Filter by the activity id (according to BPMN 2.0 XML).
     */
    activityId?: string;
    /**
     * Filter by the activity name (according to BPMN 2.0 XML).
     */
    activityName?: string;
    /**
     * Filter by a substring of the activity name (according to BPMN 2.0 XML). The string can include the wildcard character '%' to express like-strategy: starts with (string%), ends with (%string) or contains (%string%).
     */
    activityNameLike?: string;
    /**
     * Filter by activity type.
     */
    activityType?: string;
    /**
     * Only include activity instances that are user tasks and assigned to a given user.
     */
    taskAssignee?: string;
    /**
     * Only include finished activity instances. Value may only be true, as false behaves the same as when the property is not set.
     */
    finished?: boolean;
    /**
     * Only include unfinished activity instances. Value may only be true, as false behaves the same as when the property is not set.
     */
    unfinished?: boolean;
    /**
     * Only include canceled activity instances. Value may only be true, as false behaves the same as when the property is not set.
     */
    canceled?: boolean;
    /**
     * Only include activity instances which completed a scope. Value may only be true, as false behaves the same as when the property is not set.
     */
    completeScope?: boolean;
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
     * Filter by a comma-separated list of tenant ids. An activity instance must have one of the given tenant ids.
     */
    tenantIdIn?: string;
    /**
     * Only include historic activity instances that belong to no tenant. Value may only be true, as false is the default behavior.
     */
    withoutTenantId?: boolean;
}
