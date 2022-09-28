var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { lodash, ContentTypeEnum } from "@herodotus/utils";
class ApiConfig {
  constructor(project, clientId, clientSecret, http) {
    __publicField(this, "http", {});
    __publicField(this, "project", "");
    __publicField(this, "clientId", "");
    __publicField(this, "clientSecret", "");
    __publicField(this, "uaaAddress", "");
    __publicField(this, "upmsAddress", "");
    __publicField(this, "bpmnAddress", "");
    __publicField(this, "cmdbAddress", "");
    this.project = project;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.http = http;
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
const _OAuth2TokenService = class extends BaseService {
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new _OAuth2TokenService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/authorization";
  }
};
let OAuth2TokenService = _OAuth2TokenService;
__publicField(OAuth2TokenService, "instance");
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
  open() {
    return OpenApiService.getInstance(this.config);
  }
  application() {
    return OAuth2ApplicationService.getInstance(this.config);
  }
  scope() {
    return OAuth2ScopeService.getInstance(this.config);
  }
  token() {
    return OAuth2TokenService.getInstance(this.config);
  }
  compliance() {
    return OAuth2ComplianceService.getInstance(this.config);
  }
  server() {
    return AssetServerService.getInstance(this.config);
  }
  applicaiton() {
    return AssetApplicationService.getInstance(this.config);
  }
  account() {
    return DatabaseAccountService.getInstance(this.config);
  }
  catalog() {
    return DatabaseCatalogService.getInstance(this.config);
  }
  instance() {
    return DatabaseInstanceService.getInstance(this.config);
  }
  uaa() {
    return UaaConstantService.getInstance(this.config);
  }
  upms() {
    return UpmsConstantService.getInstance(this.config);
  }
  organization() {
    return SysOrganizationService.getInstance(this.config);
  }
  department() {
    return SysDepartmentService.getInstance(this.config);
  }
  employee() {
    return SysEmployeeService.getInstance(this.config);
  }
  allocatable() {
    return SysEmployeeAllocatableService.getInstance(this.config);
  }
  bucket() {
    return BucketService.getInstance(this.config);
  }
  multipart() {
    return MultipartUploadService.getInstance(this.config);
  }
  authority() {
    return SysAuthorityService.getInstance(this.config);
  }
  defaultRole() {
    return SysDefaultRoleService.getInstance(this.config);
  }
  element() {
    return SysElementService.getInstance(this.config);
  }
  securityAttribute() {
    return SysSecurityAttributeService.getInstance(this.config);
  }
  role() {
    return SysRoleService.getInstance(this.config);
  }
  user() {
    return SysUserService.getInstance(this.config);
  }
};
let ApiResources = _ApiResources;
__publicField(ApiResources, "instance");
const createApi = (project, clientId, clientSecret, http) => {
  const config = new ApiConfig(project, clientId, clientSecret, http);
  return ApiResources.getInstance(config);
};
export {
  createApi as default
};
