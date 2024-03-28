import { HttpConfig, BaseBpmnService } from '../../base';
import { AxiosHttpResult, VariableValue, TaskEntity, TaskQueryParams, TaskSortBy, FormKeyEntity, ClaimRequestBody, CompleteRequestBody, SubmitFormRequestBody, ResolveRequestBody, SetAssigneeRequestBody, DelegateRequestBody, FormVariablesQueryParams, CreateRequestBody, UpdateRequestBody, BpmnErrorRequestBody, BpmnEscalationRequestBody } from '../../../declarations';

declare class TaskService extends BaseBpmnService<TaskEntity, TaskQueryParams, TaskSortBy> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TaskService;
    getBaseAddress(): string;
    getCreateAddress(): string;
    /**
     * Retrieves the form key for a task. The form key corresponds to the FormData#formKey property in the engine.
     * This key can be used to do task-specific form rendering in client applications.
     * Additionally, the context path of the containing process application is returned.
     *
     * @param id The id of the task
     * @returns A JSON object containing the form key.
     */
    getFormKey(id: string): Promise<AxiosHttpResult<FormKeyEntity>>;
    /**
     * Claims a task for a specific user.
     * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
     *
     * @param id The id of the task
     * @param data {@link ClaimRequestBody}
     * @returns This method returns no content.
     */
    claim(id: string, data: ClaimRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Resets a task’s assignee. If successful, the task is not assigned to a user.
     *
     * @param id The id of the task
     * @returns This method returns no content.
     */
    unclaim(id: string): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables.
     *
     * @param id The id of the task
     * @param data {@link CompleteRequestBody}
     * @returns This method returns no content.
     */
    complete(id: string, data: CompleteRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables using a form submit.
     * There are two differences between this method and the complete method:
     *
     * · If the task is in state PENDING - i.e., has been delegated before, it is not completed but resolved. Otherwise it will be completed.
     * · If the task has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined.
     * See the Generated Task Forms section of the User Guide for more information.
     * Note that Form Field Metadata does not restrict which variables you can submit via this endpoint.
     *
     * @param id The id of the task
     * @param data {@link SubmitFormRequestBody}
     * @returns This method returns no content.
     */
    submitForm(id: string, data: SubmitFormRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Completes a task and updates process variables using a form submit.
     * There are two differences between this method and the complete method:
     *
     * · If the task is in state PENDING - i.e., has been delegated before, it is not completed but resolved. Otherwise it will be completed.
     * · If the task has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have validators defined.
     * See the Generated Task Forms section of the User Guide for more information.
     * Note that Form Field Metadata does not restrict which variables you can submit via this endpoint.
     *
     * @param id The id of the task
     * @param data {@link ResolveRequestBody}
     * @returns This method returns no content.
     */
    resolve(id: string, data: ResolveRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Changes the assignee of a task to a specific user.
     * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
     *
     * @param id The id of the task
     * @param data {@link SetAssigneeRequestBody}
     * @returns This method returns no content.
     */
    setAssignee(id: string, data: SetAssigneeRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Delegates a task to another user.
     *
     * @param id The id of the task
     * @param data {@link DelegateRequestBody}
     * @returns This method returns no content.
     */
    delegate(id: string, data: DelegateRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
     *
     * @param id The id of the task
     * @returns An object with the deployed form content.
     */
    getDeployedForm(id: string): Promise<AxiosHttpResult<Record<string, any>>>;
    /**
     * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated  Form.
     *
     * @param id The id of the task
     * @returns An object with the deployed form content.
     */
    getRenderedForm(id: string): Promise<AxiosHttpResult<string>>;
    /**
     * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
     * If form fields are defined, the variable types and default values of the form fields are taken into account.
     *
     * @param id The id of the task
     * @param param {@link FormVariablesQueryParams}
     * @returns {@link VariableValue}
     */
    getTaskFormVariables(id: string, param: FormVariablesQueryParams): Promise<AxiosHttpResult<VariableValue>>;
    /**
     * Creates a new task.
     *
     * @param data {@link CreateRequestBody}
     * @returns This method returns no content
     */
    create(data: CreateRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Updates a task.
     *
     * @param id The id of the task
     * @param data {@link UpdateRequestBody}
     * @returns This method returns no content
     */
    update(id: string, data: UpdateRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Reports a business error in the context of a running task by id.
     * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User s.
     *
     * @param id The id of the task
     * @param data {@link BpmnErrorRequestBody}
     * @returns This method returns no content
     */
    handleBpmnError(id: string, data: BpmnErrorRequestBody): Promise<AxiosHttpResult<string>>;
    /**
     * Reports an escalation in the context of a running task by id.
     * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User s.
     *
     * @param id The id of the task
     * @param data {@link BpmnEscalationRequestBody}
     * @returns This method returns no content
     */
    handleBpmnEscalation(id: string, data: BpmnEscalationRequestBody): Promise<AxiosHttpResult<string>>;
}
export { TaskService };
