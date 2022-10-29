var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { lodash, ContentTypeEnum, Base64, moment } from "@herodotus/utils";
import { Axios, Base64 as Base642, ContentTypeEnum as ContentTypeEnum2, lodash as lodash2, moment as moment2 } from "@herodotus/utils";
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
class BaseBpmnService extends Service {
  getCountAddress() {
    return this.getBaseAddress() + "/count";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  createAddressWithParam(params, operation = "") {
    let builder = new PathParamBuilder(this.getBaseAddress());
    if (operation) {
      return builder.withParam(params).setOperation(operation).build();
    } else {
      return builder.withParam(params).build();
    }
  }
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
  getList(pageable, count, params = {}) {
    const full = Object.assign(params, {
      sortBy: "id",
      sortOrder: "desc",
      firstResult: (pageable.pageNumber - 1) * pageable.pageSize,
      maxResults: pageable.pageSize
    });
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().get(this.getBaseAddress(), full).then((result) => {
        const data = {
          content: result.data,
          totalPages: count ? (count + pageable.pageSize - 1) / pageable.pageSize : count,
          totalElements: String(count)
        };
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getPostList(pageable, count, params = {}) {
    const query = {
      firstResult: (pageable.pageNumber - 1) * pageable.pageSize,
      maxResults: pageable.pageSize
    };
    const body = Object.assign(params, {
      sorting: {
        sortBy: "id",
        sortOrder: "desc"
      }
    });
    return new Promise((resolve, reject) => {
      this.getConfig().getHttp().postWithParams(this.getBaseAddress(), query, body).then((result) => {
        const data = {
          content: result.data,
          totalPages: count ? (count + pageable.pageSize - 1) / pageable.pageSize : count,
          totalElements: String(count)
        };
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getByPage(pageable, params = {}) {
    return new Promise((resolve, reject) => {
      this.getCount(params).then((count) => {
        this.getPostList(pageable, count, params).then((result) => {
          resolve(result);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getByPageOnPost(pageable, params = {}) {
    return new Promise((resolve, reject) => {
      this.getPostCount(params).then((count) => {
        this.getList(pageable, count, params).then((result) => {
          resolve(result);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
  getById(id) {
    return this.getConfig().getHttp().get(this.createAddressWithParam({ id }));
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
    const address = this.getBaseAddress() + "/create";
    return this.getConfig().getHttp().post(address, formData, { contentType: ContentTypeEnum.MULTI_PART });
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
  get(path) {
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
  bpmnDeployment() {
    return DeploymentService.getInstance(this.config);
  }
  bpmnProcessDefinition() {
    return ProcessDefinitionService.getInstance(this.config);
  }
  bpmnProcessInstance() {
    return ProcessInstanceService.getInstance(this.config);
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
  BaseBpmnService,
  BaseService,
  BucketService,
  CaptchaCategoryEnum,
  ConstantEnum,
  ContentTypeEnum2 as ContentTypeEnum,
  DatabaseAccountService,
  DatabaseCatalogService,
  DatabaseInstanceService,
  DeploymentService,
  GenderEnum,
  IdentityEnum,
  MultipartUploadService,
  OAuth2ApiService,
  OAuth2ApplicationService,
  OAuth2AuthorizationService,
  OAuth2ComplianceService,
  OAuth2ScopeService,
  OpenApiService,
  ProcessDefinitionService,
  ProcessInstanceService,
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
  createApi,
  lodash2 as lodash,
  moment2 as moment
};
