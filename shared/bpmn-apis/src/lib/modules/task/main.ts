import type {
  AxiosHttpResult,
  BpmnDeleteQueryParams,
  VariableValue,
  Task,
  TaskQueryParams,
  TaskSortBy,
  TaskPathParams,
  TaskFormKeyResponse,
  TaskClaimBody,
  TaskCompleteBody,
  TaskSubmitFormBody,
  TaskResolveBody,
  TaskSetAssigneeBody,
  TaskDelegateBody,
  TaskFormVariablesQueryParams,
  TaskCreateBody,
  TaskUpdateBody,
  TaskBpmnErrorBody,
  TaskBpmnEscalationBody
} from '/@/declarations';

import { HttpConfig, BaseBpmnService } from '../../base';

class TaskService extends BaseBpmnService<Task, TaskQueryParams, TaskSortBy> {
  private static instance: TaskService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TaskService {
    if (this.instance == null) {
      this.instance = new TaskService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getBpmn() + '/task';
  }

  public getCreateAddress(): string {
    return this.getBaseAddress() + '/create';
  }

  public deleteById(id: string, query: BpmnDeleteQueryParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .deleteWithParams<string, string>(this.createAddressWithParam({ id: id }), query);
  }

  public getFormKey(path: TaskPathParams): Promise<AxiosHttpResult<TaskFormKeyResponse>> {
    return this.getConfig().getHttp().get<TaskFormKeyResponse>(this.createAddressWithParam(path, 'form'));
  }

  /**
   * Claims a task for a specific user.
   * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskClaimBody}
   * @returns This method returns no content.
   */
  public claimTask(path: TaskPathParams, data: TaskClaimBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, TaskClaimBody>(this.createAddressWithParam(path, 'claim'), data);
  }

  /**
   * Resets a task’s assignee. If successful, the task is not assigned to a user.
   *
   * @param path {@link TaskPathParams}
   * @returns This method returns no content.
   */
  public unclaimTask(path: TaskPathParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, any>(this.createAddressWithParam(path, 'unclaim'), {});
  }

  /**
   * Completes a task and updates process variables.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskCompleteBody}
   * @returns This method returns no content.
   */
  public completeTask(path: TaskPathParams, data: TaskCompleteBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskCompleteBody>(this.createAddressWithParam(path, 'complete'), data);
  }

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
  public submitTaskForm(path: TaskPathParams, data: TaskSubmitFormBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskSubmitFormBody>(this.createAddressWithParam(path, 'submit-form'), data);
  }

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
  public resolveTask(path: TaskPathParams, data: TaskResolveBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, TaskResolveBody>(this.createAddressWithParam(path, 'resolve'), data);
  }

  /**
   * Changes the assignee of a task to a specific user.
   * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskSetAssigneeBody}
   * @returns This method returns no content.
   */
  public setAssignee(path: TaskPathParams, data: TaskSetAssigneeBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskSetAssigneeBody>(this.createAddressWithParam(path, 'assignee'), data);
  }

  /**
   * Delegates a task to another user.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskDelegateBody}
   * @returns This method returns no content.
   */
  public delegateTask(path: TaskPathParams, data: TaskDelegateBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskDelegateBody>(this.createAddressWithParam(path, 'delegate'), data);
  }

  /**
   * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
   *
   * @param path {@link TaskPathParams}
   * @returns An object with the deployed form content.
   */
  public getDeployedTaskForm(path: TaskPathParams): Promise<AxiosHttpResult<Record<string, any>>> {
    return this.getConfig().getHttp().get<Record<string, any>>(this.createAddressWithParam(path, 'deployed-form'));
  }

  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated Task Form.
   *
   * @param path {@link TaskPathParams}
   * @returns An object with the deployed form content.
   */
  public getRenderedTaskForm(path: TaskPathParams): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().get<string>(this.createAddressWithParam(path, 'rendered-form'));
  }

  /**
   * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
   * If form fields are defined, the variable types and default values of the form fields are taken into account.
   *
   * @param path {@link TaskPathParams}
   * @param param {@link TaskFormVariablesQueryParams}
   * @returns {@link VariableValue}
   */
  public getTaskFormVariables(
    path: TaskPathParams,
    param: TaskFormVariablesQueryParams
  ): Promise<AxiosHttpResult<VariableValue>> {
    return this.getConfig()
      .getHttp()
      .get<VariableValue, TaskFormVariablesQueryParams>(this.createAddressWithParam(path, 'form-variables'), param);
  }

  /**
   * Creates a new task.
   *
   * @param data {@link TaskCreateBody}
   * @returns This method returns no content
   */
  public createTask(data: TaskCreateBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, TaskCreateBody>(this.getCreateAddress(), data);
  }

  /**
   * Updates a task.
   *
   * @param data {@link TaskUpdateBody}
   * @returns This method returns no content
   */
  public updateTask(path: TaskPathParams, data: TaskUpdateBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, TaskUpdateBody>(this.createAddressWithParam(path), data);
  }

  /**
   * Reports a business error in the context of a running task by id.
   * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User Tasks.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskBpmnErrorBody}
   * @returns This method returns no content
   */
  public handleTaskBpmnError(path: TaskPathParams, data: TaskBpmnErrorBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskBpmnErrorBody>(this.createAddressWithParam(path, 'bpmnError'), data);
  }

  /**
   * Reports an escalation in the context of a running task by id.
   * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User Tasks.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskBpmnEscalationBody}
   * @returns This method returns no content
   */
  public handleTaskBpmnEscalation(
    path: TaskPathParams,
    data: TaskBpmnEscalationBody
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, TaskBpmnEscalationBody>(this.createAddressWithParam(path, 'bpmnEscalation'), data);
  }
}

export { TaskService };
