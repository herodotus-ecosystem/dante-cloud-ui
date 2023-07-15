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
    __publicField(this, "action", "");
    this.address = address;
  }
  getWellFormedAddress() {
    let result = this.address;
    if (lodash.endsWith(result, "/")) {
      return lodash.trimEnd(result, "/");
    } else {
      return result;
    }
  }
  addAction(action) {
    this.action = action;
  }
  appendAction(data) {
    if (this.action) {
      return data + "/" + this.action;
    } else {
      return data;
    }
  }
}
class UnionPathParamBuilder extends PathParamBuilder {
  constructor(address) {
    super(address);
    __publicField(this, "id", "");
    __publicField(this, "key", "");
    __publicField(this, "tenantId", "");
  }
  setAction(action) {
    this.addAction(action);
    return this;
  }
  withParam(param) {
    this.id = param.id;
    this.key = param.key;
    this.tenantId = param.tenantId;
    return this;
  }
  build() {
    let result = this.getWellFormedAddress();
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
    return this.appendAction(result);
  }
}
class RelationPathParamBuilder extends PathParamBuilder {
  constructor(address) {
    super(address);
    __publicField(this, "id", "");
    __publicField(this, "relationId", "");
  }
  withParam(param) {
    this.id = param.id;
    this.relationId = param.relationId;
    this.addAction(param.action);
    return this;
  }
  build() {
    let result = this.getWellFormedAddress();
    result += "/" + this.id;
    result = this.appendAction(result);
    result += "/" + this.relationId;
    return result;
  }
}
class BpmnService extends Service {
  getCountAddress() {
    return this.getBaseAddress() + "/count";
  }
  createAddressByParam(params, action = "") {
    let builder = new UnionPathParamBuilder(this.getBaseAddress());
    if (action) {
      return builder.withParam(params).setAction(action).build();
    } else {
      return builder.withParam(params).build();
    }
  }
  createAddressByRelation(id, relationId, action) {
    let builder = new RelationPathParamBuilder(this.getBaseAddress());
    return builder.withParam({ id, relationId, action }).build();
  }
  createAddressById(id, action = "") {
    return this.createAddressByParam({ id }, action);
  }
  delete(id, deleteParams = {}) {
    if (lodash.isEmpty(deleteParams)) {
      return this.getConfig().getHttp().delete(this.createAddressById(id));
    } else {
      return this.getConfig().getHttp().deleteWithParams(this.createAddressById(id), deleteParams);
    }
  }
}
class BpmnQueryByGetService extends BpmnService {
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
  getAll(sortable, params = {}) {
    return new Promise((resolve, reject) => {
      this.getCount(params).then((count) => {
        const full = Object.assign(params, {
          sortBy: sortable.sortBy,
          sortOrder: sortable.sortOrder,
          firstResult: 0,
          maxResults: count
        });
        this.getConfig().getHttp().get(this.getBaseAddress(), full).then((result) => {
          const data = result;
          resolve(data);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
class BpmnQueryService extends BpmnQueryByGetService {
  get(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id));
  }
}
class BpmnQueryByPostService extends BpmnQueryService {
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
class BaseBpmnService extends BpmnQueryByPostService {
}
const _DeploymentService = class _DeploymentService extends BpmnQueryService {
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
  /**
   * Creates a deployment.
   *
   * @param data {@link DeploymentCreateRequestBody}
   * @returns A JSON object corresponding to the DeploymentWithDefinitions interface in the engine
   */
  create(data) {
    let formData = new FormData();
    formData.append("deployment-name", data.deploymentName);
    formData.append("deploy-changed-only", data.deployChangedOnly ? "true" : "false");
    formData.append("enable-duplicate-filtering", this.getDuplicateFiltering(data));
    formData.append("deployment-source", data.deploymentSource ? data.deploymentSource : "Dante Cloud UI");
    const activationTime = data.deploymentActivationTime ? data.deploymentActivationTime : /* @__PURE__ */ new Date();
    formData.append("deployment-activation-time", moment(activationTime).utc().format());
    if (data.tenantId) {
      formData.append("tenant-id", data.tenantId);
    }
    let blob = new Blob([data.resource], { type: "application/octet-stream" });
    formData.append("data", blob, data.deploymentName);
    return this.getConfig().getHttp().post(this.getCreateAddress(), formData, {
      contentType: ContentTypeEnum.MULTI_PART
    });
  }
  /**
   * Re-deploys an existing deployment.
   *
   * The deployment resources to re-deploy can be restricted by using the properties resourceIds or resourceNames.
   * If no deployment resources to re-deploy are passed then all existing resources of the given deployment are re-deployed.
   *
   * @param id The id of the deployment to re-deploy.
   * @param data {@link DeploymentRedeployRequestBody}
   * @returns A JSON object corresponding to the DeploymentWithDefinitions interface in the engine
   */
  redeploy(id, data) {
    return this.getConfig().getHttp().post(
      this.createAddressById(id, "redeploy"),
      data
    );
  }
  /**
   * Retrieves all deployment resources of a given deployment.
   *
   * @param id The id of the deployment to retrieve the deployment resources for.
   * @returns A JSON array containing all deployment resources of the given deployment
   */
  getResources(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "resources"));
  }
  /**
   * Retrieves a deployment resource by resource id for the given deployment.
   *
   * @param id The id of the deployment.
   * @param resourceId The id of the deployment resource.
   * @returns A JSON object corresponding to the Resource interface in the engine.
   */
  getResource(id, resourceId) {
    return this.getConfig().getHttp().get(this.createAddressByRelation(id, resourceId, "resources"));
  }
  /**
   * Retrieves the binary content of a deployment resource for the given deployment by id.
   *
   * @param id The id of the deployment.
   * @param resourceId The id of the deployment resource.
   * @returns Byte Stream.
   */
  getBinaryResource(id, resourceId) {
    const address = this.createAddressByRelation(id, resourceId, "resources") + "/data";
    return this.getConfig().getHttp().get(address);
  }
  /**
   * Retrieves list of registered deployment IDs.
   * @returns A JSON array of strings containing the IDs of registered deployments for the application.
   */
  getRegisteredDeployments() {
    const address = this.getBaseAddress() + "/registered";
    return this.getConfig().getHttp().get(address);
  }
};
__publicField(_DeploymentService, "instance");
let DeploymentService = _DeploymentService;
const _ProcessDefinitionService = class _ProcessDefinitionService extends BpmnQueryService {
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
  /**
   * Retrieves runtime statistics of a given process definition, grouped by activities.
   * These statistics include the number of running activity instances, optionally the number of failed jobs and also optionally the number
   * of incidents either grouped by incident types or for a specific incident type.
   *
   * Note: This does not include historic data.
   *
   * @param path
   * @param query
   * @returns
   */
  getActivityInstanceStatistics(path, params) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "statistics"), params);
  }
  /**
   * For the given process, returns a list of called process definitions corresponding to the CalledProcessDefinition interface in the engine.
   * The list contains all process definitions that are referenced statically by call activities in the given process.
   * This endpoint does not resolve process definitions that are referenced with expressions.
   * Each called process definition contains a list of call activity ids, which specifies the call activities that are calling that process.
   * This endpoint does not resolve references to case definitions.\
   *
   * @param id The id of the process definition.
   * @returns A JSON Array of objects corresponding to the CalledProcessDefinition interface in the engine. The Array can be empty, if the endpoint cannot resolve the called process(es) because the reference is an expression which is resolved by the engine during runtime of the calling process
   */
  getStaticCalledProcessDefinitions(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "static-called-process-definitions"));
  }
  /**
   * Retrieves the diagram of a process definition.
   *
   * If the process definition’s deployment contains an image resource with the same file name as the process definition, the deployed image
   * will be returned by the Get Diagram endpoint.
   *
   * Example: someProcess.bpmn and someProcess.png. Supported file extentions for the image are: svg, png, jpg, and gif.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns The image diagram of this process.
   */
  getDiagram(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "diagram"));
  }
  /**
   * Retrieves the start form variables for a process definition (only if they are defined via the Generated Task Form approach).
   * The start form variables take form data specified on the start event into account.
   * If form fields are defined, the variable types and default values of the form fields are taken into account.
   *
   * @param path {@link BpmnUnionPathParams}
   * @param params {@link StartFormVariablesQueryParams}
   * @returns A JSON object containing a property for each variable returned. The key is the variable name, the value is a JSON object with the following properties:
   */
  getStartFormVariables(path, params) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "form-variables"), params);
  }
  /**
   * Retrieves the rendered form for a process definition. This method can be used for getting the HTML rendering of a Generated Task Form.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns An HTML response body providing the rendered (generated) form content.
   */
  getRenderedFormStartForm(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "rendered-form"));
  }
  /**
   * Retrieves the key of the start form for a process definition. The form key corresponds to the FormData#formKey property in the engine.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns A JSON object containing the form key.
   */
  getStartFormKey(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "startForm"));
  }
  /**
   * Retrieves runtime statistics of the process engine, grouped by process definitions.
   * These statistics include the number of running process instances, optionally the number of failed jobs and also optionally the number
   * of incidents either grouped by incident types or for a specific incident type.
   *
   * Note: This does not include historic data.
   *
   * @param params {@link ProcessInstanceStatisticsQueryParams}
   * @returns A JSON array containing statistics results per process definition
   */
  getProcessInstanceStatistics(params) {
    const address = this.getBaseAddress() + "/statistics";
    return this.getConfig().getHttp().get(address, params);
  }
  /**
   * Retrieves the BPMN 2.0 XML of a process definition.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns A JSON object containing the id of the definition and the BPMN 2.0 XML.
   */
  getXml(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "xml"));
  }
  /**
   * Retrieves a process definition according to the ProcessDefinition interface in the engine.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns A JSON object corresponding to the ProcessDefinition interface in the engine
   */
  getByPathParams(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path));
  }
  /**
   * Instantiates a given process definition. Process variables and business key may be supplied in the request body.
   *
   * @param path {@link BpmnUnionPathParams}
   * @param data {@link StartInstanceRequestBody}
   * @returns A JSON object representing the newly created process instance
   */
  start(path, data) {
    return this.getConfig().getHttp().post(this.createAddressByParam(path, "start"), data);
  }
  /**
   * Starts a process instance using a set of process variables and the business key.
   * If the start event has Form Field Metadata defined, the process engine will perform backend validation for any form fields which have
   * validators defined. See Documentation on Generated Task Forms.
   *
   * @param path {@link BpmnUnionPathParams}
   * @param data {@link SubmitStartFormRequestBody}
   * @returns A JSON object corresponding to the ProcessInstance interface in the engine
   */
  submitStartForm(path, data) {
    return this.getConfig().getHttp().post(this.createAddressByParam(path, "submit-form"), data);
  }
  /**
   * Activates or suspends a given process definition by id or by latest version of process definition key.
   *
   * @param path {@link BpmnUnionPathParams}
   * @param data {@link ActivateOrSuspendedByIdRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendById(path, data) {
    return this.getConfig().getHttp().put(this.createAddressByParam(path, "suspended"), data);
  }
  /**
   * Activates or suspends process definitions with the given process definition key.
   *
   * @param data {@link ActivateOrSuspendedByKeyRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendByKey(data) {
    const address = this.getBaseAddress() + "/suspended";
    return this.getConfig().getHttp().put(address, data);
  }
  /**
   * Updates history time to live for process definition. The field is used within History cleanup.
   *
   * @param path {@link BpmnUnionPathParams}
   * @param data {@link UpdateHistoryTimeToLiveRequestBody}
   * @returns This method returns no content.
   */
  updateHistoryTimeToLive(path, data) {
    return this.getConfig().getHttp().put(this.createAddressByParam(path, "history-time-to-live"), data);
  }
  /**
   * Deletes process definitions by a given key.
   *
   * @param key The key of the process definitions to be deleted.
   * @param tenantId The id of the tenant the process definitions belong to.
   * @param params {@link ProcessDefinitionDeleteQueryParams}
   * @returns This method returns no content.
   */
  deleteByKey(key, tenantId = "", params) {
    return this.getConfig().getHttp().deleteWithParams(this.createAddressByParam({ key, tenantId }, "delete"), params);
  }
  /**
   * Retrieves the deployed form that can be referenced from a start event. For further information please refer to User Guide.
   *
   * @param path {@link BpmnUnionPathParams}
   * @returns An object with the deployed start form content.
   */
  getDeployedStartForm(path) {
    return this.getConfig().getHttp().get(this.createAddressByParam(path, "deployed-start-form"));
  }
  /**
   * Restarts process instances that were canceled or terminated synchronously.
   * Can also restart completed process instances. It will create a new instance using the original instance information.
   * To execute the restart asynchronously, use the Restart Process Instance Async method.
   *
   * @param id The id of the process definition of the process instances to restart.
   * @param data {@link RestartProcessInstanceRequestBody}
   * @returns This method returns no content.
   */
  restartProcessInstance(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "restart"), data);
  }
  /**
   * Restarts process instances that were canceled or terminated asynchronously.
   * Can also restart completed process instances. It will create a new instance using the original instance information.
   * To execute the restart synchronously, use the Restart Process Instance method.
   *
   * @param id The id of the process definition of the process instances to restart.
   * @param data {@link RestartProcessInstanceRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  restartAsync(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "restart-async"), data);
  }
};
__publicField(_ProcessDefinitionService, "instance");
let ProcessDefinitionService = _ProcessDefinitionService;
const _ProcessInstanceService = class _ProcessInstanceService extends BaseBpmnService {
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
  /**
   * Retrieves an Activity Instance (Tree) for a given process instance by id.
   *
   * @param id The id of the process instance for which the activity instance should be retrieved.
   * @returns A JSON object corresponding to the Activity Instance tree of the given process instance.
   */
  getActivityInstance(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "activity-instances"));
  }
  /**
   * Submits a list of modification instructions to change a process instance's execution state.
   * A modification instruction is one of the following:
   * · Starting execution before an activity
   * · Starting execution after an activity on its single outgoing sequence flow
   * · Starting execution on a specific sequence flow
   * · Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   * Instructions are executed immediately and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * @param id The id of the process instance to modify.
   * @param data {@link ModifyRequestBody}
   * @returns This method returns no content.
   */
  modify(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "modification"), data);
  }
  /**
   * Submits a list of modification instructions to change a process instance's execution state async.
   * A modification instruction is one of the following:
   * · Starting execution before an activity
   * · Starting execution after an activity on its single outgoing sequence flow
   * · Starting execution on a specific sequence flow
   * · Cancelling an activity instance, transition instance, or all instances (activity or transition) for an activity
   * Instructions are executed asynchronous and in the order they are provided in this request's body.
   * Variables can be provided with every starting instruction.
   *
   * @param id The id of the process instance to modify.
   * @param data {@link ModifyRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  modifyAsync(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "modification-async"), data);
  }
  /**
   * Deletes multiple process instances asynchronously (batch).
   *
   * @param data {@link DeleteAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  deleteAsync(data) {
    const address = this.getBaseAddress() + "/delete";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Deletes a set of process instances asynchronously (batch) based on a historic process instance query.
   *
   * @param data {@link DeleteAsyncHistoricQueryBasedRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  deleteAsyncHistoricQueryBased(data) {
    const address = this.getBaseAddress() + "/delete-historic-query-based";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Create a batch to set retries of jobs associated with given processes asynchronously.
   *
   * @param data {@link SetJobRetriesAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  setJobRetriesAsync(data) {
    const address = this.getBaseAddress() + "/job-retries";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Create a batch to set retries of jobs asynchronously based on a historic process instance query.
   *
   * @param data {@link SetJobRetriesAsyncHistoricQueryBasedRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  setJobRetriesAsyncHistoricQueryBased(data) {
    const address = this.getBaseAddress() + "/job-retries-historic-query-based";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Update or create runtime process variables in the root scope of process instances.
   *
   * @param data {@link SetVariablesAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  setVariablesAsync(data) {
    const address = this.getBaseAddress() + "variables-async";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Correlates a message asynchronously to executions that are waiting for this message. Messages will not be correlated to
   * process definition-level start message events to start process instances.
   *
   * @param data {@link CorrelateMessageAsyncRequestBody}
   * @returns A JSON object corresponding to the Batch interface in the engine.
   */
  correlateMessageAsync(data) {
    const address = this.getBaseAddress() + "message-async";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Activates or suspends a given process instance by id.
   *
   * @param id The id of the process instance to activate or suspend.
   * @param data {@link ActivateOrSuspendByIdRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendById(id, data) {
    return this.getConfig().getHttp().put(this.createAddressById(id, "suspended"), data);
  }
  /**
   * Activates or suspends process instances with the given process definition id.
   *
   * @param data {@link ActivateOrSuspendByProcessDefinitionIdRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendByProcessDefinitionId(data) {
    const address = this.getBaseAddress() + "/suspended";
    return this.getConfig().getHttp().put(address, data);
  }
  /**
   * Activates or suspends process instances with the given process definition key.
   *
   * @param data {@link ActivateOrSuspendByProcessDefinitionKeyRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendByProcessDefinitionKey(data) {
    const address = this.getBaseAddress() + "/suspended";
    return this.getConfig().getHttp().put(address, data);
  }
  /**
   * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
   * and/or a historical process instance query
   *
   * @param data {@link ActivateOrSuspendInRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendInGroup(data) {
    const address = this.getBaseAddress() + "suspended-async";
    return this.getConfig().getHttp().post(address, data);
  }
  /**
   * Activates or suspends process instances synchronously with a list of process instance ids, a process instance query,
   * and/or a historical process instance query
   *
   * @param data {@link ActivateOrSuspendInGroupRequestBody}
   * @returns This method returns no content.
   */
  activateOrSuspendInBatch(data) {
    const address = this.getBaseAddress() + "suspended-async";
    return this.getConfig().getHttp().post(address, data);
  }
};
__publicField(_ProcessInstanceService, "instance");
let ProcessInstanceService = _ProcessInstanceService;
const _TaskService = class _TaskService extends BaseBpmnService {
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
  /**
   * Retrieves the form key for a task. The form key corresponds to the FormData#formKey property in the engine.
   * This key can be used to do task-specific form rendering in client applications.
   * Additionally, the context path of the containing process application is returned.
   *
   * @param id The id of the task
   * @returns A JSON object containing the form key.
   */
  getFormKey(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "form"));
  }
  /**
   * Claims a task for a specific user.
   * Note: The difference with the Set Assignee method is that here a check is performed to see if the task already has a user assigned to it.
   *
   * @param id The id of the task
   * @param data {@link ClaimRequestBody}
   * @returns This method returns no content.
   */
  claim(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "claim"), data);
  }
  /**
   * Resets a task’s assignee. If successful, the task is not assigned to a user.
   *
   * @param id The id of the task
   * @returns This method returns no content.
   */
  unclaim(id) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "unclaim"), {});
  }
  /**
   * Completes a task and updates process variables.
   *
   * @param id The id of the task
   * @param data {@link CompleteRequestBody}
   * @returns This method returns no content.
   */
  complete(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "complete"), data);
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
  submitForm(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "submit-form"), data);
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
  resolve(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "resolve"), data);
  }
  /**
   * Changes the assignee of a task to a specific user.
   * Note: The difference with the Claim Task method is that this method does not check if the task already has a user assigned to it.
   *
   * @param id The id of the task
   * @param data {@link SetAssigneeRequestBody}
   * @returns This method returns no content.
   */
  setAssignee(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "assignee"), data);
  }
  /**
   * Delegates a task to another user.
   *
   * @param id The id of the task
   * @param data {@link DelegateRequestBody}
   * @returns This method returns no content.
   */
  delegate(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "delegate"), data);
  }
  /**
   * Retrieves the deployed form that is referenced from a given task. For further information please refer to User Guide.
   *
   * @param id The id of the task
   * @returns An object with the deployed form content.
   */
  getDeployedForm(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "deployed-form"));
  }
  /**
   * Retrieves the rendered form for a task. This method can be used to get the HTML rendering of a Generated  Form.
   *
   * @param id The id of the task
   * @returns An object with the deployed form content.
   */
  getRenderedForm(id) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "rendered-form"));
  }
  /**
   * Retrieves the form variables for a task. The form variables take form data specified on the task into account.
   * If form fields are defined, the variable types and default values of the form fields are taken into account.
   *
   * @param id The id of the task
   * @param param {@link FormVariablesQueryParams}
   * @returns {@link VariableValue}
   */
  getTaskFormVariables(id, param) {
    return this.getConfig().getHttp().get(this.createAddressById(id, "form-variables"), param);
  }
  /**
   * Creates a new task.
   *
   * @param data {@link CreateRequestBody}
   * @returns This method returns no content
   */
  create(data) {
    return this.getConfig().getHttp().post(this.getCreateAddress(), data);
  }
  /**
   * Updates a task.
   *
   * @param id The id of the task
   * @param data {@link UpdateRequestBody}
   * @returns This method returns no content
   */
  update(id, data) {
    return this.getConfig().getHttp().put(this.createAddressById(id), data);
  }
  /**
   * Reports a business error in the context of a running task by id.
   * The error code must be specified to identify the BPMN error handler. See the documentation for Reporting Bpmn Error in User s.
   *
   * @param id The id of the task
   * @param data {@link BpmnErrorRequestBody}
   * @returns This method returns no content
   */
  handleBpmnError(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "bpmnError"), data);
  }
  /**
   * Reports an escalation in the context of a running task by id.
   * The escalation code must be specified to identify the escalation handler. See the documentation for Reporting Bpmn Escalation in User s.
   *
   * @param id The id of the task
   * @param data {@link BpmnEscalationRequestBody}
   * @returns This method returns no content
   */
  handleBpmnEscalation(id, data) {
    return this.getConfig().getHttp().post(this.createAddressById(id, "bpmnEscalation"), data);
  }
};
__publicField(_TaskService, "instance");
let TaskService = _TaskService;
const _HistoryActivityInstanceService = class _HistoryActivityInstanceService extends BpmnQueryByPostService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _HistoryActivityInstanceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/history/activity-instance";
  }
};
__publicField(_HistoryActivityInstanceService, "instance");
let HistoryActivityInstanceService = _HistoryActivityInstanceService;
const _HistoryProcessInstanceService = class _HistoryProcessInstanceService extends BpmnQueryByPostService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _HistoryProcessInstanceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/history/process-instance";
  }
};
__publicField(_HistoryProcessInstanceService, "instance");
let HistoryProcessInstanceService = _HistoryProcessInstanceService;
const _HistoryTaskService = class _HistoryTaskService extends BpmnQueryByPostService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _HistoryTaskService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/history/task";
  }
};
__publicField(_HistoryTaskService, "instance");
let HistoryTaskService = _HistoryTaskService;
const _GroupService = class _GroupService extends BaseBpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _GroupService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/group";
  }
  getCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
  /**
   * Creates a new group.
   *
   * @param data {@link GroupCreateRequestBody}
   * @returns This method returns no content
   */
  create(data) {
    return this.getConfig().getHttp().post(this.getCreateAddress(), data);
  }
  /**
   * Updates a group.
   *
   * @param data {@link GroupUpdateRequestBody}
   * @returns This method returns no content
   */
  update(id, data) {
    return this.getConfig().getHttp().put(this.createAddressById(id), data);
  }
};
__publicField(_GroupService, "instance");
let GroupService = _GroupService;
const _GroupMemberService = class _GroupMemberService extends BpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _GroupMemberService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/group";
  }
  getRelationAddress(groupId, userId = "") {
    return this.createAddressByRelation(groupId, userId, "members");
  }
  /**
   * Adds a member to a group.
   *
   * @param groupId
   * @param userId
   * @returns This method returns no content
   */
  create(groupId, userId) {
    return this.getConfig().getHttp().put(this.getRelationAddress(groupId, userId), "");
  }
  /**
   * Removes a member from a group.
   *
   * @param groupId
   * @param userId
   * @returns This method returns no content
   */
  deleteByRelation(groupId, userId) {
    return this.getConfig().getHttp().delete(this.getRelationAddress(groupId, userId));
  }
};
__publicField(_GroupMemberService, "instance");
let GroupMemberService = _GroupMemberService;
const _TenantService = class _TenantService extends BpmnQueryService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _TenantService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/tenant";
  }
  getCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
  /**
   * Create a new tenant.
   *
   * @param data {@link TenantCreateRequestBody}
   * @returns This method returns no content
   */
  createTenant(data) {
    return this.getConfig().getHttp().post(this.getCreateAddress(), data);
  }
  /**
   * Updates a tenant.
   *
   * @param data {@link TenantUpdateRequestBody}
   * @returns This method returns no content
   */
  update(id, data) {
    return this.getConfig().getHttp().put(this.createAddressById(id), data);
  }
};
__publicField(_TenantService, "instance");
let TenantService = _TenantService;
const _TenantUserService = class _TenantUserService extends BpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _TenantUserService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/tenant";
  }
  getRelationAddress(tenantId, userId = "") {
    return this.createAddressByRelation(tenantId, userId, "user-members");
  }
  /**
   * Adds a member to a group.
   *
   * @param tenantId
   * @param userId
   * @returns This method returns no content
   */
  create(tenantId, userId) {
    return this.getConfig().getHttp().put(this.getRelationAddress(tenantId, userId), "");
  }
  /**
   * Removes a member from a group.
   *
   * @param tenantId
   * @param userId
   * @returns This method returns no content
   */
  deleteByRelation(tenantId, userId) {
    return this.getConfig().getHttp().delete(this.getRelationAddress(tenantId, userId));
  }
};
__publicField(_TenantUserService, "instance");
let TenantUserService = _TenantUserService;
const _TenantGroupService = class _TenantGroupService extends BpmnService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _TenantGroupService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/tenant";
  }
  getRelationAddress(tenantId, groupId = "") {
    return this.createAddressByRelation(tenantId, groupId, "group-members");
  }
  /**
   * Adds a member to a group.
   *
   * @param tenantId
   * @param groupId
   * @returns This method returns no content
   */
  create(tenantId, groupId) {
    return this.getConfig().getHttp().put(this.getRelationAddress(tenantId, groupId), "");
  }
  /**
   * Removes a member from a group.
   *
   * @param tenantId
   * @param groupId
   * @returns This method returns no content
   */
  deleteByRelation(tenantId, groupId) {
    return this.getConfig().getHttp().delete(this.getRelationAddress(tenantId, groupId));
  }
};
__publicField(_TenantGroupService, "instance");
let TenantGroupService = _TenantGroupService;
const _UserService = class _UserService extends BpmnQueryByGetService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _UserService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn() + "/user";
  }
  getCreateAddress() {
    return this.getBaseAddress() + "/create";
  }
};
__publicField(_UserService, "instance");
let UserService = _UserService;
const _BpmnApiResources = class _BpmnApiResources {
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
  historyActivityInstance() {
    return HistoryActivityInstanceService.getInstance(this.config);
  }
  historyProcessInstance() {
    return HistoryProcessInstanceService.getInstance(this.config);
  }
  historyTask() {
    return HistoryTaskService.getInstance(this.config);
  }
  group() {
    return GroupService.getInstance(this.config);
  }
  groupMember() {
    return GroupMemberService.getInstance(this.config);
  }
  tenant() {
    return TenantService.getInstance(this.config);
  }
  tenantUser() {
    return TenantUserService.getInstance(this.config);
  }
  tenantGroup() {
    return TenantGroupService.getInstance(this.config);
  }
  user() {
    return UserService.getInstance(this.config);
  }
};
__publicField(_BpmnApiResources, "instance");
let BpmnApiResources = _BpmnApiResources;
const createBpmnApi = (project, clientId, clientSecret, http) => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return BpmnApiResources.getInstance(config);
};
export {
  Axios,
  BaseBpmnService,
  BpmnQueryByGetService,
  BpmnQueryByPostService,
  BpmnQueryService,
  BpmnService,
  ContentTypeEnum2 as ContentTypeEnum,
  DeploymentService,
  GroupMemberService,
  GroupService,
  HistoryActivityInstanceService,
  HistoryProcessInstanceService,
  HistoryTaskService,
  HttpConfig2 as HttpConfig,
  ProcessDefinitionService,
  ProcessInstanceService,
  RelationPathParamBuilder,
  Service2 as Service,
  TaskService,
  TenantGroupService,
  TenantService,
  TenantUserService,
  UnionPathParamBuilder,
  UserService,
  createBpmnApi,
  lodash2 as lodash,
  moment2 as moment
};
