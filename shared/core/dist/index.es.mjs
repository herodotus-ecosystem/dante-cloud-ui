import axios from "axios";
import qs from "qs";
import * as lodash from "lodash-es";
import { isFunction, isEmpty } from "lodash-es";
import { generateFromString } from "generate-avatar";
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
const crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes$1(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes$1(b, ...lengths) {
  if (!isBytes$1(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists$1(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function clean$1(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
const hasHexBuiltin = /* @__PURE__ */ (() => (
  // @ts-ignore
  typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function"
))();
const hexes$1 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex$2(bytes) {
  abytes$1(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes$1[bytes[i]];
  }
  return hex;
}
const asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array[ai] = n1 * 16 + n2;
  }
  return array;
}
function utf8ToBytes$1(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$2(data) {
  if (typeof data === "string")
    data = utf8ToBytes$1(data);
  abytes$1(data);
  return data;
}
function concatBytes$1(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes$1(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad);
    pad += a.length;
  }
  return res;
}
let Hash$1 = class Hash {
};
function randomBytes$1(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto && typeof crypto.randomBytes === "function") {
    return Uint8Array.from(crypto.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = /* @__PURE__ */ BigInt(0);
const _1n$3 = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function _abytes2(value, length, title = "") {
  const bytes = isBytes$1(value);
  const len = value?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function numberToHexUnpadded$1(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber$1(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$3 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber$1(bytesToHex$2(bytes));
}
function bytesToNumberLE(bytes) {
  abytes$1(bytes);
  return hexToNumber$1(bytesToHex$2(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE$1(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE$1(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes$1(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
const isPosBig = (n) => typeof n === "bigint" && _0n$3 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$3; n >>= _1n$3, len += 1)
    ;
  return len;
}
const bitMask = (n) => (_1n$3 << BigInt(n)) - _1n$3;
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  const u8n = (len) => new Uint8Array(len);
  const u8of = (byte) => Uint8Array.of(byte);
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n(0)) => {
    k = h(u8of(0), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8of(1), seed);
    v = h();
  };
  const gen = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes$1(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k, v]) => checkField(k, v, false));
  Object.entries(optFields).forEach(([k, v]) => checkField(k, v, true));
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
const bytesToHex$1 = bytesToHex$2;
const concatBytes = concatBytes$1;
const numberToHexUnpadded = numberToHexUnpadded$1;
const hexToNumber = hexToNumber$1;
const numberToBytesBE = numberToBytesBE$1;
let HMAC$1 = class HMAC extends Hash$1 {
  constructor(hash, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    ahash(hash);
    const key = toBytes$2(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    clean$1(pad);
  }
  update(buf) {
    aexists$1(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    aexists$1(this);
    abytes$1(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
const hmac$1 = (hash, key, message) => new HMAC$1(hash, key).update(message).digest();
hmac$1.create = (hash, key) => new HMAC$1(hash, key);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0), _1n$2 = BigInt(1), _2n$1 = /* @__PURE__ */ BigInt(2), _3n$1 = /* @__PURE__ */ BigInt(3);
const _4n$1 = /* @__PURE__ */ BigInt(4), _5n = /* @__PURE__ */ BigInt(5), _7n = /* @__PURE__ */ BigInt(7);
const _8n = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9), _16n = /* @__PURE__ */ BigInt(16);
function mod(a, b) {
  const result = a % b;
  return result >= _0n$2 ? result : b + result;
}
function invert(number, modulo) {
  if (number === _0n$2)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$2)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n$2, u = _1n$2;
  while (a !== _0n$2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    b = a, a = r, x = u, u = m;
  }
  const gcd = b;
  if (gcd !== _1n$2)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function assertIsSquare(Fp, root, n) {
  if (!Fp.eql(Fp.sqr(root), n))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp, n) {
  const p1div4 = (Fp.ORDER + _1n$2) / _4n$1;
  const root = Fp.pow(n, p1div4);
  assertIsSquare(Fp, root, n);
  return root;
}
function sqrt5mod8(Fp, n) {
  const p5div8 = (Fp.ORDER - _5n) / _8n;
  const n2 = Fp.mul(n, _2n$1);
  const v = Fp.pow(n2, p5div8);
  const nv = Fp.mul(n, v);
  const i = Fp.mul(Fp.mul(nv, _2n$1), v);
  const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
  assertIsSquare(Fp, root, n);
  return root;
}
function sqrt9mod16(P) {
  const Fp_ = Field(P);
  const tn = tonelliShanks(P);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P + _7n) / _16n;
  return (Fp, n) => {
    let tv1 = Fp.pow(n, c4);
    let tv2 = Fp.mul(tv1, c1);
    const tv3 = Fp.mul(tv1, c2);
    const tv4 = Fp.mul(tv1, c3);
    const e1 = Fp.eql(Fp.sqr(tv2), n);
    const e2 = Fp.eql(Fp.sqr(tv3), n);
    tv1 = Fp.cmov(tv1, tv2, e1);
    tv2 = Fp.cmov(tv4, tv3, e2);
    const e3 = Fp.eql(Fp.sqr(tv2), n);
    const root = Fp.cmov(tv1, tv2, e3);
    assertIsSquare(Fp, root, n);
    return root;
  };
}
function tonelliShanks(P) {
  if (P < _3n$1)
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n$2;
  let S = 0;
  while (Q % _2n$1 === _0n$2) {
    Q /= _2n$1;
    S++;
  }
  let Z = _2n$1;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n$2) / _2n$1;
  return function tonelliSlow(Fp, n) {
    if (Fp.is0(n))
      return n;
    if (FpLegendre(Fp, n) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp.mul(Fp.ONE, cc);
    let t = Fp.pow(n, Q);
    let R = Fp.pow(n, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i++;
        t_tmp = Fp.sqr(t_tmp);
        if (i === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$2 << BigInt(M - i - 1);
      const b = Fp.pow(c, exponent);
      M = i;
      c = Fp.sqr(b);
      t = Fp.mul(t, c);
      R = Fp.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n$1 === _3n$1)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  if (P % _16n === _9n)
    return sqrt9mod16(P);
  return tonelliShanks(P);
}
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field2) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field2, opts);
  return field2;
}
function FpPow(Fp, num, power) {
  if (power < _0n$2)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$2)
    return Fp.ONE;
  if (power === _1n$2)
    return num;
  let p = Fp.ONE;
  let d = num;
  while (power > _0n$2) {
    if (power & _1n$2)
      p = Fp.mul(p, d);
    d = Fp.sqr(d);
    power >>= _1n$2;
  }
  return p;
}
function FpInvertBatch(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp.mul(acc, num);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp.is0(num))
      return acc;
    inverted[i] = Fp.mul(acc, inverted[i]);
    return Fp.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n) {
  const p1mod2 = (Fp.ORDER - _1n$2) / _2n$1;
  const powered = Fp.pow(n, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE2 = false, opts = {}) {
  if (ORDER <= _0n$2)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE2)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE2 = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE: isLE2,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$2,
    ONE: _1n$2,
    allowedLengths,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$2,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n$2) === _1n$2,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE$1(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE2 ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      if (modFromBytes)
        scalar = mod(scalar, ORDER);
      if (!skipValidation) {
        if (!f.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$2) + _1n$2;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE$1(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$1 = BigInt(0);
const _1n$1 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c, points) {
  const invertedZs = FpInvertBatch(c.Fp, points.map((p) => p.Z));
  return points.map((p, i) => c.fromAffine(p.toAffine(invertedZs[i])));
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$1;
  }
  const offsetStart = window * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field2) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field2.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function assert0(n) {
  if (n !== _0n$1)
    throw new Error("invalid wNAF");
}
class wNAF {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p = this.ZERO) {
    let d = elm;
    while (n > _0n$1) {
      if (n & _1n$1)
        p = p.add(d);
      d = d.double();
      n >>= _1n$1;
    }
    return p;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W) {
    const { windows, windowSize } = calcWOpts(W, this.bits);
    const points = [];
    let p = point;
    let base = p;
    for (let window = 0; window < windows; window++) {
      base = p;
      points.push(base);
      for (let i = 1; i < windowSize; i++) {
        base = base.add(p);
        points.push(base);
      }
      p = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W, precomputes, n) {
    if (!this.Fn.isValid(n))
      throw new Error("invalid scalar");
    let p = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W, this.bits);
    for (let window = 0; window < wo.windows; window++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p = p.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W, this.bits);
    for (let window = 0; window < wo.windows; window++) {
      if (n === _0n$1)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W);
      if (W !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W = getW(point);
    return this.wNAF(W, this.getPrecomputes(W, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W = getW(point);
    if (W === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W, this.getPrecomputes(W, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P, W) {
    validateW(W, this.bits);
    pointWindowSizes.set(P, W);
    pointPrecomputes.delete(P);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
}
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n$1 || k2 > _0n$1) {
    if (k1 & _1n$1)
      p1 = p1.add(acc);
    if (k2 & _1n$1)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n$1;
    k2 >>= _1n$1;
  }
  return { p1, p2 };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field2, isLE2) {
  if (field2) {
    if (field2.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field2);
    return field2;
  } else {
    return Field(order, { isLE: isLE2 });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p of ["p", "n", "h"]) {
    const val = CURVE[p];
    if (!(typeof val === "bigint" && val > _0n$1))
      throw new Error(`CURVE.${p} must be positive bigint`);
  }
  const Fp = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b = "b";
  const params = ["Gx", "Gy", "a", _b];
  for (const p of params) {
    if (!Fp.isValid(CURVE[p]))
      throw new Error(`CURVE.${p} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp, Fn };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n) / den;
function _splitEndoScalar(k, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k, n);
  const c2 = divNearest(-b1 * k, n);
  let k1 = k - c1 * a1 - c2 * a2;
  let k2 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n;
  const k2neg = k2 < _0n;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k2 = -k2;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n;
  if (k1 < _0n || k1 >= MAX_NUM || k2 < _0n || k2 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k);
  }
  return { k1neg, k1, k2neg, k2 };
}
function validateSigFormat(format) {
  if (!["compact", "recovered", "der"].includes(format))
    throw new Error('Signature format must be "compact", "recovered", or "der"');
  return format;
}
function validateSigOpts(opts, def) {
  const optsn = {};
  for (let optName of Object.keys(def)) {
    optsn[optName] = opts[optName] === void 0 ? def[optName] : opts[optName];
  }
  _abool2(optsn.lowS, "lowS");
  _abool2(optsn.prehash, "prehash");
  if (optsn.format !== void 0)
    validateSigFormat(optsn.format);
  return optsn;
}
class DERErr extends Error {
  constructor(m = "") {
    super(m);
  }
}
const DER = {
  // asn.1 DER encoding utils
  Err: DERErr,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (tag, data) => {
      const { Err: E } = DER;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length & 1)
        throw new E("tlv.encode: unpadded data");
      const dataLen = data.length / 2;
      const len = numberToHexUnpadded$1(dataLen);
      if (len.length / 2 & 128)
        throw new E("tlv.encode: long form length too big");
      const lenLen = dataLen > 127 ? numberToHexUnpadded$1(len.length / 2 | 128) : "";
      const t = numberToHexUnpadded$1(tag);
      return t + lenLen + len + data;
    },
    // v - value, l - left bytes (unparsed)
    decode(tag, data) {
      const { Err: E } = DER;
      let pos = 0;
      if (tag < 0 || tag > 256)
        throw new E("tlv.encode: wrong tag");
      if (data.length < 2 || data[pos++] !== tag)
        throw new E("tlv.decode: wrong tlv");
      const first = data[pos++];
      const isLong = !!(first & 128);
      let length = 0;
      if (!isLong)
        length = first;
      else {
        const lenLen = first & 127;
        if (!lenLen)
          throw new E("tlv.decode(long): indefinite length not supported");
        if (lenLen > 4)
          throw new E("tlv.decode(long): byte length is too big");
        const lengthBytes = data.subarray(pos, pos + lenLen);
        if (lengthBytes.length !== lenLen)
          throw new E("tlv.decode: length bytes not complete");
        if (lengthBytes[0] === 0)
          throw new E("tlv.decode(long): zero leftmost byte");
        for (const b of lengthBytes)
          length = length << 8 | b;
        pos += lenLen;
        if (length < 128)
          throw new E("tlv.decode(long): not minimal encoding");
      }
      const v = data.subarray(pos, pos + length);
      if (v.length !== length)
        throw new E("tlv.decode: wrong value length");
      return { v, l: data.subarray(pos + length) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(num) {
      const { Err: E } = DER;
      if (num < _0n)
        throw new E("integer: negative integers are not allowed");
      let hex = numberToHexUnpadded$1(num);
      if (Number.parseInt(hex[0], 16) & 8)
        hex = "00" + hex;
      if (hex.length & 1)
        throw new E("unexpected DER parsing assertion: unpadded hex");
      return hex;
    },
    decode(data) {
      const { Err: E } = DER;
      if (data[0] & 128)
        throw new E("invalid signature integer: negative");
      if (data[0] === 0 && !(data[1] & 128))
        throw new E("invalid signature integer: unnecessary leading zero");
      return bytesToNumberBE(data);
    }
  },
  toSig(hex) {
    const { Err: E, _int: int, _tlv: tlv } = DER;
    const data = ensureBytes("signature", hex);
    const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
    if (seqLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
    const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
    if (sLeftBytes.length)
      throw new E("invalid signature: left bytes after parsing");
    return { r: int.decode(rBytes), s: int.decode(sBytes) };
  },
  hexFromSig(sig) {
    const { _tlv: tlv, _int: int } = DER;
    const rs = tlv.encode(2, int.encode(sig.r));
    const ss = tlv.encode(2, int.encode(sig.s));
    const seq = rs + ss;
    return tlv.encode(48, seq);
  }
};
const _0n = BigInt(0), _1n = BigInt(1), _2n = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
function _normFnElement(Fn, key) {
  const { BYTES: expected } = Fn;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes("private key", key);
    try {
      num = Fn.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn.isValidNot0(num))
    throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp, Fn);
  function assertCompressionIsSupported() {
    if (!Fp.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x, y } = point.toAffine();
    const bx = Fp.toBytes(x);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp.isOdd(y);
      return concatBytes$1(pprefix(hasEvenY), bx);
    } else {
      return concatBytes$1(Uint8Array.of(4), bx, Fp.toBytes(y));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x = Fp.fromBytes(tail);
      if (!Fp.isValid(x))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x);
      let y;
      try {
        y = Fp.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp.isOdd(y);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y = Fp.neg(y);
      return { x, y };
    } else if (length === uncomp && head === 4) {
      const L = Fp.BYTES;
      const x = Fp.fromBytes(tail.subarray(0, L));
      const y = Fp.fromBytes(tail.subarray(L, L * 2));
      if (!isValidXY(x, y))
        throw new Error("bad point: is not on curve");
      return { x, y };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x) {
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, CURVE.a)), CURVE.b);
  }
  function isValidXY(x, y) {
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n), _4n);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp.isValid(n) || banZero && Fp.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p, iz) => {
    const { X, Y, Z } = p;
    if (Fp.eql(Z, Fp.ONE))
      return { x: X, y: Y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(Z);
    const x = Fp.mul(X, iz);
    const y = Fp.mul(Y, iz);
    const zz = Fp.mul(Z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x, y };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp.is0(p.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X, Y, Z) {
      this.X = acoord("x", X);
      this.Y = acoord("y", Y, true);
      this.Z = acoord("z", Z);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp.is0(x) && Fp.is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp.ONE);
    }
    static fromBytes(bytes) {
      const P = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P.assertValidity();
      return P;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (!Fp.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp.isOdd(y);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.cached(this, n, (p) => normalizeZ(Point, p));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p, f } = mul(scalar);
        point = p;
        fake = f;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n || p.is0())
        return Point.ZERO;
      if (sc === _1n)
        return p;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2 } = mulEndoUnsafe(Point, p, k1, k2);
        return finishEndo(endo2.beta, p1, p2, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p, sc);
      }
    }
    multiplyAndAddUnsafe(Q, a, b) {
      const sum = this.multiplyUnsafe(a).add(Q.multiplyUnsafe(b));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex$2(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn, privateKey));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  Point.Fp = Fp;
  Point.Fn = Fn;
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function getWLengths(Fp, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function ecdh(Point, ecdhOpts = {}) {
  const { Fn } = Point;
  const randomBytes_ = ecdhOpts.randomBytes || randomBytes$1;
  const lengths = Object.assign(getWLengths(Point.Fp, Fn), { seed: getMinHashLength(Fn.ORDER) });
  function isValidSecretKey(secretKey) {
    try {
      return !!_normFnElement(Fn, secretKey);
    } catch (error) {
      return false;
    }
  }
  function isValidPublicKey(publicKey, isCompressed) {
    const { publicKey: comp, publicKeyUncompressed } = lengths;
    try {
      const l = publicKey.length;
      if (isCompressed === true && l !== comp)
        return false;
      if (isCompressed === false && l !== publicKeyUncompressed)
        return false;
      return !!Point.fromBytes(publicKey);
    } catch (error) {
      return false;
    }
  }
  function randomSecretKey(seed = randomBytes_(lengths.seed)) {
    return mapHashToField(_abytes2(seed, lengths.seed, "seed"), Fn.ORDER);
  }
  function getPublicKey(secretKey, isCompressed = true) {
    return Point.BASE.multiply(_normFnElement(Fn, secretKey)).toBytes(isCompressed);
  }
  function keygen(seed) {
    const secretKey = randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point)
      return true;
    const { secretKey, publicKey, publicKeyUncompressed } = lengths;
    if (Fn.allowedLengths || secretKey === publicKey)
      return void 0;
    const l = ensureBytes("key", item).length;
    return l === publicKey || l === publicKeyUncompressed;
  }
  function getSharedSecret2(secretKeyA, publicKeyB, isCompressed = true) {
    if (isProbPub(secretKeyA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicKeyB) === false)
      throw new Error("second arg must be public key");
    const s = _normFnElement(Fn, secretKeyA);
    const b = Point.fromHex(publicKeyB);
    return b.multiply(s).toBytes(isCompressed);
  }
  const utils = {
    isValidSecretKey,
    isValidPublicKey,
    randomSecretKey,
    // TODO: remove
    isValidPrivateKey: isValidSecretKey,
    randomPrivateKey: randomSecretKey,
    normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({ getPublicKey, getSharedSecret: getSharedSecret2, keygen, Point, utils, lengths });
}
function ecdsa(Point, hash, ecdsaOpts = {}) {
  ahash(hash);
  _validateObject(ecdsaOpts, {}, {
    hmac: "function",
    lowS: "boolean",
    randomBytes: "function",
    bits2int: "function",
    bits2int_modN: "function"
  });
  const randomBytes2 = ecdsaOpts.randomBytes || randomBytes$1;
  const hmac2 = ecdsaOpts.hmac || ((key, ...msgs) => hmac$1(hash, key, concatBytes$1(...msgs)));
  const { Fp, Fn } = Point;
  const { ORDER: CURVE_ORDER, BITS: fnBits } = Fn;
  const { keygen, getPublicKey, getSharedSecret: getSharedSecret2, utils, lengths } = ecdh(Point, ecdsaOpts);
  const defaultSigOpts = {
    prehash: false,
    lowS: typeof ecdsaOpts.lowS === "boolean" ? ecdsaOpts.lowS : false,
    format: void 0,
    //'compact' as ECDSASigFormat,
    extraEntropy: false
  };
  const defaultSigOpts_format = "compact";
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n;
    return number > HALF;
  }
  function validateRS(title, num) {
    if (!Fn.isValidNot0(num))
      throw new Error(`invalid signature ${title}: out of range 1..Point.Fn.ORDER`);
    return num;
  }
  function validateSigLength(bytes, format) {
    validateSigFormat(format);
    const size = lengths.signature;
    const sizer = format === "compact" ? size : format === "recovered" ? size + 1 : void 0;
    return _abytes2(bytes, sizer, `${format} signature`);
  }
  class Signature {
    constructor(r, s, recovery) {
      this.r = validateRS("r", r);
      this.s = validateRS("s", s);
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    static fromBytes(bytes, format = defaultSigOpts_format) {
      validateSigLength(bytes, format);
      let recid;
      if (format === "der") {
        const { r: r2, s: s2 } = DER.toSig(_abytes2(bytes));
        return new Signature(r2, s2);
      }
      if (format === "recovered") {
        recid = bytes[0];
        format = "compact";
        bytes = bytes.subarray(1);
      }
      const L = Fn.BYTES;
      const r = bytes.subarray(0, L);
      const s = bytes.subarray(L, L * 2);
      return new Signature(Fn.fromBytes(r), Fn.fromBytes(s), recid);
    }
    static fromHex(hex, format) {
      return this.fromBytes(hexToBytes(hex), format);
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(messageHash) {
      const FIELD_ORDER = Fp.ORDER;
      const { r, s, recovery: rec } = this;
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const hasCofactor = CURVE_ORDER * _2n < FIELD_ORDER;
      if (hasCofactor && rec > 1)
        throw new Error("recovery id is ambiguous for h>1 curve");
      const radj = rec === 2 || rec === 3 ? r + CURVE_ORDER : r;
      if (!Fp.isValid(radj))
        throw new Error("recovery id 2 or 3 invalid");
      const x = Fp.toBytes(radj);
      const R = Point.fromBytes(concatBytes$1(pprefix((rec & 1) === 0), x));
      const ir = Fn.inv(radj);
      const h = bits2int_modN(ensureBytes("msgHash", messageHash));
      const u1 = Fn.create(-h * ir);
      const u2 = Fn.create(s * ir);
      const Q = Point.BASE.multiplyUnsafe(u1).add(R.multiplyUnsafe(u2));
      if (Q.is0())
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    toBytes(format = defaultSigOpts_format) {
      validateSigFormat(format);
      if (format === "der")
        return hexToBytes(DER.hexFromSig(this));
      const r = Fn.toBytes(this.r);
      const s = Fn.toBytes(this.s);
      if (format === "recovered") {
        if (this.recovery == null)
          throw new Error("recovery bit must be present");
        return concatBytes$1(Uint8Array.of(this.recovery), r, s);
      }
      return concatBytes$1(r, s);
    }
    toHex(format) {
      return bytesToHex$2(this.toBytes(format));
    }
    // TODO: remove
    assertValidity() {
    }
    static fromCompact(hex) {
      return Signature.fromBytes(ensureBytes("sig", hex), "compact");
    }
    static fromDER(hex) {
      return Signature.fromBytes(ensureBytes("sig", hex), "der");
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, Fn.neg(this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return bytesToHex$2(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return bytesToHex$2(this.toBytes("compact"));
    }
  }
  const bits2int = ecdsaOpts.bits2int || function bits2int_def(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - fnBits;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = ecdsaOpts.bits2int_modN || function bits2int_modN_def(bytes) {
    return Fn.create(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(fnBits);
  function int2octets(num) {
    aInRange("num < 2^" + fnBits, num, _0n, ORDER_MASK);
    return Fn.toBytes(num);
  }
  function validateMsgAndHash(message, prehash) {
    _abytes2(message, void 0, "message");
    return prehash ? _abytes2(hash(message), void 0, "prehashed message") : message;
  }
  function prepSig(message, privateKey, opts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { lowS, prehash, extraEntropy } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    const h1int = bits2int_modN(message);
    const d = _normFnElement(Fn, privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (extraEntropy != null && extraEntropy !== false) {
      const e = extraEntropy === true ? randomBytes2(lengths.secretKey) : extraEntropy;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes$1(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!Fn.isValidNot0(k))
        return;
      const ik = Fn.inv(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = Fn.create(q.x);
      if (r === _0n)
        return;
      const s = Fn.create(ik * Fn.create(m + r * d));
      if (s === _0n)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = Fn.neg(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  function sign(message, secretKey, opts = {}) {
    message = ensureBytes("message", message);
    const { seed, k2sig } = prepSig(message, secretKey, opts);
    const drbg = createHmacDrbg(hash.outputLen, Fn.BYTES, hmac2);
    const sig = drbg(seed, k2sig);
    return sig;
  }
  function tryParsingSig(sg) {
    let sig = void 0;
    const isHex = typeof sg === "string" || isBytes$1(sg);
    const isObj = !isHex && sg !== null && typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    if (isObj) {
      sig = new Signature(sg.r, sg.s);
    } else if (isHex) {
      try {
        sig = Signature.fromBytes(ensureBytes("sig", sg), "der");
      } catch (derError) {
        if (!(derError instanceof DER.Err))
          throw derError;
      }
      if (!sig) {
        try {
          sig = Signature.fromBytes(ensureBytes("sig", sg), "compact");
        } catch (error) {
          return false;
        }
      }
    }
    if (!sig)
      return false;
    return sig;
  }
  function verify(signature, message, publicKey, opts = {}) {
    const { lowS, prehash, format } = validateSigOpts(opts, defaultSigOpts);
    publicKey = ensureBytes("publicKey", publicKey);
    message = validateMsgAndHash(ensureBytes("message", message), prehash);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const sig = format === void 0 ? tryParsingSig(signature) : Signature.fromBytes(ensureBytes("sig", signature), format);
    if (sig === false)
      return false;
    try {
      const P = Point.fromBytes(publicKey);
      if (lowS && sig.hasHighS())
        return false;
      const { r, s } = sig;
      const h = bits2int_modN(message);
      const is = Fn.inv(s);
      const u1 = Fn.create(h * is);
      const u2 = Fn.create(r * is);
      const R = Point.BASE.multiplyUnsafe(u1).add(P.multiplyUnsafe(u2));
      if (R.is0())
        return false;
      const v = Fn.create(R.x);
      return v === r;
    } catch (e) {
      return false;
    }
  }
  function recoverPublicKey(signature, message, opts = {}) {
    const { prehash } = validateSigOpts(opts, defaultSigOpts);
    message = validateMsgAndHash(message, prehash);
    return Signature.fromBytes(signature, "recovered").recoverPublicKey(message).toBytes();
  }
  return Object.freeze({
    keygen,
    getPublicKey,
    getSharedSecret: getSharedSecret2,
    utils,
    lengths,
    Point,
    sign,
    verify,
    recoverPublicKey,
    Signature,
    hash
  });
}
function _weierstrass_legacy_opts_to_new(c) {
  const CURVE = {
    a: c.a,
    b: c.b,
    p: c.Fp.ORDER,
    n: c.n,
    h: c.h,
    Gx: c.Gx,
    Gy: c.Gy
  };
  const Fp = c.Fp;
  let allowedLengths = c.allowedPrivateKeyLengths ? Array.from(new Set(c.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
  const Fn = Field(CURVE.n, {
    BITS: c.nBitLength,
    allowedLengths,
    modFromBytes: c.wrapPrivateKey
  });
  const curveOpts = {
    Fp,
    Fn,
    allowInfinityPoint: c.allowInfinityPoint,
    endo: c.endo,
    isTorsionFree: c.isTorsionFree,
    clearCofactor: c.clearCofactor,
    fromBytes: c.fromBytes,
    toBytes: c.toBytes
  };
  return { CURVE, curveOpts };
}
function _ecdsa_legacy_opts_to_new(c) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c);
  const ecdsaOpts = {
    hmac: c.hmac,
    randomBytes: c.randomBytes,
    lowS: c.lowS,
    bits2int: c.bits2int,
    bits2int_modN: c.bits2int_modN
  };
  return { CURVE, curveOpts, hash: c.hash, ecdsaOpts };
}
function _ecdsa_new_output_to_legacy(c, _ecdsa) {
  const Point = _ecdsa.Point;
  return Object.assign({}, _ecdsa, {
    ProjectivePoint: Point,
    CURVE: Object.assign({}, c, nLength(Point.Fn.ORDER, Point.Fn.BITS))
  });
}
function weierstrass(c) {
  const { CURVE, curveOpts, hash, ecdsaOpts } = _ecdsa_legacy_opts_to_new(c);
  const Point = weierstrassN(CURVE, curveOpts);
  const signs = ecdsa(Point, hash, ecdsaOpts);
  return _ecdsa_new_output_to_legacy(c, signs);
}
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView$1(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes$1(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  else if (isBytes(data))
    data = copyBytes(data);
  else
    throw new Error("Uint8Array expected, got " + typeof data);
  return data;
}
function setBigUint64$1(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = 0;
  const l = 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
const BLOCK_SIZE = 16;
const ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
const ZEROS32 = u32(ZEROS16);
const POLY = 225;
const mul2 = (s0, s1, s2, s3) => {
  const hiBit = s3 & 1;
  return {
    s3: s2 << 31 | s3 >>> 1,
    s2: s1 << 31 | s2 >>> 1,
    s1: s0 << 31 | s1 >>> 1,
    s0: s0 >>> 1 ^ POLY << 24 & -(hiBit & 1)
    // reduce % poly
  };
};
const swapLE = (n) => (n >>> 0 & 255) << 24 | (n >>> 8 & 255) << 16 | (n >>> 16 & 255) << 8 | n >>> 24 & 255 | 0;
function _toGHASHKey(k) {
  k.reverse();
  const hiBit = k[15] & 1;
  let carry = 0;
  for (let i = 0; i < k.length; i++) {
    const t = k[i];
    k[i] = t >>> 1 | carry;
    carry = (t & 1) << 7;
  }
  k[0] ^= -hiBit & 225;
  return k;
}
const estimateWindow = (bytes) => {
  if (bytes > 64 * 1024)
    return 8;
  if (bytes > 1024)
    return 4;
  return 2;
};
class GHASH {
  // We select bits per window adaptively based on expectedLength
  constructor(key, expectedLength) {
    this.blockLen = BLOCK_SIZE;
    this.outputLen = BLOCK_SIZE;
    this.s0 = 0;
    this.s1 = 0;
    this.s2 = 0;
    this.s3 = 0;
    this.finished = false;
    key = toBytes$1(key);
    abytes(key, 16);
    const kView = createView$1(key);
    let k0 = kView.getUint32(0, false);
    let k1 = kView.getUint32(4, false);
    let k2 = kView.getUint32(8, false);
    let k3 = kView.getUint32(12, false);
    const doubles = [];
    for (let i = 0; i < 128; i++) {
      doubles.push({ s0: swapLE(k0), s1: swapLE(k1), s2: swapLE(k2), s3: swapLE(k3) });
      ({ s0: k0, s1: k1, s2: k2, s3: k3 } = mul2(k0, k1, k2, k3));
    }
    const W = estimateWindow(expectedLength || 1024);
    if (![1, 2, 4, 8].includes(W))
      throw new Error("ghash: invalid window size, expected 2, 4 or 8");
    this.W = W;
    const bits = 128;
    const windows = bits / W;
    const windowSize = this.windowSize = 2 ** W;
    const items = [];
    for (let w = 0; w < windows; w++) {
      for (let byte = 0; byte < windowSize; byte++) {
        let s0 = 0, s1 = 0, s2 = 0, s3 = 0;
        for (let j = 0; j < W; j++) {
          const bit = byte >>> W - j - 1 & 1;
          if (!bit)
            continue;
          const { s0: d0, s1: d1, s2: d2, s3: d3 } = doubles[W * w + j];
          s0 ^= d0, s1 ^= d1, s2 ^= d2, s3 ^= d3;
        }
        items.push({ s0, s1, s2, s3 });
      }
    }
    this.t = items;
  }
  _updateBlock(s0, s1, s2, s3) {
    s0 ^= this.s0, s1 ^= this.s1, s2 ^= this.s2, s3 ^= this.s3;
    const { W, t, windowSize } = this;
    let o0 = 0, o1 = 0, o2 = 0, o3 = 0;
    const mask = (1 << W) - 1;
    let w = 0;
    for (const num of [s0, s1, s2, s3]) {
      for (let bytePos = 0; bytePos < 4; bytePos++) {
        const byte = num >>> 8 * bytePos & 255;
        for (let bitPos = 8 / W - 1; bitPos >= 0; bitPos--) {
          const bit = byte >>> W * bitPos & mask;
          const { s0: e0, s1: e1, s2: e2, s3: e3 } = t[w * windowSize + bit];
          o0 ^= e0, o1 ^= e1, o2 ^= e2, o3 ^= e3;
          w += 1;
        }
      }
    }
    this.s0 = o0;
    this.s1 = o1;
    this.s2 = o2;
    this.s3 = o3;
  }
  update(data) {
    aexists(this);
    data = toBytes$1(data);
    abytes(data);
    const b32 = u32(data);
    const blocks = Math.floor(data.length / BLOCK_SIZE);
    const left = data.length % BLOCK_SIZE;
    for (let i = 0; i < blocks; i++) {
      this._updateBlock(b32[i * 4 + 0], b32[i * 4 + 1], b32[i * 4 + 2], b32[i * 4 + 3]);
    }
    if (left) {
      ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
      this._updateBlock(ZEROS32[0], ZEROS32[1], ZEROS32[2], ZEROS32[3]);
      clean(ZEROS32);
    }
    return this;
  }
  destroy() {
    const { t } = this;
    for (const elm of t) {
      elm.s0 = 0, elm.s1 = 0, elm.s2 = 0, elm.s3 = 0;
    }
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { s0, s1, s2, s3 } = this;
    const o32 = u32(out);
    o32[0] = s0;
    o32[1] = s1;
    o32[2] = s2;
    o32[3] = s3;
    return out;
  }
  digest() {
    const res = new Uint8Array(BLOCK_SIZE);
    this.digestInto(res);
    this.destroy();
    return res;
  }
}
class Polyval extends GHASH {
  constructor(key, expectedLength) {
    key = toBytes$1(key);
    abytes(key);
    const ghKey = _toGHASHKey(copyBytes(key));
    super(ghKey, expectedLength);
    clean(ghKey);
  }
  update(data) {
    data = toBytes$1(data);
    aexists(this);
    const b32 = u32(data);
    const left = data.length % BLOCK_SIZE;
    const blocks = Math.floor(data.length / BLOCK_SIZE);
    for (let i = 0; i < blocks; i++) {
      this._updateBlock(swapLE(b32[i * 4 + 3]), swapLE(b32[i * 4 + 2]), swapLE(b32[i * 4 + 1]), swapLE(b32[i * 4 + 0]));
    }
    if (left) {
      ZEROS16.set(data.subarray(blocks * BLOCK_SIZE));
      this._updateBlock(swapLE(ZEROS32[3]), swapLE(ZEROS32[2]), swapLE(ZEROS32[1]), swapLE(ZEROS32[0]));
      clean(ZEROS32);
    }
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { s0, s1, s2, s3 } = this;
    const o32 = u32(out);
    o32[0] = s0;
    o32[1] = s1;
    o32[2] = s2;
    o32[3] = s3;
    return out.reverse();
  }
}
function wrapConstructorWithKey(hashCons) {
  const hashC = (msg, key) => hashCons(key, msg.length).update(toBytes$1(msg)).digest();
  const tmp = hashCons(new Uint8Array(16), 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (key, expectedLength) => hashCons(key, expectedLength);
  return hashC;
}
const ghash = wrapConstructorWithKey((key, expectedLength) => new GHASH(key, expectedLength));
wrapConstructorWithKey((key, expectedLength) => new Polyval(key, expectedLength));
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var sm2_exports = {};
__export(sm2_exports, {
  EmptyArray: () => EmptyArray,
  arrayToHex: () => arrayToHex,
  arrayToUtf8: () => arrayToUtf8,
  calculateSharedKey: () => calculateSharedKey,
  comparePublicKeyHex: () => comparePublicKeyHex,
  compressPublicKeyHex: () => compressPublicKeyHex,
  doDecrypt: () => doDecrypt,
  doEncrypt: () => doEncrypt,
  doSignature: () => doSignature,
  doVerifySignature: () => doVerifySignature,
  ecdh: () => getSharedSecret,
  generateKeyPairHex: () => generateKeyPairHex,
  getHash: () => getHash,
  getPoint: () => getPoint,
  getPublicKeyFromPrivateKey: () => getPublicKeyFromPrivateKey,
  getZ: () => getZ,
  hexToArray: () => hexToArray,
  initRNGPool: () => initRNGPool,
  leftPad: () => leftPad,
  precomputePublicKey: () => precomputePublicKey,
  utf8ToHex: () => utf8ToHex,
  verifyPublicKey: () => verifyPublicKey
});
var ZERO = BigInt(0);
var ONE = BigInt(1);
var TWO = BigInt(2);
BigInt(3);
function bigintToValue(bigint) {
  let h = bigint.toString(16);
  if (h[0] !== "-") {
    if (h.length % 2 === 1)
      h = "0" + h;
    else if (!h.match(/^[0-7]/))
      h = "00" + h;
  } else {
    h = h.substring(1);
    let len = h.length;
    if (len % 2 === 1)
      len += 1;
    else if (!h.match(/^[0-7]/))
      len += 2;
    let maskString = "";
    for (let i = 0; i < len; i++)
      maskString += "f";
    let mask = hexToNumber(maskString);
    let output = (mask ^ bigint) + ONE;
    h = output.toString(16).replace(/^-/, "");
  }
  return h;
}
var ASN1Object = class {
  constructor(tlv = null, t = "00", l = "00", v = "") {
    this.tlv = tlv;
    this.t = t;
    this.l = l;
    this.v = v;
  }
  /**
   * 获取 der 编码比特流16进制串
   */
  getEncodedHex() {
    if (!this.tlv) {
      this.v = this.getValue();
      this.l = this.getLength();
      this.tlv = this.t + this.l + this.v;
    }
    return this.tlv;
  }
  getLength() {
    const n = this.v.length / 2;
    let nHex = n.toString(16);
    if (nHex.length % 2 === 1)
      nHex = "0" + nHex;
    if (n < 128) {
      return nHex;
    } else {
      const head = 128 + nHex.length / 2;
      return head.toString(16) + nHex;
    }
  }
  getValue() {
    return "";
  }
};
var DERInteger = class extends ASN1Object {
  constructor(bigint) {
    super();
    this.t = "02";
    if (bigint)
      this.v = bigintToValue(bigint);
  }
  getValue() {
    return this.v;
  }
};
var DEROctetString = class extends ASN1Object {
  constructor(s) {
    super();
    this.s = s;
    __publicField(this, "hV", "");
    this.t = "04";
    if (s)
      this.v = s.toLowerCase();
  }
  getValue() {
    return this.v;
  }
};
var DERSequence = class extends ASN1Object {
  constructor(asn1Array) {
    super();
    this.asn1Array = asn1Array;
    __publicField(this, "t", "30");
  }
  getValue() {
    this.v = this.asn1Array.map((asn1Object) => asn1Object.getEncodedHex()).join("");
    return this.v;
  }
};
function getLenOfL(str, start) {
  if (+str[start + 2] < 8)
    return 1;
  const encoded = str.slice(start + 2, start + 6);
  const headHex = encoded.slice(0, 2);
  const head = parseInt(headHex, 16);
  const nHexLength = (head - 128) * 2;
  return nHexLength;
}
function getL(str, start) {
  const len = getLenOfL(str, start);
  const l = str.substring(start + 2, start + 2 + len * 2);
  if (!l)
    return -1;
  const bigint = +l[0] < 8 ? hexToNumber(l) : hexToNumber(l.substring(2));
  return +bigint.toString();
}
function getStartOfV(str, start) {
  const len = getLenOfL(str, start);
  return start + (len + 1) * 2;
}
function encodeDer(r, s) {
  const derR = new DERInteger(r);
  const derS = new DERInteger(s);
  const derSeq = new DERSequence([derR, derS]);
  return derSeq.getEncodedHex();
}
function encodeEnc(x2, y, hash, cipher) {
  const derX = new DERInteger(x2);
  const derY = new DERInteger(y);
  const derHash = new DEROctetString(hash);
  const derCipher = new DEROctetString(cipher);
  const derSeq = new DERSequence([derX, derY, derHash, derCipher]);
  return derSeq.getEncodedHex();
}
function decodeDer(input) {
  const start = getStartOfV(input, 0);
  const vIndexR = getStartOfV(input, start);
  const lR = getL(input, start);
  const vR = input.substring(vIndexR, vIndexR + lR * 2);
  const nextStart = vIndexR + vR.length;
  const vIndexS = getStartOfV(input, nextStart);
  const lS = getL(input, nextStart);
  const vS = input.substring(vIndexS, vIndexS + lS * 2);
  const r = hexToNumber(vR);
  const s = hexToNumber(vS);
  return { r, s };
}
function decodeEnc(input) {
  function extractSequence(input2, start2) {
    const vIndex = getStartOfV(input2, start2);
    const length = getL(input2, start2);
    const value = input2.substring(vIndex, vIndex + length * 2);
    const nextStart = vIndex + value.length;
    return { value, nextStart };
  }
  const start = getStartOfV(input, 0);
  const { value: vR, nextStart: startS } = extractSequence(input, start);
  const { value: vS, nextStart: startHash } = extractSequence(input, startS);
  const { value: hash, nextStart: startCipher } = extractSequence(input, startHash);
  const { value: cipher } = extractSequence(input, startCipher);
  const x2 = hexToNumber(vR);
  const y = hexToNumber(vS);
  return { x: x2, y, hash, cipher };
}
var DEFAULT_PRNG_POOL_SIZE = 16384;
var prngPool = new Uint8Array(0);
var _syncCrypto;
async function initRNGPool() {
  if ("crypto" in globalThis) {
    _syncCrypto = globalThis.crypto;
    return;
  }
  if (prngPool.length > DEFAULT_PRNG_POOL_SIZE / 2)
    return;
  if ("wx" in globalThis && "getRandomValues" in globalThis.wx) {
    prngPool = await new Promise((r) => {
      wx.getRandomValues({
        length: DEFAULT_PRNG_POOL_SIZE,
        success(res) {
          r(new Uint8Array(res.randomValues));
        }
      });
    });
  } else {
    try {
      if (globalThis.crypto) {
        _syncCrypto = globalThis.crypto;
      } else {
        const crypto2 = await import(
          /* webpackIgnore: true */
          "./__vite-browser-external-2Ng8QIWW.js"
        );
        _syncCrypto = crypto2.webcrypto;
      }
      const array = new Uint8Array(DEFAULT_PRNG_POOL_SIZE);
      _syncCrypto.getRandomValues(array);
      prngPool = array;
    } catch (error) {
      throw new Error("no available csprng, abort.");
    }
  }
}
initRNGPool();
function consumePool(length) {
  if (prngPool.length > length) {
    const prng = prngPool.slice(0, length);
    prngPool = prngPool.slice(length);
    initRNGPool();
    return prng;
  } else {
    throw new Error("random number pool is not ready or insufficient, prevent getting too long random values or too often.");
  }
}
function randomBytes(length = 0) {
  const array = new Uint8Array(length);
  if (_syncCrypto) {
    return _syncCrypto.getRandomValues(array);
  } else {
    const result = consumePool(length);
    return result;
  }
}
var u8a = (a) => a instanceof Uint8Array;
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
var hexes = Array.from(
  { length: 256 },
  (v, i) => i.toString(16).padStart(2, "0")
);
function bytesToHex(bytes) {
  if (!u8a(bytes))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var slc = (v, s, e) => {
  if (e == null || e > v.length)
    e = v.length;
  return new Uint8Array(v.subarray(s, e));
};
function strToU8(str) {
  if (te)
    return te.encode(str);
  const l = str.length;
  let ar = new Uint8Array(str.length + (str.length >> 1));
  let ai = 0;
  const w = (v) => {
    ar[ai++] = v;
  };
  for (let i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      const n = new Uint8Array(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    let c = str.charCodeAt(i);
    if (c < 128)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function toBytes(data) {
  if (typeof data === "string")
    data = strToU8(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
var Hash2 = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp2 = hashCons();
  hashC.outputLen = tmp2.outputLen;
  hashC.blockLen = tmp2.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var BoolA = (A, B, C) => A & B | A & C | B & C;
var BoolB = (A, B, C) => A ^ B ^ C;
var BoolC = (A, B, C) => A & B | ~A & C;
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
function rotl(x2, n) {
  const s = n & 31;
  return x2 << s | x2 >>> 32 - s;
}
function P0(X) {
  return X ^ rotl(X, 9) ^ rotl(X, 17);
}
function P1(X) {
  return X ^ rotl(X, 15) ^ rotl(X, 23);
}
var SHA2 = class extends Hash2 {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    __publicField(this, "buffer");
    __publicField(this, "view");
    __publicField(this, "finished", false);
    __publicField(this, "length", 0);
    __publicField(this, "pos", 0);
    __publicField(this, "destroyed", false);
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};
var IV = new Uint32Array([1937774191, 1226093241, 388252375, 3666478592, 2842636476, 372324522, 3817729613, 2969243214]);
var SM3_W = new Uint32Array(68);
var SM3_M = new Uint32Array(64);
var T1 = 2043430169;
var T2 = 2055708042;
var SM3 = class extends SHA2 {
  constructor() {
    super(64, 32, 8, false);
    __publicField(this, "A", IV[0] | 0);
    __publicField(this, "B", IV[1] | 0);
    __publicField(this, "C", IV[2] | 0);
    __publicField(this, "D", IV[3] | 0);
    __publicField(this, "E", IV[4] | 0);
    __publicField(this, "F", IV[5] | 0);
    __publicField(this, "G", IV[6] | 0);
    __publicField(this, "H", IV[7] | 0);
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0; i < 16; i++, offset += 4)
      SM3_W[i] = view.getUint32(offset, false);
    for (let i = 16; i < 68; i++) {
      SM3_W[i] = P1(SM3_W[i - 16] ^ SM3_W[i - 9] ^ rotl(SM3_W[i - 3], 15)) ^ rotl(SM3_W[i - 13], 7) ^ SM3_W[i - 6];
    }
    for (let i = 0; i < 64; i++) {
      SM3_M[i] = SM3_W[i] ^ SM3_W[i + 4];
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let j = 0; j < 64; j++) {
      let small = j >= 0 && j <= 15;
      let T = small ? T1 : T2;
      let SS1 = rotl(rotl(A, 12) + E + rotl(T, j), 7);
      let SS2 = SS1 ^ rotl(A, 12);
      let TT1 = (small ? BoolB(A, B, C) : BoolA(A, B, C)) + D + SS2 + SM3_M[j] | 0;
      let TT2 = (small ? BoolB(E, F, G) : BoolC(E, F, G)) + H + SS1 + SM3_W[j] | 0;
      D = C;
      C = rotl(B, 9);
      B = A;
      A = TT1;
      H = G;
      G = rotl(F, 19);
      F = E;
      E = P0(TT2);
    }
    A = A ^ this.A | 0;
    B = B ^ this.B | 0;
    C = C ^ this.C | 0;
    D = D ^ this.D | 0;
    E = E ^ this.E | 0;
    F = F ^ this.F | 0;
    G = G ^ this.G | 0;
    H = H ^ this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SM3_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sm3 = wrapConstructor(() => new SM3());
var HMAC2 = class extends Hash2 {
  constructor(hash, _key) {
    super();
    __publicField(this, "oHash");
    __publicField(this, "iHash");
    __publicField(this, "blockLen");
    __publicField(this, "outputLen");
    __publicField(this, "finished", false);
    __publicField(this, "destroyed", false);
    const key = toBytes(_key);
    this.iHash = hash.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash, key, message) => new HMAC2(hash, key).update(message).digest();
hmac.create = (hash, key) => new HMAC2(hash, key);
var sm2Fp = Field(BigInt("115792089210356248756420345214020892766250353991924191454421193933289684991999"));
var sm2Curve = weierstrass({
  // sm2: short weierstrass.
  a: BigInt("115792089210356248756420345214020892766250353991924191454421193933289684991996"),
  b: BigInt("18505919022281880113072981827955639221458448578012075254857346196103069175443"),
  Fp: sm2Fp,
  h: ONE,
  n: BigInt("115792089210356248756420345214020892766061623724957744567843809356293439045923"),
  Gx: BigInt("22963146547237050559479531362550074578802567295341616970375194840604139615431"),
  Gy: BigInt("85132369209828568825618990617112496413088388631904505083283536607588877201568"),
  hash: sm3,
  hmac: (key, ...msgs) => hmac(sm3, key, concatBytes(...msgs)),
  randomBytes
});
var field = Field(BigInt(sm2Curve.CURVE.n));
function generateKeyPairHex(str) {
  const privateKey = str ? numberToBytesBE(mod(BigInt(str), ONE) + ONE, 32) : sm2Curve.utils.randomPrivateKey();
  const publicKey = sm2Curve.getPublicKey(privateKey, false);
  const privPad = leftPad(bytesToHex$1(privateKey), 64);
  const pubPad = leftPad(bytesToHex$1(publicKey), 64);
  return { privateKey: privPad, publicKey: pubPad };
}
function compressPublicKeyHex(s) {
  if (s.length !== 130)
    throw new Error("Invalid public key to compress");
  const len = (s.length - 2) / 2;
  const xHex = s.substring(2, 2 + len);
  const y = hexToNumber(s.substring(len + 2, len + len + 2));
  let prefix = "03";
  if (mod(y, TWO) === ZERO)
    prefix = "02";
  return prefix + xHex;
}
function utf8ToHex(input) {
  const bytes = strToU8(input);
  return bytesToHex$1(bytes);
}
function leftPad(input, num) {
  if (input.length >= num)
    return input;
  return new Array(num - input.length + 1).join("0") + input;
}
function arrayToHex(arr) {
  return arr.map((item) => {
    const hex = item.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
function arrayToUtf8(arr) {
  const str = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] >= 240 && arr[i] <= 247) {
      str.push(String.fromCodePoint(((arr[i] & 7) << 18) + ((arr[i + 1] & 63) << 12) + ((arr[i + 2] & 63) << 6) + (arr[i + 3] & 63)));
      i += 3;
    } else if (arr[i] >= 224 && arr[i] <= 239) {
      str.push(String.fromCodePoint(((arr[i] & 15) << 12) + ((arr[i + 1] & 63) << 6) + (arr[i + 2] & 63)));
      i += 2;
    } else if (arr[i] >= 192 && arr[i] <= 223) {
      str.push(String.fromCodePoint(((arr[i] & 31) << 6) + (arr[i + 1] & 63)));
      i++;
    } else {
      str.push(String.fromCodePoint(arr[i]));
    }
  }
  return str.join("");
}
function hexToArray(hexStr) {
  let hexStrLength = hexStr.length;
  if (hexStrLength % 2 !== 0) {
    hexStr = leftPad(hexStr, hexStrLength + 1);
  }
  hexStrLength = hexStr.length;
  const wordLength = hexStrLength / 2;
  const words = new Uint8Array(wordLength);
  for (let i = 0; i < wordLength; i++) {
    words[i] = parseInt(hexStr.substring(i * 2, i * 2 + 2), 16);
  }
  return words;
}
function verifyPublicKey(publicKey) {
  const point = sm2Curve.ProjectivePoint.fromHex(publicKey);
  if (!point)
    return false;
  try {
    point.assertValidity();
    return true;
  } catch (error) {
    return false;
  }
}
function comparePublicKeyHex(publicKey1, publicKey2) {
  const point1 = sm2Curve.ProjectivePoint.fromHex(publicKey1);
  if (!point1)
    return false;
  const point2 = sm2Curve.ProjectivePoint.fromHex(publicKey2);
  if (!point2)
    return false;
  return point1.equals(point2);
}
function utf8ToArray(str) {
  const arr = [];
  for (let i = 0, len = str.length; i < len; i++) {
    const point = str.codePointAt(i);
    if (point <= 127) {
      arr.push(point);
    } else if (point <= 2047) {
      arr.push(192 | point >>> 6);
      arr.push(128 | point & 63);
    } else if (point <= 55295 || point >= 57344 && point <= 65535) {
      arr.push(224 | point >>> 12);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else if (point >= 65536 && point <= 1114111) {
      i++;
      arr.push(240 | point >>> 18 & 28);
      arr.push(128 | point >>> 12 & 63);
      arr.push(128 | point >>> 6 & 63);
      arr.push(128 | point & 63);
    } else {
      arr.push(point);
      throw new Error("input is not supported");
    }
  }
  return new Uint8Array(arr);
}
function kdf(z, keylen, iv) {
  z = typeof z === "string" ? utf8ToArray(z) : z;
  const IV2 = EmptyArray;
  let msg = new Uint8Array(keylen);
  let ct = 1;
  let offset = 0;
  let t = EmptyArray;
  const ctShift = new Uint8Array(4);
  const nextT = () => {
    ctShift[0] = ct >> 24 & 255;
    ctShift[1] = ct >> 16 & 255;
    ctShift[2] = ct >> 8 & 255;
    ctShift[3] = ct & 255;
    t = sm3(concatBytes(z, ctShift, IV2));
    ct++;
    offset = 0;
  };
  nextT();
  for (let i = 0, len = msg.length; i < len; i++) {
    if (offset === t.length)
      nextT();
    msg[i] = t[offset++] & 255;
  }
  return msg;
}
var wPow2 = hexToNumber("80000000000000000000000000000000");
var wPow2Sub1 = hexToNumber("7fffffffffffffffffffffffffffffff");
function calculateSharedKey(keypairA, ephemeralKeypairA, publicKeyB, ephemeralPublicKeyB, sharedKeyLength, isRecipient = false, idA = "1234567812345678", idB = "1234567812345678") {
  const RA = sm2Curve.ProjectivePoint.fromHex(ephemeralKeypairA.publicKey);
  const RB = sm2Curve.ProjectivePoint.fromHex(ephemeralPublicKeyB);
  const PB = sm2Curve.ProjectivePoint.fromHex(publicKeyB);
  let ZA = getZ(keypairA.publicKey, idA);
  let ZB = getZ(publicKeyB, idB);
  if (isRecipient) {
    [ZA, ZB] = [ZB, ZA];
  }
  const rA = hexToNumber(ephemeralKeypairA.privateKey);
  const dA = hexToNumber(keypairA.privateKey);
  const x1 = RA.x;
  const x1_ = wPow2 + (x1 & wPow2Sub1);
  const tA = field.add(dA, field.mulN(x1_, rA));
  const x2 = RB.x;
  const x2_ = field.add(wPow2, x2 & wPow2Sub1);
  const U = RB.multiply(x2_).add(PB).multiply(tA);
  const xU = hexToArray(leftPad(numberToHexUnpadded(U.x), 64));
  const yU = hexToArray(leftPad(numberToHexUnpadded(U.y), 64));
  const KA = kdf(concatBytes(xU, yU, ZA, ZB), sharedKeyLength);
  return KA;
}
var { getSharedSecret } = sm2Curve;
function xorCipherStream(x2, y2, msg) {
  const stream = kdf(concatBytes(x2, y2), msg.length);
  for (let i = 0, len = msg.length; i < len; i++) {
    msg[i] ^= stream[i] & 255;
  }
}
var C1C2C3 = 0;
var EmptyArray = new Uint8Array();
function doEncrypt(msg, publicKey, cipherMode = 1, options) {
  const msgArr = typeof msg === "string" ? hexToArray(utf8ToHex(msg)) : Uint8Array.from(msg);
  const publicKeyPoint = typeof publicKey === "string" ? sm2Curve.ProjectivePoint.fromHex(publicKey) : publicKey;
  const keypair = generateKeyPairHex();
  const k = hexToNumber(keypair.privateKey);
  let c1 = keypair.publicKey;
  if (c1.length > 128)
    c1 = c1.substring(c1.length - 128);
  const p = publicKeyPoint.multiply(k);
  const x2 = hexToArray(leftPad(numberToHexUnpadded(p.x), 64));
  const y2 = hexToArray(leftPad(numberToHexUnpadded(p.y), 64));
  const c3 = bytesToHex(sm3(concatBytes(x2, msgArr, y2)));
  xorCipherStream(x2, y2, msgArr);
  const c2 = bytesToHex(msgArr);
  if (options?.asn1) {
    const point = sm2Curve.ProjectivePoint.fromHex(keypair.publicKey);
    const encode = cipherMode === C1C2C3 ? encodeEnc(point.x, point.y, c2, c3) : encodeEnc(point.x, point.y, c3, c2);
    return encode;
  }
  return cipherMode === C1C2C3 ? c1 + c2 + c3 : c1 + c3 + c2;
}
function doDecrypt(encryptData, privateKey, cipherMode = 1, options) {
  const { output = "string", asn1 = false } = options || {};
  const privateKeyInteger = hexToNumber(privateKey);
  let c1;
  let c2;
  let c3;
  if (asn1) {
    const { x: x3, y, cipher, hash } = decodeEnc(encryptData);
    c1 = sm2Curve.ProjectivePoint.fromAffine({ x: x3, y });
    c3 = hash;
    c2 = cipher;
    if (cipherMode === C1C2C3) {
      [c2, c3] = [c3, c2];
    }
  } else {
    c1 = sm2Curve.ProjectivePoint.fromHex("04" + encryptData.substring(0, 128));
    c3 = encryptData.substring(128, 128 + 64);
    c2 = encryptData.substring(128 + 64);
    if (cipherMode === C1C2C3) {
      c3 = encryptData.substring(encryptData.length - 64);
      c2 = encryptData.substring(128, encryptData.length - 64);
    }
  }
  const msg = hexToArray(c2);
  const p = c1.multiply(privateKeyInteger);
  const x2 = hexToArray(leftPad(numberToHexUnpadded(p.x), 64));
  const y2 = hexToArray(leftPad(numberToHexUnpadded(p.y), 64));
  xorCipherStream(x2, y2, msg);
  const checkC3 = arrayToHex(Array.from(sm3(concatBytes(x2, msg, y2))));
  if (checkC3 === c3.toLowerCase()) {
    return output === "array" ? msg : arrayToUtf8(msg);
  } else {
    return output === "array" ? [] : "";
  }
}
function doSignature(msg, privateKey, options = {}) {
  let {
    pointPool,
    der,
    hash,
    publicKey,
    userId
  } = options;
  let hashHex = typeof msg === "string" ? utf8ToHex(msg) : arrayToHex(Array.from(msg));
  if (hash) {
    publicKey = publicKey || getPublicKeyFromPrivateKey(privateKey);
    hashHex = getHash(hashHex, publicKey, userId);
  }
  const dA = hexToNumber(privateKey);
  const e = hexToNumber(hashHex);
  let k = null;
  let r = null;
  let s = null;
  do {
    do {
      let point;
      if (pointPool && pointPool.length) {
        point = pointPool.pop();
      } else {
        point = getPoint();
      }
      k = point.k;
      r = field.add(e, point.x1);
    } while (r === ZERO || r + k === sm2Curve.CURVE.n);
    s = field.mul(field.inv(field.addN(dA, ONE)), field.subN(k, field.mulN(r, dA)));
  } while (s === ZERO);
  if (der)
    return encodeDer(r, s);
  return leftPad(numberToHexUnpadded(r), 64) + leftPad(numberToHexUnpadded(s), 64);
}
function doVerifySignature(msg, signHex, publicKey, options = {}) {
  let hashHex;
  const {
    hash,
    der,
    userId
  } = options;
  const publicKeyHex = typeof publicKey === "string" ? publicKey : publicKey.toHex(false);
  if (hash) {
    hashHex = getHash(typeof msg === "string" ? utf8ToHex(msg) : msg, publicKeyHex, userId);
  } else {
    hashHex = typeof msg === "string" ? utf8ToHex(msg) : arrayToHex(Array.from(msg));
  }
  let r;
  let s;
  if (der) {
    const decodeDerObj = decodeDer(signHex);
    r = decodeDerObj.r;
    s = decodeDerObj.s;
  } else {
    r = hexToNumber(signHex.substring(0, 64));
    s = hexToNumber(signHex.substring(64));
  }
  const PA = typeof publicKey === "string" ? sm2Curve.ProjectivePoint.fromHex(publicKey) : publicKey;
  const e = hexToNumber(hashHex);
  const t = field.add(r, s);
  if (t === ZERO)
    return false;
  const x1y1 = sm2Curve.ProjectivePoint.BASE.multiply(s).add(PA.multiply(t));
  const R = field.add(e, x1y1.x);
  return r === R;
}
function getZ(publicKey, userId = "1234567812345678") {
  userId = utf8ToHex(userId);
  const a = leftPad(numberToHexUnpadded(sm2Curve.CURVE.a), 64);
  const b = leftPad(numberToHexUnpadded(sm2Curve.CURVE.b), 64);
  const gx = leftPad(numberToHexUnpadded(sm2Curve.ProjectivePoint.BASE.x), 64);
  const gy = leftPad(numberToHexUnpadded(sm2Curve.ProjectivePoint.BASE.y), 64);
  let px;
  let py;
  if (publicKey.length === 128) {
    px = publicKey.substring(0, 64);
    py = publicKey.substring(64, 128);
  } else {
    const point = sm2Curve.ProjectivePoint.fromHex(publicKey);
    px = leftPad(numberToHexUnpadded(point.x), 64);
    py = leftPad(numberToHexUnpadded(point.y), 64);
  }
  const data = hexToArray(userId + a + b + gx + gy + px + py);
  const entl = userId.length * 4;
  const z = sm3(concatBytes(new Uint8Array([entl >> 8 & 255, entl & 255]), data));
  return z;
}
function getHash(hashHex, publicKey, userId = "1234567812345678") {
  const z = getZ(publicKey, userId);
  return bytesToHex(sm3(concatBytes(z, typeof hashHex === "string" ? hexToArray(hashHex) : hashHex)));
}
function precomputePublicKey(publicKey, windowSize) {
  const point = sm2Curve.ProjectivePoint.fromHex(publicKey);
  return sm2Curve.utils.precompute(windowSize, point);
}
function getPublicKeyFromPrivateKey(privateKey) {
  const pubKey = sm2Curve.getPublicKey(privateKey, false);
  const pubPad = leftPad(bytesToHex$1(pubKey), 64);
  return pubPad;
}
function getPoint() {
  const keypair = generateKeyPairHex();
  const PA = sm2Curve.ProjectivePoint.fromHex(keypair.publicKey);
  const k = hexToNumber(keypair.privateKey);
  return {
    ...keypair,
    k,
    x1: PA.x
  };
}
var sm4_exports = {};
__export(sm4_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt,
  sm4: () => sm4
});
var DECRYPT = 0;
var ROUND = 32;
var BLOCK = 16;
var Sbox = Uint8Array.from([
  214,
  144,
  233,
  254,
  204,
  225,
  61,
  183,
  22,
  182,
  20,
  194,
  40,
  251,
  44,
  5,
  43,
  103,
  154,
  118,
  42,
  190,
  4,
  195,
  170,
  68,
  19,
  38,
  73,
  134,
  6,
  153,
  156,
  66,
  80,
  244,
  145,
  239,
  152,
  122,
  51,
  84,
  11,
  67,
  237,
  207,
  172,
  98,
  228,
  179,
  28,
  169,
  201,
  8,
  232,
  149,
  128,
  223,
  148,
  250,
  117,
  143,
  63,
  166,
  71,
  7,
  167,
  252,
  243,
  115,
  23,
  186,
  131,
  89,
  60,
  25,
  230,
  133,
  79,
  168,
  104,
  107,
  129,
  178,
  113,
  100,
  218,
  139,
  248,
  235,
  15,
  75,
  112,
  86,
  157,
  53,
  30,
  36,
  14,
  94,
  99,
  88,
  209,
  162,
  37,
  34,
  124,
  59,
  1,
  33,
  120,
  135,
  212,
  0,
  70,
  87,
  159,
  211,
  39,
  82,
  76,
  54,
  2,
  231,
  160,
  196,
  200,
  158,
  234,
  191,
  138,
  210,
  64,
  199,
  56,
  181,
  163,
  247,
  242,
  206,
  249,
  97,
  21,
  161,
  224,
  174,
  93,
  164,
  155,
  52,
  26,
  85,
  173,
  147,
  50,
  48,
  245,
  140,
  177,
  227,
  29,
  246,
  226,
  46,
  130,
  102,
  202,
  96,
  192,
  41,
  35,
  171,
  13,
  83,
  78,
  111,
  213,
  219,
  55,
  69,
  222,
  253,
  142,
  47,
  3,
  255,
  106,
  114,
  109,
  108,
  91,
  81,
  141,
  27,
  175,
  146,
  187,
  221,
  188,
  127,
  17,
  217,
  92,
  65,
  31,
  16,
  90,
  216,
  10,
  193,
  49,
  136,
  165,
  205,
  123,
  189,
  45,
  116,
  208,
  18,
  184,
  229,
  180,
  176,
  137,
  105,
  151,
  74,
  12,
  150,
  119,
  126,
  101,
  185,
  241,
  9,
  197,
  110,
  198,
  132,
  24,
  240,
  125,
  236,
  58,
  220,
  77,
  32,
  121,
  238,
  95,
  62,
  215,
  203,
  57,
  72
]);
var CK = new Uint32Array([
  462357,
  472066609,
  943670861,
  1415275113,
  1886879365,
  2358483617,
  2830087869,
  3301692121,
  3773296373,
  4228057617,
  404694573,
  876298825,
  1347903077,
  1819507329,
  2291111581,
  2762715833,
  3234320085,
  3705924337,
  4177462797,
  337322537,
  808926789,
  1280531041,
  1752135293,
  2223739545,
  2695343797,
  3166948049,
  3638552301,
  4110090761,
  269950501,
  741554753,
  1213159005,
  1684763257
]);
function byteSub(a) {
  return (Sbox[a >>> 24 & 255] & 255) << 24 | (Sbox[a >>> 16 & 255] & 255) << 16 | (Sbox[a >>> 8 & 255] & 255) << 8 | Sbox[a & 255] & 255;
}
function sms4Crypt(input, output, roundKey) {
  let x0 = 0, x1 = 0, x2 = 0, x3 = 0, tmp0 = 0, tmp1 = 0, tmp2 = 0, tmp3 = 0;
  tmp0 = input[0] & 255;
  tmp1 = input[1] & 255;
  tmp2 = input[2] & 255;
  tmp3 = input[3] & 255;
  x0 = tmp0 << 24 | tmp1 << 16 | tmp2 << 8 | tmp3;
  tmp0 = input[4] & 255;
  tmp1 = input[5] & 255;
  tmp2 = input[6] & 255;
  tmp3 = input[7] & 255;
  x1 = tmp0 << 24 | tmp1 << 16 | tmp2 << 8 | tmp3;
  tmp0 = input[8] & 255;
  tmp1 = input[9] & 255;
  tmp2 = input[10] & 255;
  tmp3 = input[11] & 255;
  x2 = tmp0 << 24 | tmp1 << 16 | tmp2 << 8 | tmp3;
  tmp0 = input[12] & 255;
  tmp1 = input[13] & 255;
  tmp2 = input[14] & 255;
  tmp3 = input[15] & 255;
  x3 = tmp0 << 24 | tmp1 << 16 | tmp2 << 8 | tmp3;
  for (let r = 0; r < 32; r += 4) {
    tmp0 = x1 ^ x2 ^ x3 ^ roundKey[r];
    tmp0 = byteSub(tmp0);
    x0 ^= tmp0 ^ (tmp0 << 2 | tmp0 >>> 30) ^ (tmp0 << 10 | tmp0 >>> 22) ^ (tmp0 << 18 | tmp0 >>> 14) ^ (tmp0 << 24 | tmp0 >>> 8);
    tmp1 = x2 ^ x3 ^ x0 ^ roundKey[r + 1];
    tmp1 = byteSub(tmp1);
    x1 ^= tmp1 ^ (tmp1 << 2 | tmp1 >>> 30) ^ (tmp1 << 10 | tmp1 >>> 22) ^ (tmp1 << 18 | tmp1 >>> 14) ^ (tmp1 << 24 | tmp1 >>> 8);
    tmp2 = x3 ^ x0 ^ x1 ^ roundKey[r + 2];
    tmp2 = byteSub(tmp2);
    x2 ^= tmp2 ^ (tmp2 << 2 | tmp2 >>> 30) ^ (tmp2 << 10 | tmp2 >>> 22) ^ (tmp2 << 18 | tmp2 >>> 14) ^ (tmp2 << 24 | tmp2 >>> 8);
    tmp3 = x0 ^ x1 ^ x2 ^ roundKey[r + 3];
    tmp3 = byteSub(tmp3);
    x3 ^= tmp3 ^ (tmp3 << 2 | tmp3 >>> 30) ^ (tmp3 << 10 | tmp3 >>> 22) ^ (tmp3 << 18 | tmp3 >>> 14) ^ (tmp3 << 24 | tmp3 >>> 8);
  }
  output[0] = x3 >>> 24 & 255;
  output[1] = x3 >>> 16 & 255;
  output[2] = x3 >>> 8 & 255;
  output[3] = x3 & 255;
  output[4] = x2 >>> 24 & 255;
  output[5] = x2 >>> 16 & 255;
  output[6] = x2 >>> 8 & 255;
  output[7] = x2 & 255;
  output[8] = x1 >>> 24 & 255;
  output[9] = x1 >>> 16 & 255;
  output[10] = x1 >>> 8 & 255;
  output[11] = x1 & 255;
  output[12] = x0 >>> 24 & 255;
  output[13] = x0 >>> 16 & 255;
  output[14] = x0 >>> 8 & 255;
  output[15] = x0 & 255;
}
function sms4KeyExt(key, roundKey, cryptFlag) {
  let x0 = 0, x1 = 0, x2 = 0, x3 = 0, mid = 0;
  x0 = (key[0] & 255) << 24 | (key[1] & 255) << 16 | (key[2] & 255) << 8 | key[3] & 255;
  x1 = (key[4] & 255) << 24 | (key[5] & 255) << 16 | (key[6] & 255) << 8 | key[7] & 255;
  x2 = (key[8] & 255) << 24 | (key[9] & 255) << 16 | (key[10] & 255) << 8 | key[11] & 255;
  x3 = (key[12] & 255) << 24 | (key[13] & 255) << 16 | (key[14] & 255) << 8 | key[15] & 255;
  x0 ^= 2746333894;
  x1 ^= 1453994832;
  x2 ^= 1736282519;
  x3 ^= 2993693404;
  for (let r = 0; r < 32; r += 4) {
    mid = x1 ^ x2 ^ x3 ^ CK[r + 0];
    mid = byteSub(mid);
    x0 ^= mid ^ (mid << 13 | mid >>> 19) ^ (mid << 23 | mid >>> 9);
    roundKey[r + 0] = x0;
    mid = x2 ^ x3 ^ x0 ^ CK[r + 1];
    mid = byteSub(mid);
    x1 ^= mid ^ (mid << 13 | mid >>> 19) ^ (mid << 23 | mid >>> 9);
    roundKey[r + 1] = x1;
    mid = x3 ^ x0 ^ x1 ^ CK[r + 2];
    mid = byteSub(mid);
    x2 ^= mid ^ (mid << 13 | mid >>> 19) ^ (mid << 23 | mid >>> 9);
    roundKey[r + 2] = x2;
    mid = x0 ^ x1 ^ x2 ^ CK[r + 3];
    mid = byteSub(mid);
    x3 ^= mid ^ (mid << 13 | mid >>> 19) ^ (mid << 23 | mid >>> 9);
    roundKey[r + 3] = x3;
  }
  if (cryptFlag === DECRYPT) {
    for (let r = 0; r < 16; r++) {
      [roundKey[r], roundKey[31 - r]] = [roundKey[31 - r], roundKey[r]];
    }
  }
}
function incrementCounter(counter) {
  for (let i = counter.length - 1; i >= 0; i--) {
    counter[i]++;
    if (counter[i] !== 0)
      break;
  }
}
function sm4Gcm(inArray, key, ivArray, aadArray, cryptFlag, tagArray) {
  function deriveKeys() {
    const roundKey2 = new Uint32Array(ROUND);
    sms4KeyExt(key, roundKey2, 1);
    const authKey = new Uint8Array(16).fill(0);
    const h2 = new Uint8Array(16);
    sms4Crypt(authKey, h2, roundKey2);
    let j02;
    if (ivArray.length === 12) {
      j02 = new Uint8Array(16);
      j02.set(ivArray, 0);
      j02[15] = 1;
    } else {
      const g = ghash.create(h2);
      g.update(ivArray);
      const lenIv = new Uint8Array(16);
      const view = createView$1(lenIv);
      setBigUint64$1(view, 8, BigInt(ivArray.length * 8), false);
      g.update(lenIv);
      j02 = g.digest();
    }
    const counter2 = new Uint8Array(j02);
    incrementCounter(counter2);
    const tagMask2 = new Uint8Array(16);
    sms4Crypt(j02, tagMask2, roundKey2);
    return { roundKey: roundKey2, h: h2, j0: j02, counter: counter2, tagMask: tagMask2 };
  }
  function computeTag(h2, data) {
    const aadLength = aadArray.length;
    const dataLength = data.length;
    const g = ghash.create(h2);
    if (aadLength > 0) {
      g.update(aadArray);
    }
    g.update(data);
    const lenBlock = new Uint8Array(16);
    const view = createView$1(lenBlock);
    setBigUint64$1(view, 0, BigInt(aadLength * 8), false);
    setBigUint64$1(view, 8, BigInt(dataLength * 8), false);
    g.update(lenBlock);
    return g.digest();
  }
  const { roundKey, h, counter, tagMask } = deriveKeys();
  if (cryptFlag === DECRYPT && tagArray) {
    const calculatedTag = computeTag(h, inArray);
    for (let i = 0; i < 16; i++) {
      calculatedTag[i] ^= tagMask[i];
    }
    let tagMatch = 0;
    for (let i = 0; i < 16; i++) {
      tagMatch |= calculatedTag[i] ^ tagArray[i];
    }
    if (tagMatch !== 0) {
      throw new Error("authentication tag mismatch");
    }
  }
  const outArray = new Uint8Array(inArray.length);
  let point = 0;
  let restLen = inArray.length;
  while (restLen >= BLOCK) {
    const blockOut = new Uint8Array(BLOCK);
    sms4Crypt(counter, blockOut, roundKey);
    for (let i = 0; i < BLOCK && i < restLen; i++) {
      outArray[point + i] = inArray[point + i] ^ blockOut[i];
    }
    incrementCounter(counter);
    point += BLOCK;
    restLen -= BLOCK;
  }
  if (restLen > 0) {
    const blockOut = new Uint8Array(BLOCK);
    sms4Crypt(counter, blockOut, roundKey);
    for (let i = 0; i < restLen; i++) {
      outArray[point + i] = inArray[point + i] ^ blockOut[i];
    }
  }
  if (cryptFlag !== DECRYPT) {
    const calculatedTag = computeTag(h, outArray);
    for (let i = 0; i < 16; i++) {
      calculatedTag[i] ^= tagMask[i];
    }
    return { output: outArray, tag: calculatedTag };
  }
  return { output: outArray };
}
var blockOutput = new Uint8Array(16);
function sm4(inArray, key, cryptFlag, options = {}) {
  let {
    padding = "pkcs#7",
    mode,
    iv = new Uint8Array(16),
    output,
    associatedData,
    outputTag,
    tag
  } = options;
  if (mode === "gcm") {
    const keyArray = typeof key === "string" ? hexToArray(key) : Uint8Array.from(key);
    const ivArray = typeof iv === "string" ? hexToArray(iv) : Uint8Array.from(iv);
    const aadArray = associatedData ? typeof associatedData === "string" ? hexToArray(associatedData) : Uint8Array.from(associatedData) : new Uint8Array(0);
    let inputArray;
    if (typeof inArray === "string") {
      if (cryptFlag !== DECRYPT) {
        inputArray = utf8ToArray(inArray);
      } else {
        inputArray = hexToArray(inArray);
      }
    } else {
      inputArray = Uint8Array.from(inArray);
    }
    const tagArray = tag ? typeof tag === "string" ? hexToArray(tag) : Uint8Array.from(tag) : void 0;
    const result = sm4Gcm(inputArray, keyArray, ivArray, aadArray, cryptFlag, tagArray);
    if (output === "array") {
      if (outputTag && cryptFlag !== DECRYPT) {
        return result;
      }
      return result.output;
    } else {
      if (outputTag && cryptFlag !== DECRYPT) {
        return {
          output: bytesToHex(result.output),
          tag: result.tag ? bytesToHex(result.tag) : void 0
        };
      }
      if (cryptFlag !== DECRYPT) {
        return {
          output: bytesToHex(result.output),
          tag: result.tag ? bytesToHex(result.tag) : void 0
        };
      } else {
        return arrayToUtf8(result.output);
      }
    }
  }
  if (mode === "cbc") {
    if (typeof iv === "string")
      iv = hexToArray(iv);
    if (iv.length !== 128 / 8) {
      throw new Error("iv is invalid");
    }
  }
  if (typeof key === "string")
    key = hexToArray(key);
  if (key.length !== 128 / 8) {
    throw new Error("key is invalid");
  }
  if (typeof inArray === "string") {
    if (cryptFlag !== DECRYPT) {
      inArray = utf8ToArray(inArray);
    } else {
      inArray = hexToArray(inArray);
    }
  } else {
    inArray = Uint8Array.from(inArray);
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag !== DECRYPT) {
    const paddingCount = BLOCK - inArray.length % BLOCK;
    const newArray = new Uint8Array(inArray.length + paddingCount);
    newArray.set(inArray, 0);
    for (let i = 0; i < paddingCount; i++)
      newArray[inArray.length + i] = paddingCount;
    inArray = newArray;
  }
  const roundKey = new Uint32Array(ROUND);
  sms4KeyExt(key, roundKey, cryptFlag);
  let outArray = new Uint8Array(inArray.length);
  let lastVector = iv;
  let restLen = inArray.length;
  let point = 0;
  while (restLen >= BLOCK) {
    const input = inArray.subarray(point, point + 16);
    if (mode === "cbc") {
      for (let i = 0; i < BLOCK; i++) {
        if (cryptFlag !== DECRYPT) {
          input[i] ^= lastVector[i];
        }
      }
    }
    sms4Crypt(input, blockOutput, roundKey);
    for (let i = 0; i < BLOCK; i++) {
      if (mode === "cbc") {
        if (cryptFlag === DECRYPT) {
          blockOutput[i] ^= lastVector[i];
        }
      }
      outArray[point + i] = blockOutput[i];
    }
    if (mode === "cbc") {
      if (cryptFlag !== DECRYPT) {
        lastVector = blockOutput;
      } else {
        lastVector = input;
      }
    }
    restLen -= BLOCK;
    point += BLOCK;
  }
  if ((padding === "pkcs#5" || padding === "pkcs#7") && cryptFlag === DECRYPT) {
    const len = outArray.length;
    const paddingCount = outArray[len - 1];
    for (let i = 1; i <= paddingCount; i++) {
      if (outArray[len - i] !== paddingCount)
        throw new Error("padding is invalid");
    }
    outArray = outArray.slice(0, len - paddingCount);
  }
  if (output !== "array") {
    if (cryptFlag !== DECRYPT) {
      return bytesToHex(outArray);
    } else {
      return arrayToUtf8(outArray);
    }
  } else {
    return outArray;
  }
}
function encrypt(inArray, key, options = {}) {
  return sm4(inArray, key, 1, options);
}
function decrypt(inArray, key, options = {}) {
  return sm4(inArray, key, 0, options);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
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
    return sm2_exports.generateKeyPairHex();
  }
  encrypt(content, publicKey) {
    return "04" + sm2_exports.doEncrypt(content, publicKey, this.cipherMode);
  }
  decrypt(content, privateKey) {
    let data = content.substring(2).toLocaleLowerCase();
    return sm2_exports.doDecrypt(data, privateKey, this.cipherMode, { output: "string" });
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
    return sm4_exports.encrypt(content, publicKey, { output: "string" });
  }
  decrypt(content, privateKey) {
    return sm4_exports.decrypt(content, privateKey, { output: "string" });
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
