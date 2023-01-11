import type { AxiosHttpResult, BpmnDeleteQueryParams, VariableValue, Task, TaskQueryParams, TaskSortBy, TaskPathParams, TaskFormKeyResponse, TaskClaimBody, TaskCompleteBody, TaskSubmitFormBody, TaskResolveBody, TaskSetAssigneeBody, TaskDelegateBody, TaskFormVariablesQueryParams, TaskCreateBody, TaskUpdateBody, TaskBpmnErrorBody, TaskBpmnEscalationBody } from '../../../declarations';
import { HttpConfig, BaseBpmnService } from '../../base';
declare class TaskService extends BaseBpmnService<Task, TaskQueryParams, TaskSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TaskService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>>;
    getFormKey(path: TaskPathParams): Promise<AxiosHttpResult<TaskFormKeyResponse>>;
    /**
     * Claims a task for a specific user.
     * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskClaimBody}
     * @returns This method returns no content.
     */
    claimTask(path: TaskPathParams, data: TaskClaimBody): Promise<AxiosHttpResult<string>>;
    /**
     * Resets a task’s assignee. If successful, the task is not assigned to a user.
     *
     * @param path {@link TaskPathParams}
     * @returns This method returns no content.
     */
    unclaimTask(path: TaskPathParams): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskCompleteBody}
     * @returns This method returns no content.
     */
    completeTask(path: TaskPathParams, data: TaskCompleteBody): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables using a form submit.
     * There are two differences between this method and the complete method:
     *
     * · If the task is in state PENDING - i.e., has been delegated before, it is not completed but resolved. Otherwise it will be completed.
     * · If the task has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined.
     * See the Generated Task Forms section of the User Guide for more information.
     * Note that Form Field Metadata does not restrict which variables you can submit via this endpoint.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskSubmitFormBody}
     * @returns This method returns no content.
     */
    submitTaskForm(path: TaskPathParams, data: TaskSubmitFormBody): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables using a form submit.
     * There are two differences between this method and the complete method:
     *
     * · If the task is in state PENDING - i.e., has been delegated before, it is not completed but resolved. Otherwise it will be completed.
     * · If the task has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined.
     * See the Generated Task Forms section of the User Guide for more information.
     * Note that Form Field Metadata does not restrict which variables you can submit via this endpoint.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskResolveBody}
     * @returns This method returns no content.
     */
    resolveTask(path: TaskPathParams, data: TaskResolveBody): Promise<AxiosHttpResult<string>>;
    /**
     * Changes the assignee of a task to a specific user.
     * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskSetAssigneeBody}
     * @returns This method returns no content.
     */
    setAssignee(path: TaskPathParams, data: TaskSetAssigneeBody): Promise<AxiosHttpResult<string>>;
    /**
     * Delegates a task to another user.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskDelegateBody}
     * @returns This method returns no content.
     */
    delegateTask(path: TaskPathParams, data: TaskDelegateBody): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
     *
     * @param path {@link TaskPathParams}
     * @returns An object with the deployed form content.
     */
    getDeployedTaskForm(path: TaskPathParams): Promise<AxiosHttpResult<Record<string, any>>>;
    /**
     * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated Task Form.
     *
     * @param path {@link TaskPathParams}
     * @returns An object with the deployed form content.
     */
    getRenderedTaskForm(path: TaskPathParams): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
     * If form fields are defined, the variable types and default values of the form fields are taken into account.
     *
     * @param path {@link TaskPathParams}
     * @param param {@link TaskFormVariablesQueryParams}
     * @returns {@link VariableValue}
     */
    getTaskFormVariables(path: TaskPathParams, param: TaskFormVariablesQueryParams): Promise<AxiosHttpResult<VariableValue>>;
    /**
     * Creates a new task.
     *
     * @param data {@link TaskCreateBody}
     * @returns This method returns no content
     */
    createTask(data: TaskCreateBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a task.
     *
     * @param data {@link TaskUpdateBody}
     * @returns This method returns no content
     */
    updateTask(path: TaskPathParams, data: TaskUpdateBody): Promise<AxiosHttpResult<string>>;
    /**
     * Reports a business error in the context of a running task by id.
     * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User Tasks.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskBpmnErrorBody}
     * @returns This method returns no content
     */
    handleTaskBpmnError(path: TaskPathParams, data: TaskBpmnErrorBody): Promise<AxiosHttpResult<string>>;
    /**
     * Reports an escalation in the context of a running task by id.
     * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User Tasks.
     *
     * @param path {@link TaskPathParams}
     * @param data {@link TaskBpmnEscalationBody}
     * @returns This method returns no content
     */
    handleTaskBpmnEscalation(path: TaskPathParams, data: TaskBpmnEscalationBody): Promise<AxiosHttpResult<string>>;
}
export { TaskService };
