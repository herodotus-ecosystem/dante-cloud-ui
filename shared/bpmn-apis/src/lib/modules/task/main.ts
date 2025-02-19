import type {
  AxiosHttpResult,
  VariableValue,
  TaskEntity,
  TaskQueryParams,
  TaskSortBy,
  FormKeyEntity,
  ClaimRequestBody,
  CompleteRequestBody,
  SubmitFormRequestBody,
  ResolveRequestBody,
  SetAssigneeRequestBody,
  DelegateRequestBody,
  FormVariablesQueryParams,
  CreateRequestBody,
  UpdateRequestBody,
  BpmnErrorRequestBody,
  BpmnEscalationRequestBody,
} from '@/declarations';

import { HttpConfig, BaseBpmnService } from '../../base';

class TaskService extends BaseBpmnService<TaskEntity, TaskQueryParams, TaskSortBy> {
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

  /**
   * Retrieves the form key for a task. The form key corresponds to the FormData#formKey property in the engine.
   * This key can be used to do task-specific form rendering in client applications.
   * Additionally, the context path of the containing process application is returned.
   *
   * @param id The id of the task
   * @returns A JSON object containing the form key.
   */
  public getFormKey(id: string): Promise<AxiosHttpResult<FormKeyEntity>> {
    return this.getConfig().getHttp().get<FormKeyEntity>(this.createAddressById(id, 'form'));
  }

  /**
   * Claims a task for a specific user.
   * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
   *
   * @param id The id of the task
   * @param data {@link ClaimRequestBody}
   * @returns This method returns no content.
   */
  public claim(id: string, data: ClaimRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ClaimRequestBody>(this.createAddressById(id, 'claim'), data);
  }

  /**
   * Resets a task’s assignee. If successful, the task is not assigned to a user.
   *
   * @param id The id of the task
   * @returns This method returns no content.
   */
  public unclaim(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().post<string, any>(this.createAddressById(id, 'unclaim'), {});
  }

  /**
   * Completes a task and updates process variables.
   *
   * @param id The id of the task
   * @param data {@link CompleteRequestBody}
   * @returns This method returns no content.
   */
  public complete(id: string, data: CompleteRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, CompleteRequestBody>(this.createAddressById(id, 'complete'), data);
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
   * @param id The id of the task
   * @param data {@link SubmitFormRequestBody}
   * @returns This method returns no content.
   */
  public submitForm(id: string, data: SubmitFormRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, SubmitFormRequestBody>(this.createAddressById(id, 'submit-form'), data);
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
   * @param id The id of the task
   * @param data {@link ResolveRequestBody}
   * @returns This method returns no content.
   */
  public resolve(id: string, data: ResolveRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, ResolveRequestBody>(this.createAddressById(id, 'resolve'), data);
  }

  /**
   * Changes the assignee of a task to a specific user.
   * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
   *
   * @param id The id of the task
   * @param data {@link SetAssigneeRequestBody}
   * @returns This method returns no content.
   */
  public setAssignee(id: string, data: SetAssigneeRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, SetAssigneeRequestBody>(this.createAddressById(id, 'assignee'), data);
  }

  /**
   * Delegates a task to another user.
   *
   * @param id The id of the task
   * @param data {@link DelegateRequestBody}
   * @returns This method returns no content.
   */
  public delegate(id: string, data: DelegateRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, DelegateRequestBody>(this.createAddressById(id, 'delegate'), data);
  }

  /**
   * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
   *
   * @param id The id of the task
   * @returns An object with the deployed form content.
   */
  public getDeployedForm(id: string): Promise<AxiosHttpResult<Record<string, any>>> {
    return this.getConfig()
      .getHttp()
      .get<Record<string, any>>(this.createAddressById(id, 'deployed-form'));
  }

  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated  Form.
   *
   * @param id The id of the task
   * @returns An object with the deployed form content.
   */
  public getRenderedForm(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().get<string>(this.createAddressById(id, 'rendered-form'));
  }

  /**
   * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
   * If form fields are defined, the variable types and default values of the form fields are taken into account.
   *
   * @param id The id of the task
   * @param param {@link FormVariablesQueryParams}
   * @returns {@link VariableValue}
   */
  public getTaskFormVariables(
    id: string,
    param: FormVariablesQueryParams,
  ): Promise<AxiosHttpResult<VariableValue>> {
    return this.getConfig()
      .getHttp()
      .get<
        VariableValue,
        FormVariablesQueryParams
      >(this.createAddressById(id, 'form-variables'), param);
  }

  /**
   * Creates a new task.
   *
   * @param data {@link CreateRequestBody}
   * @returns This method returns no content
   */
  public create(data: CreateRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, CreateRequestBody>(this.getCreateAddress(), data);
  }

  /**
   * Updates a task.
   *
   * @param id The id of the task
   * @param data {@link UpdateRequestBody}
   * @returns This method returns no content
   */
  public update(id: string, data: UpdateRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .put<string, UpdateRequestBody>(this.createAddressById(id), data);
  }

  /**
   * Reports a business error in the context of a running task by id.
   * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User s.
   *
   * @param id The id of the task
   * @param data {@link BpmnErrorRequestBody}
   * @returns This method returns no content
   */
  public handleBpmnError(id: string, data: BpmnErrorRequestBody): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, BpmnErrorRequestBody>(this.createAddressById(id, 'bpmnError'), data);
  }

  /**
   * Reports an escalation in the context of a running task by id.
   * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User s.
   *
   * @param id The id of the task
   * @param data {@link BpmnEscalationRequestBody}
   * @returns This method returns no content
   */
  public handleBpmnEscalation(
    id: string,
    data: BpmnEscalationRequestBody,
  ): Promise<AxiosHttpResult<string>> {
    return this.getConfig()
      .getHttp()
      .post<string, BpmnEscalationRequestBody>(this.createAddressById(id, 'bpmnEscalation'), data);
  }
}

export { TaskService };
