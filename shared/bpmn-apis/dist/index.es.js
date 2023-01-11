var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { lodash, Service, moment, ContentTypeEnum, HttpConfig } from "@herodotus/core";
import { Axios, ContentTypeEnum as ContentTypeEnum2, HttpConfig as HttpConfig2, Service as Service2, lodash as lodash2, moment as moment2 } from "@herodotus/core";
class PathParamBuilder {
  constructor(address) {
    __publicField(this, "address");
    __publicField(this, "operation", "");
    __publicField(this, "id", "");
    __publicField(this, "key", "");
    __publicField(this, "tenantId", "");
    this.address = address;
  }
  setOperation(operation) {
    this.operation = operation;
    return this;
  }
  setId(id) {
    this.id = id;
    return this;
  }
  setKey(key) {
    this.key = key;
    return this;
  }
  setTenantId(tenantId) {
    this.tenantId = tenantId;
    return this;
  }
  withParam(param) {
    this.id = param.id;
    this.key = param.key;
    this.tenantId = param.tenantId;
    return this;
  }
  build() {
    let result = this.address;
    if (lodash.endsWith(result, "/")) {
      result = lodash.trimEnd(result, "/");
    }
    if (this.id) {
      result += "/" + this.id;
    } else {
      if (this.key) {
        result += "/key/" + this.key;
      }
      if (this.tenantId) {
        result += "/tenant-id/" + this.tenantId;
      }
    }
    if (this.operation) {
      result += "/" + this.operation;
    }
    return result;
  }
}
class BpmnService extends Service {
  getCountAddress() {
    return this.getBaseAddress() + "/count";
  }
  createAddressWithParam(params, operation = "") {
    let builder = new PathParamBuilder(this.getBaseAddress());
    if (operation) {
      return builder.withParam(params).setOperation(operation).build();
    } else {
      return builder.withParam(params).build();
    }
  }
}
class BpmnReadListService extends BpmnService {
  getCount(params = {}) {
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().get(this.getCountAddress(), params).then((response) => {
        if (response) {
          const data = response;
          resolve(data.count);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getList(pagination, count, params = {}) {
    const full = Object.assign(params, {
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize
    });
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().get(this.getBaseAddress(), full).then((result) => {
        const data = {
          content: result,
          totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
          totalElements: String(count)
        };
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getByPage(pagination, params = {}) {
    return new Promise((resolve, reject) => {
      this.getCount(params).then((count) => {
        this.getList(pagination, count, params).then((result) => {
          resolve(result);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
class BpmnReadService extends BpmnReadListService {
  get(id) {
    return this.getConfig().getHttp().get(this.createAddressWithParam({ id }));
  }
}
class BpmnReadListByPostService extends BpmnReadService {
  getPostCount(params = {}) {
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().get(this.getCountAddress(), params).then((response) => {
        if (response) {
          const data = response;
          resolve(data.count);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getPostList(pagination, count, sorting = [], params = {}) {
    const query = {
      firstResult: (pagination.pageNumber - 1) * pagination.pageSize,
      maxResults: pagination.pageSize
    };
    let body = {};
    if (!lodash.isEmpty(sorting)) {
      body = Object.assign(params, {
        sorting
      });
    }
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().postWithParams(this.getBaseAddress(), query, body).then((result) => {
        const data = {
          content: result,
          totalPages: count ? (count + pagination.pageSize - 1) / pagination.pageSize : count,
          totalElements: String(count)
        };
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getPostByPage(pagination, sorting = [], params = {}) {
    return new Promise((resolve, reject) => {
      this.getPostCount(params).then((count) => {
        this.getPostList(pagination, count, sorting, params).then((result) => {
          resolve(result);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
class BaseBpmnService extends BpmnReadListByPostService {
}
const _DeploymentService = class extends BaseBpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _DeploymentService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/deployment";
  }
  getCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
  getDuplicateFiltering(data) {
    if (data.deployChangedOnly) {
      return "true";
    } else {
      if (data.enableDuplicateFiltering) {
        return String(data.enableDuplicateFiltering);
      } else {
        return "false";
      }
    }
  }
  create(data) {
    let formData = new FormData();
    formData.append("deployment-name", data.deploymentName);
    formData.append("deploy-changed-only", data.deployChangedOnly ? "true" : "false");
    formData.append("enable-duplicate-filtering", this.getDuplicateFiltering(data));
    formData.append("deployment-source", data.deploymentSource ? data.deploymentSource : "Dante Cloud UI");
    const activationTime = data.deploymentActivationTime ? data.deploymentActivationTime : new Date();
    formData.append("deployment-activation-time", moment(activationTime).utc().format());
    if (data.tenantId) {
      formData.append("tenant-id", data.tenantId);
    }
    let blob = new Blob([data.resource], { type: "application/octet-stream" });
    formData.append("data", blob, data.deploymentName);
    return this.getConfig().getHttp().post(this.getCreateAddress(), formData, { contentType: ContentTypeEnum.MULTI_PART });
  }
  redeploy(id, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam({ id }, "redeploy"), data);
  }
  resources(id) {
    return this.getConfig().getHttp().get(this.createAddressWithParam({ id }, "resources"));
  }
  resource(id, resourceId) {
    const address = this.getBaseAddress() + "/" + id + "/resources" + resourceId;
    return this.getConfig().getHttp().get(address);
  }
  binaryResource(id, resourceId) {
    const address = this.getBaseAddress() + "/" + id + "/resources" + resourceId + "/data";
    return this.getConfig().getHttp().get(address);
  }
  deleteById(id, query) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressWithParam({ id }), query);
  }
  registered() {
    const address = this.getBaseAddress() + "/registered";
    return this.getConfig().getHttp().get(address);
  }
};
let DeploymentService = _DeploymentService;
__publicField(DeploymentService, "instance");
const _ProcessDefinitionService = class extends BaseBpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ProcessDefinitionService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/process-definition";
  }
  getActivityInstanceStatistics(path, query) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "statistics"), query);
  }
  getStaticCalled(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "static-called-process-definitions"));
  }
  getDiagram(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "diagram"));
  }
  getFormVariables(path, query) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "form-variables"), query);
  }
  getRenderedForm(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "rendered-form"));
  }
  getStartForm(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "startForm"));
  }
  getProcessInstanceStatistics(query) {
    const address = this.getBaseAddress() + "/statistics";
    return this.getConfig().getHttp().get(address, query);
  }
  getXml(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "xml"));
  }
  getByPathParams(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path));
  }
  getDeployedStartForm(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "deployed-start-form"));
  }
  start(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "start"), data);
  }
  submitForm(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "submit-form"), data);
  }
  suspendById(path, data) {
    return this.getConfig().getHttp().put(this.createAddressWithParam(path, "suspended"), data);
  }
  suspendByKey(data) {
    const address = this.getBaseAddress() + "/suspended";
    return this.getConfig().getHttp().put(address, data);
  }
  historyTimeToLive(path, data) {
    return this.getConfig().getHttp().put(
      this.createAddressWithParam(path, "history-time-to-live"),
      data
    );
  }
  deleteById(id, query) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressWithParam({ id }), query);
  }
  deleteByKey(key, tenantId = "", query) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressWithParam({ key, tenantId }, "delete"), query);
  }
  restart(id, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam({ id }, "restart"), data);
  }
  restartAsync(id, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam({ id }, "restart-async"), data);
  }
};
let ProcessDefinitionService = _ProcessDefinitionService;
__publicField(ProcessDefinitionService, "instance");
const _ProcessInstanceService = class extends BaseBpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ProcessInstanceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/process-instance";
  }
  getActivityInstance(id) {
    return this.getConfig().getHttp().get(this.createAddressWithParam({ id }, "activity-instances"));
  }
  modification(id, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam({ id }, "modification"), data);
  }
  modificationAsync(id, data) {
    return this.getConfig().getHttp().post(
      this.createAddressWithParam({ id }, "modification-async"),
      data
    );
  }
  deleteById(id, query) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressWithParam({ id }), query);
  }
  deleteAsync(data) {
    const address = this.getBaseAddress() + "delete";
    return this.getConfig().getHttp().post(address, data);
  }
  deleteAsyncHistoricQueryBased(data) {
    const address = this.getBaseAddress() + "delete-historic-query-based";
    return this.getConfig().getHttp().post(address, data);
  }
  jobRetries(data) {
    const address = this.getBaseAddress() + "job-retries";
    return this.getConfig().getHttp().post(address, data);
  }
  jobRetriesHistoricQueryBased(data) {
    const address = this.getBaseAddress() + "job-retries-historic-query-based";
    return this.getConfig().getHttp().post(address, data);
  }
  variablesAsync(data) {
    const address = this.getBaseAddress() + "variables-async";
    return this.getConfig().getHttp().post(address, data);
  }
  messageAsync(data) {
    const address = this.getBaseAddress() + "message-async";
    return this.getConfig().getHttp().post(address, data);
  }
  suspendById(id, data) {
    return this.getConfig().getHttp().put(this.createAddressWithParam({ id }, "suspended"), data);
  }
  suspend(data) {
    const address = this.getBaseAddress() + "suspended";
    return this.getConfig().getHttp().put(address, data);
  }
  suspendedAsync(data) {
    const address = this.getBaseAddress() + "suspended-async";
    return this.getConfig().getHttp().post(address, data);
  }
};
let ProcessInstanceService = _ProcessInstanceService;
__publicField(ProcessInstanceService, "instance");
const _TaskService = class extends BaseBpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _TaskService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/task";
  }
  getCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
  deleteById(id, query) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressWithParam({ id }), query);
  }
  getFormKey(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "form"));
  }
  /**
   * Claims a task for a specific user.
   * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskClaimBody}
   * @returns This method returns no content.
   */
  claimTask(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "claim"), data);
  }
  /**
   * Resets a task’s assignee. If successful, the task is not assigned to a user.
   *
   * @param path {@link TaskPathParams}
   * @returns This method returns no content.
   */
  unclaimTask(path) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "unclaim"), {});
  }
  /**
   * Completes a task and updates process variables.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskCompleteBody}
   * @returns This method returns no content.
   */
  completeTask(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "complete"), data);
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
  submitTaskForm(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "submit-form"), data);
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
  resolveTask(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "resolve"), data);
  }
  /**
   * Changes the assignee of a task to a specific user.
   * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskSetAssigneeBody}
   * @returns This method returns no content.
   */
  setAssignee(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "assignee"), data);
  }
  /**
   * Delegates a task to another user.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskDelegateBody}
   * @returns This method returns no content.
   */
  delegateTask(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "delegate"), data);
  }
  /**
   * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
   *
   * @param path {@link TaskPathParams}
   * @returns An object with the deployed form content.
   */
  getDeployedTaskForm(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "deployed-form"));
  }
  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated Task Form.
   *
   * @param path {@link TaskPathParams}
   * @returns An object with the deployed form content.
   */
  getRenderedTaskForm(path) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "rendered-form"));
  }
  /**
   * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
   * If form fields are defined, the variable types and default values of the form fields are taken into account.
   *
   * @param path {@link TaskPathParams}
   * @param param {@link TaskFormVariablesQueryParams}
   * @returns {@link VariableValue}
   */
  getTaskFormVariables(path, param) {
    return this.getConfig().getHttp().get(this.createAddressWithParam(path, "form-variables"), param);
  }
  /**
   * Creates a new task.
   *
   * @param data {@link TaskCreateBody}
   * @returns This method returns no content
   */
  createTask(data) {
    return this.getConfig().getHttp().post(this.getCreateAddress(), data);
  }
  /**
   * Updates a task.
   *
   * @param data {@link TaskUpdateBody}
   * @returns This method returns no content
   */
  updateTask(path, data) {
    return this.getConfig().getHttp().put(this.createAddressWithParam(path), data);
  }
  /**
   * Reports a business error in the context of a running task by id.
   * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User Tasks.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskBpmnErrorBody}
   * @returns This method returns no content
   */
  handleTaskBpmnError(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "bpmnError"), data);
  }
  /**
   * Reports an escalation in the context of a running task by id.
   * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User Tasks.
   *
   * @param path {@link TaskPathParams}
   * @param data {@link TaskBpmnEscalationBody}
   * @returns This method returns no content
   */
  handleTaskBpmnEscalation(path, data) {
    return this.getConfig().getHttp().post(this.createAddressWithParam(path, "bpmnEscalation"), data);
  }
};
let TaskService = _TaskService;
__publicField(TaskService, "instance");
const _BpmnApiResources = class {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _BpmnApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  deployment() {
    return DeploymentService.getInstance(this.config);
  }
  processDefinition() {
    return ProcessDefinitionService.getInstance(this.config);
  }
  processInstance() {
    return ProcessInstanceService.getInstance(this.config);
  }
  task() {
    return TaskService.getInstance(this.config);
  }
};
let BpmnApiResources = _BpmnApiResources;
__publicField(BpmnApiResources, "instance");
const createBpmnApi = (project, clientId, clientSecret, http) => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return BpmnApiResources.getInstance(config);
};
export {
  Axios,
  BaseBpmnService,
  BpmnReadListByPostService,
  BpmnReadListService,
  BpmnReadService,
  BpmnService,
  ContentTypeEnum2 as ContentTypeEnum,
  DeploymentService,
  HttpConfig2 as HttpConfig,
  PathParamBuilder,
  ProcessDefinitionService,
  ProcessInstanceService,
  Service2 as Service,
  TaskService,
  createBpmnApi,
  lodash2 as lodash,
  moment2 as moment
};
