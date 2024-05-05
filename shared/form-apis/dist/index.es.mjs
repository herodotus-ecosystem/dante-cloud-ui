var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Service, lodash, HttpConfig } from "@herodotus/core";
import { Axios, Base64, HttpConfig as HttpConfig2, Service as Service2, lodash as lodash2, moment } from "@herodotus/core";
class BaseMongoService extends Service {
  getConditionAddress() {
    return this.getBaseAddress() + "/condition";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  fetchByPage(params, others = {}) {
    if (lodash.isEmpty(others)) {
      return this.getConfig().getHttp().get(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig().getHttp().get(this.getConditionAddress(), fullParams);
    }
  }
  fetchAll(params = {}) {
    return this.getConfig().getHttp().get(this.getListAddress(), params);
  }
  fetchById(id) {
    return this.getConfig().getHttp().get(this.getIdPath(id));
  }
  saveOrUpdate(data) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), data);
  }
  delete(id) {
    return this.getConfig().getHttp().delete(this.getIdPath(id));
  }
}
const _DynamicFormService = class _DynamicFormService extends BaseMongoService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _DynamicFormService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/dynamic-form";
  }
};
__publicField(_DynamicFormService, "instance");
let DynamicFormService = _DynamicFormService;
const _ProcessCommentsService = class _ProcessCommentsService extends BaseMongoService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ProcessCommentsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/process-comments";
  }
};
__publicField(_ProcessCommentsService, "instance");
let ProcessCommentsService = _ProcessCommentsService;
const _ProcessSpecificsService = class _ProcessSpecificsService extends BaseMongoService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ProcessSpecificsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/process-specifics";
  }
};
__publicField(_ProcessSpecificsService, "instance");
let ProcessSpecificsService = _ProcessSpecificsService;
const _FormApiResources = class _FormApiResources {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _FormApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  dynamicForm() {
    return DynamicFormService.getInstance(this.config);
  }
  processComments() {
    return ProcessCommentsService.getInstance(this.config);
  }
  processSpecifics() {
    return ProcessSpecificsService.getInstance(this.config);
  }
};
__publicField(_FormApiResources, "instance");
let FormApiResources = _FormApiResources;
const createFormApi = (project, clientId, clientSecret, http) => {
  const config = new HttpConfig(project, clientId, clientSecret, http);
  return FormApiResources.getInstance(config);
};
export {
  Axios,
  Base64,
  BaseMongoService,
  DynamicFormService,
  HttpConfig2 as HttpConfig,
  ProcessCommentsService,
  ProcessSpecificsService,
  Service2 as Service,
  createFormApi,
  lodash2 as lodash,
  moment
};
