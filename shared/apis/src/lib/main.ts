import { Axios, HttpConfig } from './base';
import { OpenApiService, OAuth2ApiService } from './secure';
import {
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2AuthorizationService,
  OAuth2ComplianceService,
  AssetServerService,
  AssetApplicationService,
  DatabaseAccountService,
  DatabaseCatalogService,
  DatabaseInstanceService,
  UaaConstantService,
  UpmsConstantService,
  SysOrganizationService,
  SysDepartmentService,
  SysEmployeeService,
  SysEmployeeAllocatableService,
  BucketService,
  MultipartUploadService,
  SysAuthorityService,
  SysDefaultRoleService,
  SysElementService,
  SysSecurityAttributeService,
  SysRoleService,
  SysUserService,
  ExtendedTaskService
} from './modules';

import {
  DialogueContactService,
  DialogueDetailService,
  NotificationService,
  WebSocketMessageService
} from './settings';

class ApiResources {
  private static instance: ApiResources;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): ApiResources {
    if (this.instance == null) {
      this.instance = new ApiResources(config);
    }
    return this.instance;
  }

  public getConfig(): HttpConfig {
    return this.config;
  }

  public open(): OpenApiService {
    return OpenApiService.getInstance(this.config);
  }

  public oauth2(): OAuth2ApiService {
    return OAuth2ApiService.getInstance(this.config);
  }

  public oauth2Application(): OAuth2ApplicationService {
    return OAuth2ApplicationService.getInstance(this.config);
  }

  public oauth2Scope(): OAuth2ScopeService {
    return OAuth2ScopeService.getInstance(this.config);
  }

  public oauth2Authorization(): OAuth2AuthorizationService {
    return OAuth2AuthorizationService.getInstance(this.config);
  }

  public oauth2Compliance(): OAuth2ComplianceService {
    return OAuth2ComplianceService.getInstance(this.config);
  }

  public assetServer(): AssetServerService {
    return AssetServerService.getInstance(this.config);
  }

  public assetApplication(): AssetApplicationService {
    return AssetApplicationService.getInstance(this.config);
  }

  public dbAccount(): DatabaseAccountService {
    return DatabaseAccountService.getInstance(this.config);
  }

  public dbCatalog(): DatabaseCatalogService {
    return DatabaseCatalogService.getInstance(this.config);
  }

  public dbInstance(): DatabaseInstanceService {
    return DatabaseInstanceService.getInstance(this.config);
  }

  public uaaConstant(): UaaConstantService {
    return UaaConstantService.getInstance(this.config);
  }

  public upmsConstant(): UpmsConstantService {
    return UpmsConstantService.getInstance(this.config);
  }

  public sysOrganization(): SysOrganizationService {
    return SysOrganizationService.getInstance(this.config);
  }

  public sysDepartment(): SysDepartmentService {
    return SysDepartmentService.getInstance(this.config);
  }

  public sysEmployee(): SysEmployeeService {
    return SysEmployeeService.getInstance(this.config);
  }

  public sysEmployeeAllocatable(): SysEmployeeAllocatableService {
    return SysEmployeeAllocatableService.getInstance(this.config);
  }

  public minioBucket(): BucketService {
    return BucketService.getInstance(this.config);
  }

  public minioMultipart(): MultipartUploadService {
    return MultipartUploadService.getInstance(this.config);
  }

  public sysAuthority(): SysAuthorityService {
    return SysAuthorityService.getInstance(this.config);
  }

  public sysDefaultRole(): SysDefaultRoleService {
    return SysDefaultRoleService.getInstance(this.config);
  }

  public sysElement(): SysElementService {
    return SysElementService.getInstance(this.config);
  }

  public sysSecurityAttribute(): SysSecurityAttributeService {
    return SysSecurityAttributeService.getInstance(this.config);
  }

  public sysRole(): SysRoleService {
    return SysRoleService.getInstance(this.config);
  }

  public sysUser(): SysUserService {
    return SysUserService.getInstance(this.config);
  }

  public dialogueContact(): DialogueContactService {
    return DialogueContactService.getInstance(this.config);
  }

  public dialogueDetail(): DialogueDetailService {
    return DialogueDetailService.getInstance(this.config);
  }

  public notification(): NotificationService {
    return NotificationService.getInstance(this.config);
  }

  public webSocketMessage(): WebSocketMessageService {
    return WebSocketMessageService.getInstance(this.config);
  }

  public task(): ExtendedTaskService {
    return ExtendedTaskService.getInstance(this.config);
  }
}

const createApi = (
  project: string,
  clientId: string,
  clientSecret: string,
  http: Axios,
  oidc: boolean
): ApiResources => {
  const config = new HttpConfig(project, clientId, clientSecret, http, oidc);
  return ApiResources.getInstance(config);
};

export { createApi };
