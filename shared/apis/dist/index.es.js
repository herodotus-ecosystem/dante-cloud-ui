var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ContentTypeEnum, Base64 } from "@herodotus/utils";
import { Axios, Base64 as Base642, ContentTypeEnum as ContentTypeEnum2 } from "@herodotus/utils";
class ApiConfig {
  constructor(project, clientId, clientSecret, oidc, http) {
    __publicField(this, "http", {});
    __publicField(this, "project", "");
    __publicField(this, "clientId", "");
    __publicField(this, "clientSecret", "");
    __publicField(this, "oidc", false);
    __publicField(this, "uaaAddress", "");
    __publicField(this, "upmsAddress", "");
    __publicField(this, "bpmnAddress", "");
    __publicField(this, "cmdbAddress", "");
    this.project = project;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.http = http;
    this.oidc = oidc;
    this.switch(project);
  }
  switch(type) {
    switch (type) {
      case "dante":
        this.uaaAddress = "/dante-cloud-uaa";
        this.upmsAddress = "/dante-cloud-upms";
        this.bpmnAddress = "/dante-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/dante-cloud-cmdb-ability";
        break;
      case "herodotus":
        this.uaaAddress = "/herodotus-cloud-uaa";
        this.upmsAddress = "/herodotus-cloud-upms";
        this.bpmnAddress = "/herodotus-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/herodotus-cloud-cmdb-ability";
        break;
      default:
        this.uaaAddress = "";
        this.upmsAddress = "";
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
  getHttp() {
    return this.http;
  }
  getUaa() {
    return this.uaaAddress;
  }
  getUpms() {
    return this.upmsAddress;
  }
  getBpmn() {
    return this.bpmnAddress;
  }
  getCmdb() {
    return this.cmdbAddress;
  }
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
var nativeObjectToString$1 = objectProto$6.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$4.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$5 = Object.prototype;
var nativeObjectToString = objectProto$5.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
const isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$4 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$3).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$3 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$3;
  return value === proto;
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag$2 = "[object Set]", stringTag = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$2] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$1.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var Map = getNative(root$1, "Map");
const Map$1 = Map;
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var mapTag$1 = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray$1(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer$1(value) || isTypedArray$1(value) || isArguments$1(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
var AuthorityTypeEnum = /* @__PURE__ */ ((AuthorityTypeEnum2) => {
  AuthorityTypeEnum2[AuthorityTypeEnum2["API"] = 0] = "API";
  AuthorityTypeEnum2[AuthorityTypeEnum2["MENU"] = 1] = "MENU";
  AuthorityTypeEnum2[AuthorityTypeEnum2["PAGE"] = 2] = "PAGE";
  AuthorityTypeEnum2[AuthorityTypeEnum2["MINI_PAGE"] = 3] = "MINI_PAGE";
  return AuthorityTypeEnum2;
})(AuthorityTypeEnum || {});
var IdentityEnum = /* @__PURE__ */ ((IdentityEnum2) => {
  IdentityEnum2[IdentityEnum2["LEADERSHIP"] = 0] = "LEADERSHIP";
  IdentityEnum2[IdentityEnum2["SECTION_LEADER"] = 1] = "SECTION_LEADER";
  IdentityEnum2[IdentityEnum2["STAFF"] = 2] = "STAFF";
  return IdentityEnum2;
})(IdentityEnum || {});
var GenderEnum = /* @__PURE__ */ ((GenderEnum2) => {
  GenderEnum2[GenderEnum2["OTHERS"] = 0] = "OTHERS";
  GenderEnum2[GenderEnum2["MAN"] = 1] = "MAN";
  GenderEnum2[GenderEnum2["WOMAN"] = 2] = "WOMAN";
  return GenderEnum2;
})(GenderEnum || {});
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2[StatusEnum2["FORBIDDEN"] = 0] = "FORBIDDEN";
  StatusEnum2[StatusEnum2["ENABLE"] = 1] = "ENABLE";
  StatusEnum2[StatusEnum2["LOCKING"] = 2] = "LOCKING";
  StatusEnum2[StatusEnum2["EXPIRED"] = 3] = "EXPIRED";
  return StatusEnum2;
})(StatusEnum || {});
var ConstantEnum = /* @__PURE__ */ ((ConstantEnum2) => {
  ConstantEnum2["APPLICATION"] = "applicationType";
  ConstantEnum2["GENDER"] = "gender";
  ConstantEnum2["GRANT"] = "grantType";
  ConstantEnum2["IDENTITY"] = "identity";
  ConstantEnum2["STATUS"] = "status";
  ConstantEnum2["SUPPLIER"] = "supplierType";
  ConstantEnum2["TECHNOLOGY"] = "technologyType";
  ConstantEnum2["EXPRESSION"] = "expression";
  return ConstantEnum2;
})(ConstantEnum || {});
var ApplicationEnum = /* @__PURE__ */ ((ApplicationEnum2) => {
  ApplicationEnum2[ApplicationEnum2["WEB"] = 0] = "WEB";
  ApplicationEnum2[ApplicationEnum2["SERVICE"] = 1] = "SERVICE";
  ApplicationEnum2[ApplicationEnum2["APP"] = 2] = "APP";
  ApplicationEnum2[ApplicationEnum2["WAP"] = 3] = "WAP";
  ApplicationEnum2[ApplicationEnum2["MINI"] = 4] = "MINI";
  return ApplicationEnum2;
})(ApplicationEnum || {});
var TechnologyEnum = /* @__PURE__ */ ((TechnologyEnum2) => {
  TechnologyEnum2[TechnologyEnum2["JAVA"] = 0] = "JAVA";
  TechnologyEnum2[TechnologyEnum2["NET"] = 1] = "NET";
  TechnologyEnum2[TechnologyEnum2["PHP"] = 2] = "PHP";
  TechnologyEnum2[TechnologyEnum2["NODE"] = 3] = "NODE";
  TechnologyEnum2[TechnologyEnum2["IOS"] = 4] = "IOS";
  TechnologyEnum2[TechnologyEnum2["ANDROID"] = 5] = "ANDROID";
  TechnologyEnum2[TechnologyEnum2["WEAPP"] = 6] = "WEAPP";
  TechnologyEnum2[TechnologyEnum2["ALIAPP"] = 7] = "ALIAPP";
  TechnologyEnum2[TechnologyEnum2["DUAPP"] = 8] = "DUAPP";
  return TechnologyEnum2;
})(TechnologyEnum || {});
var SupplierType = /* @__PURE__ */ ((SupplierType2) => {
  SupplierType2[SupplierType2["CORE"] = 0] = "CORE";
  SupplierType2[SupplierType2["BAT"] = 1] = "BAT";
  SupplierType2[SupplierType2["THIRD_PARTY"] = 2] = "THIRD_PARTY";
  SupplierType2[SupplierType2["Outsourcing"] = 3] = "Outsourcing";
  return SupplierType2;
})(SupplierType || {});
var SocialSourceEnum = /* @__PURE__ */ ((SocialSourceEnum2) => {
  SocialSourceEnum2[SocialSourceEnum2["INSTITUTION"] = 0] = "INSTITUTION";
  SocialSourceEnum2[SocialSourceEnum2["SMS"] = 1] = "SMS";
  SocialSourceEnum2[SocialSourceEnum2["WXAPP"] = 2] = "WXAPP";
  SocialSourceEnum2[SocialSourceEnum2["QQ"] = 3] = "QQ";
  SocialSourceEnum2[SocialSourceEnum2["WEIBO"] = 4] = "WEIBO";
  SocialSourceEnum2[SocialSourceEnum2["BAIDU"] = 5] = "BAIDU";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_OPEN"] = 6] = "WECHAT_OPEN";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_MP"] = 7] = "WECHAT_MP";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_ENTERPRISE"] = 8] = "WECHAT_ENTERPRISE";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_ENTERPRISE_WEB"] = 9] = "WECHAT_ENTERPRISE_WEB";
  SocialSourceEnum2[SocialSourceEnum2["DINGTALK"] = 10] = "DINGTALK";
  SocialSourceEnum2[SocialSourceEnum2["DINGTALK_ACCOUNT"] = 11] = "DINGTALK_ACCOUNT";
  SocialSourceEnum2[SocialSourceEnum2["ALIYUN"] = 12] = "ALIYUN";
  SocialSourceEnum2[SocialSourceEnum2["TAOBAO"] = 13] = "TAOBAO";
  SocialSourceEnum2[SocialSourceEnum2["ALIPAY"] = 14] = "ALIPAY";
  SocialSourceEnum2[SocialSourceEnum2["TEAMBITION"] = 15] = "TEAMBITION";
  SocialSourceEnum2[SocialSourceEnum2["HUAWEI"] = 16] = "HUAWEI";
  SocialSourceEnum2[SocialSourceEnum2["FEISHU"] = 17] = "FEISHU";
  SocialSourceEnum2[SocialSourceEnum2["JD"] = 18] = "JD";
  SocialSourceEnum2[SocialSourceEnum2["DOUYIN"] = 19] = "DOUYIN";
  SocialSourceEnum2[SocialSourceEnum2["TOUTIAO"] = 20] = "TOUTIAO";
  SocialSourceEnum2[SocialSourceEnum2["MI"] = 21] = "MI";
  SocialSourceEnum2[SocialSourceEnum2["RENREN"] = 22] = "RENREN";
  SocialSourceEnum2[SocialSourceEnum2["MEITUAN"] = 23] = "MEITUAN";
  SocialSourceEnum2[SocialSourceEnum2["ELEME"] = 24] = "ELEME";
  SocialSourceEnum2[SocialSourceEnum2["KUJIALE"] = 25] = "KUJIALE";
  SocialSourceEnum2[SocialSourceEnum2["XMLY"] = 26] = "XMLY";
  SocialSourceEnum2[SocialSourceEnum2["GITEE"] = 27] = "GITEE";
  SocialSourceEnum2[SocialSourceEnum2["OSCHINA"] = 28] = "OSCHINA";
  SocialSourceEnum2[SocialSourceEnum2["CSDN"] = 29] = "CSDN";
  SocialSourceEnum2[SocialSourceEnum2["GITHUB"] = 30] = "GITHUB";
  SocialSourceEnum2[SocialSourceEnum2["GITLAB"] = 31] = "GITLAB";
  SocialSourceEnum2[SocialSourceEnum2["STACK_OVERFLOW"] = 32] = "STACK_OVERFLOW";
  SocialSourceEnum2[SocialSourceEnum2["CODING"] = 33] = "CODING";
  SocialSourceEnum2[SocialSourceEnum2["GOOGLE"] = 34] = "GOOGLE";
  SocialSourceEnum2[SocialSourceEnum2["MICROSOFT"] = 35] = "MICROSOFT";
  SocialSourceEnum2[SocialSourceEnum2["FACEBOOK"] = 36] = "FACEBOOK";
  SocialSourceEnum2[SocialSourceEnum2["LINKEDIN"] = 37] = "LINKEDIN";
  SocialSourceEnum2[SocialSourceEnum2["TWITTER"] = 38] = "TWITTER";
  SocialSourceEnum2[SocialSourceEnum2["AMAZON"] = 39] = "AMAZON";
  SocialSourceEnum2[SocialSourceEnum2["SLACK"] = 40] = "SLACK";
  SocialSourceEnum2[SocialSourceEnum2["LINE"] = 41] = "LINE";
  SocialSourceEnum2[SocialSourceEnum2["OKTA"] = 42] = "OKTA";
  SocialSourceEnum2[SocialSourceEnum2["PINTEREST"] = 43] = "PINTEREST";
  return SocialSourceEnum2;
})(SocialSourceEnum || {});
var CaptchaCategoryEnum = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
  CaptchaCategoryEnum2["JIGSAW"] = "JIGSAW";
  CaptchaCategoryEnum2["WORD_CLICK"] = "WORD_CLICK";
  CaptchaCategoryEnum2["ARITHMETIC"] = "ARITHMETIC";
  CaptchaCategoryEnum2["CHINESE"] = "CHINESE";
  CaptchaCategoryEnum2["CHINESE_GIF"] = "CHINESE_GIF";
  CaptchaCategoryEnum2["SPEC_GIF"] = "SPEC_GIF";
  CaptchaCategoryEnum2["SPEC"] = "SPEC";
  CaptchaCategoryEnum2["HUTOOL_LINE"] = "HUTOOL_LINE";
  CaptchaCategoryEnum2["HUTOOL_CIRCLE"] = "HUTOOL_CIRCLE";
  CaptchaCategoryEnum2["HUTOOL_SHEAR"] = "HUTOOL_SHEAR";
  CaptchaCategoryEnum2["HUTOOL_GIF"] = "HUTOOL_GIF";
  return CaptchaCategoryEnum2;
})(CaptchaCategoryEnum || {});
class Service {
  constructor(config) {
    __publicField(this, "config");
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
const _OAuth2ApplicationService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2ApplicationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/application";
  }
};
let OAuth2ApplicationService = _OAuth2ApplicationService;
__publicField(OAuth2ApplicationService, "instance");
const _OAuth2ScopeService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2ScopeService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/scope";
  }
  getAssignedAddress() {
    return this.getBaseAddress() + "/assigned";
  }
  getScopeCodePath(scopeCode) {
    return this.getParamPath(this.getBaseAddress(), scopeCode);
  }
  fetchByScopeCode(scopeCode) {
    return this.getConfig().getHttp().get(this.getScopeCodePath(scopeCode));
  }
  assigned(data) {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
};
let OAuth2ScopeService = _OAuth2ScopeService;
__publicField(OAuth2ScopeService, "instance");
const _OAuth2AuthorizationService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2AuthorizationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/authorization";
  }
};
let OAuth2AuthorizationService = _OAuth2AuthorizationService;
__publicField(OAuth2AuthorizationService, "instance");
const _OAuth2ComplianceService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2ComplianceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/compliance";
  }
};
let OAuth2ComplianceService = _OAuth2ComplianceService;
__publicField(OAuth2ComplianceService, "instance");
const _AssetServerService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _AssetServerService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getCmdb() + "/asset/server";
  }
};
let AssetServerService = _AssetServerService;
__publicField(AssetServerService, "instance");
const _AssetApplicationService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _AssetApplicationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getCmdb() + "/asset/application";
  }
};
let AssetApplicationService = _AssetApplicationService;
__publicField(AssetApplicationService, "instance");
const _DatabaseAccountService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _DatabaseAccountService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getCmdb() + "/db/account";
  }
};
let DatabaseAccountService = _DatabaseAccountService;
__publicField(DatabaseAccountService, "instance");
const _DatabaseCatalogService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _DatabaseCatalogService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getCmdb() + "/db/catalog";
  }
};
let DatabaseCatalogService = _DatabaseCatalogService;
__publicField(DatabaseCatalogService, "instance");
const _DatabaseInstanceService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _DatabaseInstanceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getCmdb() + "/db/instance";
  }
};
let DatabaseInstanceService = _DatabaseInstanceService;
__publicField(DatabaseInstanceService, "instance");
const _UaaConstantService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _UaaConstantService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/constant/enums";
  }
};
let UaaConstantService = _UaaConstantService;
__publicField(UaaConstantService, "instance");
const _UpmsConstantService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _UpmsConstantService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/constants/enums";
  }
};
let UpmsConstantService = _UpmsConstantService;
__publicField(UpmsConstantService, "instance");
const _SysOrganizationService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysOrganizationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/organization";
  }
};
let SysOrganizationService = _SysOrganizationService;
__publicField(SysOrganizationService, "instance");
const _SysDepartmentService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysDepartmentService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/department";
  }
};
let SysDepartmentService = _SysDepartmentService;
__publicField(SysDepartmentService, "instance");
const _SysEmployeeService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysEmployeeService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/employee";
  }
  getAssignedAddress() {
    return this.getBaseAddress() + "/assigned";
  }
  getAllocatableAddress() {
    return this.getBaseAddress() + "/allocatable";
  }
  getEmployeeNamePath(employeeName) {
    return this.getParamPath(this.getBaseAddress(), employeeName);
  }
  fetchByEmployeeName(employeeName) {
    return this.getConfig().getHttp().get(this.getEmployeeNamePath(employeeName));
  }
  fetchAssignedByPage(params, others = {}) {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get(this.getAssignedAddress(), fullParams);
  }
  deleteAllocatable(data) {
    return this.getConfig().getHttp().delete(this.getAllocatableAddress(), data);
  }
  saveAllocatable(data) {
    return this.getConfig().getHttp().post(this.getAllocatableAddress(), data);
  }
  authorizeUser(data) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
};
let SysEmployeeService = _SysEmployeeService;
__publicField(SysEmployeeService, "instance");
const _SysEmployeeAllocatableService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysEmployeeAllocatableService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/";
  }
};
let SysEmployeeAllocatableService = _SysEmployeeAllocatableService;
__publicField(SysEmployeeAllocatableService, "instance");
const _BucketService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _BucketService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return "/oss/minio/bucket";
  }
  remove(dto) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), dto);
  }
};
let BucketService = _BucketService;
__publicField(BucketService, "instance");
const _MultipartUploadService = class extends Service {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _MultipartUploadService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return "/oss/minio/multipart";
  }
  getCreateMultipartUploadAddress() {
    return this.getBaseAddress() + "/create";
  }
  getCompleteMultipartUploadAddress() {
    return this.getBaseAddress() + "/complete";
  }
  createMultipartUpload(domain) {
    return this.getConfig().getHttp().post(this.getCreateMultipartUploadAddress(), domain);
  }
  completeMultipartUpload(domain) {
    return this.getConfig().getHttp().post(this.getCompleteMultipartUploadAddress(), domain);
  }
};
let MultipartUploadService = _MultipartUploadService;
__publicField(MultipartUploadService, "instance");
const _SysAuthorityService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysAuthorityService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/authority";
  }
};
let SysAuthorityService = _SysAuthorityService;
__publicField(SysAuthorityService, "instance");
const _SysDefaultRoleService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysDefaultRoleService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/default-role";
  }
};
let SysDefaultRoleService = _SysDefaultRoleService;
__publicField(SysDefaultRoleService, "instance");
const _SysRoleService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysRoleService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/role";
  }
  getRoleCodePath(roleCode) {
    return this.getParamPath(this.getBaseAddress(), roleCode);
  }
  fetchByRoleCode(roleCode) {
    return this.getConfig().getHttp().get(this.getRoleCodePath(roleCode));
  }
};
let SysRoleService = _SysRoleService;
__publicField(SysRoleService, "instance");
const _SysSecurityAttributeService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysSecurityAttributeService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security-attribute";
  }
};
let SysSecurityAttributeService = _SysSecurityAttributeService;
__publicField(SysSecurityAttributeService, "instance");
const _SysUserService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysUserService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/user";
  }
  getUsernameAddress() {
    return this.getBaseAddress() + "/sign-in";
  }
  getChangePasswordAddress() {
    return this.getBaseAddress() + "/change-password";
  }
  getUsernamePath(username) {
    return this.getParamPath(this.getUsernameAddress(), username);
  }
  fetchByUsername(username) {
    return this.getConfig().getHttp().get(this.getUsernamePath(username));
  }
  changePassword(userId, password) {
    return this.getConfig().getHttp().put(
      this.getChangePasswordAddress(),
      { userId, password },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
};
let SysUserService = _SysUserService;
__publicField(SysUserService, "instance");
const _SysElementService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _SysElementService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/element";
  }
  fetchById(id) {
    return this.getConfig().getHttp().get(this.getIdPath(id));
  }
};
let SysElementService = _SysElementService;
__publicField(SysElementService, "instance");
const _OAuth2ApiService = class {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2ApiService(config);
    }
    return this.instance;
  }
  getOAuth2TokenAddress() {
    return this.config.getUaa() + "/oauth2/token";
  }
  getOAuth2RevokeAddress() {
    return this.config.getUaa() + "/oauth2/revoke";
  }
  getOAuth2SignOutAddress() {
    return this.config.getUaa() + "/oauth2/sign-out";
  }
  getBasicHeader() {
    return "Basic " + Base64.encode(this.config.getClientId() + ":" + this.config.getClientSecret());
  }
  signOut(token) {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  revoke(token) {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  refreshTokenFlow(refreshToken, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? { refresh_token: refreshToken, grant_type: "refresh_token", scope: "openid" } : { refresh_token: refreshToken, grant_type: "refresh_token" },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  passwordFlow(username, password, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? { username, password, grant_type: "password", scope: "openid" } : { username, password, grant_type: "password" },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  authorizationCodeFlow(code, redirect_uri, state = "", oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? { code, state, redirect_uri, grant_type: "authorization_code", scope: "openid" } : { code, state, redirect_uri, grant_type: "authorization_code" },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  socialCredentialsFlowBySms(mobile, code, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? { mobile, code, grant_type: "social_credentials", source: "SMS", scope: "openid" } : { mobile, code, grant_type: "social_credentials", source: "SMS" },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  socialCredentialsFlowByJustAuth(source, accessPrincipal, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? { ...accessPrincipal, grant_type: "social_credentials", source, scope: "openid" } : { ...accessPrincipal, grant_type: "social_credentials", source },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
};
let OAuth2ApiService = _OAuth2ApiService;
__publicField(OAuth2ApiService, "instance");
const _OpenApiService = class {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OpenApiService(config);
    }
    return this.instance;
  }
  createSession(sessionId = "") {
    const SECURE_SESSION = this.config.getUaa() + "/open/identity/session";
    return this.config.getHttp().post(SECURE_SESSION, {
      clientId: this.config.getClientId(),
      clientSecret: this.config.getClientSecret(),
      sessionId
    });
  }
  exchange(sessionId = "", confidential) {
    const SECURE_EXCHANGE = this.config.getUaa() + "/open/identity/exchange";
    return this.config.getHttp().post(SECURE_EXCHANGE, {
      confidential,
      sessionId
    });
  }
  getPrompt(username) {
    const SECURE_PROMPT = this.config.getUaa() + "/open/identity/prompt";
    return this.config.getHttp().post(SECURE_PROMPT, {
      username
    });
  }
  createCaptcha(sessionId, type) {
    const SECURE_CAPTCHA = this.config.getUaa() + "/open/captcha";
    return this.config.getHttp().get(SECURE_CAPTCHA, {
      identity: sessionId,
      category: type
    });
  }
  verifyCaptcha(identity, category, data) {
    const SECURE_CAPTCHA = this.config.getUaa() + "/open/captcha";
    const verify = {
      identity,
      category,
      coordinate: { x: 0, y: 0 },
      coordinates: [],
      characters: ""
    };
    if (category === CaptchaCategoryEnum.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum.JIGSAW) {
      verify.coordinate = data;
    } else {
      verify.characters = data;
    }
    return this.config.getHttp().post(SECURE_CAPTCHA, verify);
  }
  createVerificationCode(mobile) {
    const SECURE_VERIFICATION_CODE = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      SECURE_VERIFICATION_CODE,
      {
        mobile
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const SECURE_SOCIAL_LIST = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(SECURE_SOCIAL_LIST);
  }
};
let OpenApiService = _OpenApiService;
__publicField(OpenApiService, "instance");
const _ApiResources = class {
  constructor(config) {
    __publicField(this, "config", {});
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _ApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService.getInstance(this.config);
  }
  oauth2Application() {
    return OAuth2ApplicationService.getInstance(this.config);
  }
  oauth2Scope() {
    return OAuth2ScopeService.getInstance(this.config);
  }
  oauth2Authorization() {
    return OAuth2AuthorizationService.getInstance(this.config);
  }
  oauth2Compliance() {
    return OAuth2ComplianceService.getInstance(this.config);
  }
  assetServer() {
    return AssetServerService.getInstance(this.config);
  }
  assetApplication() {
    return AssetApplicationService.getInstance(this.config);
  }
  dbAccount() {
    return DatabaseAccountService.getInstance(this.config);
  }
  dbCatalog() {
    return DatabaseCatalogService.getInstance(this.config);
  }
  dbInstance() {
    return DatabaseInstanceService.getInstance(this.config);
  }
  uaaConstant() {
    return UaaConstantService.getInstance(this.config);
  }
  upmsConstant() {
    return UpmsConstantService.getInstance(this.config);
  }
  sysOrganization() {
    return SysOrganizationService.getInstance(this.config);
  }
  sysDepartment() {
    return SysDepartmentService.getInstance(this.config);
  }
  sysEmployee() {
    return SysEmployeeService.getInstance(this.config);
  }
  sysEmployeeAllocatable() {
    return SysEmployeeAllocatableService.getInstance(this.config);
  }
  minioBucket() {
    return BucketService.getInstance(this.config);
  }
  minioMultipart() {
    return MultipartUploadService.getInstance(this.config);
  }
  sysAuthority() {
    return SysAuthorityService.getInstance(this.config);
  }
  sysDefaultRole() {
    return SysDefaultRoleService.getInstance(this.config);
  }
  sysElement() {
    return SysElementService.getInstance(this.config);
  }
  sysSecurityAttribute() {
    return SysSecurityAttributeService.getInstance(this.config);
  }
  sysRole() {
    return SysRoleService.getInstance(this.config);
  }
  sysUser() {
    return SysUserService.getInstance(this.config);
  }
};
let ApiResources = _ApiResources;
__publicField(ApiResources, "instance");
const createApi = (project, clientId, clientSecret, oidc, http) => {
  const config = new ApiConfig(project, clientId, clientSecret, oidc, http);
  return ApiResources.getInstance(config);
};
export {
  ApiConfig,
  ApplicationEnum,
  AssetApplicationService,
  AssetServerService,
  AuthorityTypeEnum,
  Axios,
  Base642 as Base64,
  BaseService,
  BucketService,
  CaptchaCategoryEnum,
  ConstantEnum,
  ContentTypeEnum2 as ContentTypeEnum,
  DatabaseAccountService,
  DatabaseCatalogService,
  DatabaseInstanceService,
  GenderEnum,
  IdentityEnum,
  MultipartUploadService,
  OAuth2ApiService,
  OAuth2ApplicationService,
  OAuth2AuthorizationService,
  OAuth2ComplianceService,
  OAuth2ScopeService,
  OpenApiService,
  Service,
  SocialSourceEnum,
  StatusEnum,
  SupplierType,
  SysAuthorityService,
  SysDefaultRoleService,
  SysDepartmentService,
  SysElementService,
  SysEmployeeAllocatableService,
  SysEmployeeService,
  SysOrganizationService,
  SysRoleService,
  SysSecurityAttributeService,
  SysUserService,
  TechnologyEnum,
  UaaConstantService,
  UpmsConstantService,
  createApi
};
