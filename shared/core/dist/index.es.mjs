import axios from "axios";
import qs from "qs";
import * as lodash from "lodash-es";
import { isFunction, isEmpty } from "lodash-es";
import { generateFromString } from "generate-avatar";
import { sm2, sm4 } from "sm-crypto";
import { Base64 } from "js-base64";
import Swal from "sweetalert2";
import { default as default2 } from "sweetalert2";
import moment from "moment";
import { default as default3 } from "moment";
import "moment/dist/locale/zh-cn";
var ContentTypeEnum = /* @__PURE__ */ ((ContentTypeEnum2) => {
  ContentTypeEnum2[ContentTypeEnum2["URL_ENCODED"] = 0] = "URL_ENCODED";
  ContentTypeEnum2[ContentTypeEnum2["MULTI_PART"] = 1] = "MULTI_PART";
  ContentTypeEnum2[ContentTypeEnum2["TEXT"] = 2] = "TEXT";
  ContentTypeEnum2[ContentTypeEnum2["JSON"] = 3] = "JSON";
  return ContentTypeEnum2;
})(ContentTypeEnum || {});
var HttpMethodEnum = /* @__PURE__ */ ((HttpMethodEnum2) => {
  HttpMethodEnum2["GET"] = "GET";
  HttpMethodEnum2["POST"] = "POST";
  HttpMethodEnum2["PUT"] = "PUT";
  HttpMethodEnum2["DELETE"] = "DELETE";
  return HttpMethodEnum2;
})(HttpMethodEnum || {});
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2[StatusEnum2["FORBIDDEN"] = 0] = "FORBIDDEN";
  StatusEnum2[StatusEnum2["ENABLE"] = 1] = "ENABLE";
  StatusEnum2[StatusEnum2["LOCKING"] = 2] = "LOCKING";
  StatusEnum2[StatusEnum2["EXPIRED"] = 3] = "EXPIRED";
  return StatusEnum2;
})(StatusEnum || {});
let pendingMap = /* @__PURE__ */ new Map();
const getPendingUrl = (config) => [config.method, config.url].join("&");
class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel);
      }
    });
  }
  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  /**
   * @description: reset
   */
  reset() {
    pendingMap = /* @__PURE__ */ new Map();
  }
}
class Axios {
  axiosInstance;
  axiosConfig;
  axiosTransform;
  defaultRequestOptions;
  constructor(config, transform, options) {
    this.axiosConfig = config;
    this.axiosTransform = transform;
    this.defaultRequestOptions = options;
    this.axiosInstance = this.createAxiosInstance(config);
    this.setupInterceptors();
  }
  createAxiosInstance(config) {
    return axios.create(config);
  }
  getAxiosConfig() {
    return this.axiosConfig;
  }
  getAxiosTransform() {
    return this.axiosTransform;
  }
  getAxiosInstance() {
    return this.axiosInstance;
  }
  getDefaultRequestOptions() {
    return this.defaultRequestOptions;
  }
  getPolicy(contentType) {
    switch (contentType) {
      case ContentTypeEnum.URL_ENCODED:
        return {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          dataConvert: (data) => {
            return qs.stringify(data, { arrayFormat: "brackets" });
          }
        };
      case ContentTypeEnum.MULTI_PART:
        return {
          headers: { "Content-Type": "multipart/form-data" },
          dataConvert: (data) => {
            return data;
          }
        };
      default:
        return {
          headers: { "Content-Type": "application/json" },
          dataConvert: (data) => {
            return JSON.stringify(data);
          }
        };
    }
  }
  setupInterceptors() {
    const transform = this.getAxiosTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;
    const axiosCanceler = new AxiosCanceler();
    this.getAxiosInstance().interceptors.request.use(
      (config) => {
        const { prohibitRepeatRequests } = this.getDefaultRequestOptions();
        if (prohibitRepeatRequests) {
          axiosCanceler.addPending(config);
        }
        return requestInterceptors(config);
      },
      (error) => {
        return requestInterceptorsCatch(this.getAxiosInstance(), error);
      }
    );
    this.getAxiosInstance().interceptors.response.use(
      (response) => {
        response && axiosCanceler.removePending(response.config);
        return responseInterceptors(response);
      },
      (error) => {
        return responseInterceptorsCatch(this.getAxiosInstance(), error);
      }
    );
  }
  /**
   * 把当前请求的 options 与全局 options 整合获得一个完整的 options
   */
  mergeRequestOptions(options) {
    const requestOptions = this.getDefaultRequestOptions();
    if (!isEmpty(options)) {
      return Object.assign({}, requestOptions, options);
    } else {
      return requestOptions;
    }
  }
  /**
   * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
   */
  mergeRequestConfigs(config) {
    const axiosConfig = this.getAxiosConfig();
    const paramsSerializer = {
      serialize(params) {
        return Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
      }
    };
    const requestConfigs = Object.assign({ paramsSerializer }, axiosConfig);
    if (config) {
      return Object.assign({}, requestConfigs, config);
    } else {
      return requestConfigs;
    }
  }
  setupPolicy(url, options, config) {
    const { beforeRequestHook } = this.getAxiosTransform();
    const requestOptions = this.mergeRequestOptions(options);
    let axiosRequestConfig = this.mergeRequestConfigs(config);
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      axiosRequestConfig = beforeRequestHook(axiosRequestConfig, requestOptions);
    }
    const contentType = requestOptions.contentType;
    const policy = this.getPolicy(contentType);
    if (axiosRequestConfig.headers) {
      axiosRequestConfig.headers = Object.assign(axiosRequestConfig.headers, policy.headers);
    } else {
      axiosRequestConfig.headers = policy.headers;
    }
    axiosRequestConfig.url = url;
    if (!isEmpty(axiosRequestConfig.data)) {
      axiosRequestConfig.data = policy.dataConvert(axiosRequestConfig.data);
    }
    return {
      config: axiosRequestConfig,
      options: requestOptions,
      dataConvert: policy.dataConvert
    };
  }
  get(url, params = {}, options = { contentType: ContentTypeEnum.JSON }) {
    let policy = this.setupPolicy(url, options, { params, method: HttpMethodEnum.GET });
    return this.request(policy.config, policy.options);
  }
  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  post(url, data, options = { contentType: ContentTypeEnum.JSON }, config) {
    let policy = this.setupPolicy(url, options, {
      ...config,
      data,
      method: HttpMethodEnum.POST
    });
    return this.request(policy.config, policy.options);
  }
  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  postWithParams(url, params = {}, data = {}, options = { contentType: ContentTypeEnum.JSON }, config) {
    let policy = this.setupPolicy(url, options, {
      ...config,
      params,
      data,
      method: HttpMethodEnum.POST
    });
    return this.request(policy.config, policy.options);
  }
  /**
   * 更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  put(url, data, options = { contentType: ContentTypeEnum.JSON }, config) {
    let policy = this.setupPolicy(url, options, { ...config, data, method: HttpMethodEnum.PUT });
    return this.request(policy.config, policy.options);
  }
  /**
   * 更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  putWithParams(url, params = {}, data = {}, options = { contentType: ContentTypeEnum.JSON }, config) {
    let policy = this.setupPolicy(url, options, {
      ...config,
      params,
      data,
      method: HttpMethodEnum.PUT
    });
    return this.request(policy.config, policy.options);
  }
  /**
   * 删除操作
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  delete(url, data = {}, options = { contentType: ContentTypeEnum.JSON }) {
    let policy = this.setupPolicy(url, options, { data, method: HttpMethodEnum.DELETE });
    return this.request(policy.config, policy.options);
  }
  /**
   * 删除操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  deleteWithParams(url, params = {}, data = {}, options = { contentType: ContentTypeEnum.JSON }) {
    let policy = this.setupPolicy(url, options, { params, data, method: HttpMethodEnum.DELETE });
    return this.request(policy.config, policy.options);
  }
  /**
   * 请求核心方法
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  request(config, options) {
    return new Promise((resolve, reject) => {
      const { requestCatchHook, transformRequestHook } = this.getAxiosTransform();
      this.getAxiosInstance().request(config).then((response) => {
        if (transformRequestHook && isFunction(transformRequestHook)) {
          const result = transformRequestHook(response, options);
          resolve(result);
        } else {
          resolve(response);
        }
      }).catch((error) => {
        if (requestCatchHook && isFunction(requestCatchHook)) {
          reject(requestCatchHook(error, options));
        } else {
          reject(error);
        }
      });
    });
  }
}
const parseResponseStatus = (response, message) => {
  const data = response.data;
  const responseStatus = {};
  responseStatus.status = response.status;
  responseStatus.code = response.data && response.data.code ? response.data.code : 0;
  responseStatus.detail = data.error && data.error.detail ? data.error.detail : "";
  if (data.message) {
    responseStatus.message = data.message;
  } else {
    if (data.error && data.error.message) {
      responseStatus.message = data.error.message;
    } else {
      if (message) {
        responseStatus.message = message;
      }
    }
  }
  return responseStatus;
};
class AvatarUtilities {
  static instance = new AvatarUtilities();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  generate(id) {
    return `data:image/svg+xml;utf8,${generateFromString(id)}`;
  }
}
const AvatarUtils = AvatarUtilities.getInstance();
class SM2Utilities {
  static instance = new SM2Utilities();
  cipherMode = 1;
  // 1 - C1C3C2，0 - C1C2C3
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  createKeyPair() {
    return sm2.generateKeyPairHex();
  }
  encrypt(content, publicKey) {
    return "04" + sm2.doEncrypt(content, publicKey, this.cipherMode);
  }
  decrypt(content, privateKey) {
    let data = content.substring(2).toLocaleLowerCase();
    return sm2.doDecrypt(data, privateKey, this.cipherMode);
  }
}
class SM4Utilities {
  static instance = new SM4Utilities();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  encrypt(content, publicKey) {
    return sm4.encrypt(content, publicKey);
  }
  decrypt(content, privateKey) {
    return sm4.decrypt(content, privateKey);
  }
}
const SM2Utils = SM2Utilities.getInstance();
const SM4Utils = SM4Utilities.getInstance();
const SwalToast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2e3,
  timerProgressBar: false,
  didOpen: (toast2) => {
    toast2.addEventListener("mouseenter", Swal.stopTimer);
    toast2.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
const standardDeleteNotify = (onConfirm, onCancel) => {
  Swal.fire({
    title: "确定删除?",
    text: "您将无法恢复此操作！",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "是的, 删除!",
    cancelButtonText: "取消"
  }).then((confirm) => {
    if (confirm.value) {
      onConfirm();
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  });
};
class Notify {
  static instance = new Notify();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, text, icon) {
    return Swal.fire({
      title,
      text,
      position: "top",
      icon,
      timer: 5e3,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__fadeIn"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut"
      }
    });
  }
  info(title, text = "") {
    return this.information(title, text, "info");
  }
  error(title, text = "") {
    return this.information(title, text, "error");
  }
  warning(title, text = "") {
    return this.information(title, text, "warning");
  }
  success(title, text = "") {
    return this.information(title, text, "success");
  }
  question(title, text = "") {
    return this.information(title, text, "question");
  }
}
const notify = Notify.getInstance();
class Toast {
  static instance = new Toast();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, icon) {
    return SwalToast.fire({
      icon,
      title
    });
  }
  info(text) {
    return this.information(text, "info");
  }
  error(text) {
    return this.information(text, "error");
  }
  warning(text) {
    return this.information(text, "warning");
  }
  success(text) {
    return this.information(text, "success");
  }
  question(text) {
    return this.information(text, "question");
  }
}
const toast = Toast.getInstance();
moment.locale("zh-cn");
class HttpConfig {
  http = {};
  project = "";
  clientId = "";
  clientSecret = "";
  oidc = false;
  uaaAddress = "";
  upmsAddress = "";
  msgAddress = "";
  ossAddress = "";
  bpmnAddress = "";
  cmdbAddress = "";
  proxy = "";
  constructor(project, clientId, clientSecret, http, oidc = false, proxy = "/api") {
    this.project = project;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.http = http;
    this.oidc = oidc;
    this.proxy = proxy;
    this.switch(project);
  }
  switch(type) {
    switch (type) {
      case "dante":
        this.uaaAddress = "/dante-cloud-uaa";
        this.upmsAddress = "/dante-cloud-upms";
        this.msgAddress = "/dante-cloud-message";
        this.ossAddress = "/dante-cloud-oss-ability";
        this.bpmnAddress = "/dante-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/dante-cloud-cmdb-ability";
        break;
      case "herodotus":
        this.uaaAddress = "/herodotus-cloud-uaa";
        this.upmsAddress = "/herodotus-cloud-upms";
        this.msgAddress = "/herodotus-cloud-message";
        this.ossAddress = "/herodotus-cloud-oss-ability";
        this.bpmnAddress = "/herodotus-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/herodotus-cloud-cmdb-ability";
        break;
      default:
        this.uaaAddress = "";
        this.upmsAddress = "";
        this.msgAddress = "";
        this.ossAddress = "";
        this.bpmnAddress = "/engine-rest";
        this.cmdbAddress = "";
    }
  }
  getProject() {
    return this.project;
  }
  getClientSecret() {
    return this.clientSecret;
  }
  getClientId() {
    return this.clientId;
  }
  isOidc() {
    return this.oidc;
  }
  getProxy() {
    return this.proxy;
  }
  getHttp() {
    return this.http;
  }
  processProxy(content, withProxy = true) {
    if (withProxy) {
      return this.proxy + content;
    } else {
      return content;
    }
  }
  getUaa(withProxy = true) {
    return this.processProxy(this.uaaAddress, withProxy);
  }
  getUpms(withProxy = true) {
    return this.processProxy(this.upmsAddress, withProxy);
  }
  getMsg(withProxy = true) {
    return this.processProxy(this.msgAddress, withProxy);
  }
  getOss(withProxy = true) {
    return this.processProxy(this.ossAddress, withProxy);
  }
  getBpmn(withProxy = true, isExtended = false) {
    let result = this.processProxy(this.bpmnAddress, withProxy);
    if (isExtended) {
      return lodash.replace(result, "engine-rest", "camunda-extended");
    } else {
      return result;
    }
  }
  getCmdb(withProxy = true) {
    return this.processProxy(this.cmdbAddress, withProxy);
  }
}
class Service {
  config;
  constructor(config) {
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
  getParamPath(path, param) {
    return path + "/" + param;
  }
  getIdPath(id) {
    return this.getParamPath(this.getBaseAddress(), id);
  }
}
class BaseService extends Service {
  getConditionAddress() {
    return this.getBaseAddress() + "/condition";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  getTreeAddress() {
    return this.getBaseAddress() + "/tree";
  }
  fetch(params = {}) {
    return this.getConfig().getHttp().get(this.getBaseAddress(), params);
  }
  fetchByPage(params, others = {}) {
    if (isEmpty(others)) {
      return this.getConfig().getHttp().get(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig().getHttp().get(this.getConditionAddress(), fullParams);
    }
  }
  fetchAll(params = {}) {
    return this.getConfig().getHttp().get(this.getListAddress(), params);
  }
  fetchTree(params = {}) {
    return this.getConfig().getHttp().get(this.getTreeAddress(), params);
  }
  saveOrUpdate(data) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), data);
  }
  delete(id) {
    return this.getConfig().getHttp().delete(this.getIdPath(id));
  }
  assign(data) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
}
export {
  AvatarUtils,
  Axios,
  Base64,
  BaseService,
  ContentTypeEnum,
  HttpConfig,
  HttpMethodEnum,
  SM2Utils,
  SM4Utils,
  Service,
  StatusEnum,
  default2 as Swal,
  lodash,
  default3 as moment,
  notify,
  parseResponseStatus,
  standardDeleteNotify,
  toast
};
