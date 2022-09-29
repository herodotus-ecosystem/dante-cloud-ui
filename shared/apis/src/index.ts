import type { Axios } from '/@/declarations';

import {
  ApiConfig,
  OpenApiService,
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2TokenService,
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
  SysUserService
} from './lib';

class ApiResources {
  private static instance: ApiResources;
  private config = {} as ApiConfig;

  private constructor(config: ApiConfig) {
    this.config = config;
  }

  public static getInstance(config: ApiConfig): ApiResources {
    if (this.instance == null) {
      this.instance = new ApiResources(config);
    }
    return this.instance;
  }

  public open(): OpenApiService {
    return OpenApiService.getInstance(this.config);
  }

  public application(): OAuth2ApplicationService {
    return OAuth2ApplicationService.getInstance(this.config);
  }

  public scope(): OAuth2ScopeService {
    return OAuth2ScopeService.getInstance(this.config);
  }

  public token(): OAuth2TokenService {
    return OAuth2TokenService.getInstance(this.config);
  }

  public compliance(): OAuth2ComplianceService {
    return OAuth2ComplianceService.getInstance(this.config);
  }

  public server(): AssetServerService {
    return AssetServerService.getInstance(this.config);
  }

  public applicaiton(): AssetApplicationService {
    return AssetApplicationService.getInstance(this.config);
  }

  public account(): DatabaseAccountService {
    return DatabaseAccountService.getInstance(this.config);
  }

  public catalog(): DatabaseCatalogService {
    return DatabaseCatalogService.getInstance(this.config);
  }

  public instance(): DatabaseInstanceService {
    return DatabaseInstanceService.getInstance(this.config);
  }

  public uaa(): UaaConstantService {
    return UaaConstantService.getInstance(this.config);
  }

  public upms(): UpmsConstantService {
    return UpmsConstantService.getInstance(this.config);
  }

  public organization(): SysOrganizationService {
    return SysOrganizationService.getInstance(this.config);
  }

  public department(): SysDepartmentService {
    return SysDepartmentService.getInstance(this.config);
  }

  public employee(): SysEmployeeService {
    return SysEmployeeService.getInstance(this.config);
  }

  public allocatable(): SysEmployeeAllocatableService {
    return SysEmployeeAllocatableService.getInstance(this.config);
  }

  public bucket(): BucketService {
    return BucketService.getInstance(this.config);
  }

  public multipart(): MultipartUploadService {
    return MultipartUploadService.getInstance(this.config);
  }

  public authority(): SysAuthorityService {
    return SysAuthorityService.getInstance(this.config);
  }

  public defaultRole(): SysDefaultRoleService {
    return SysDefaultRoleService.getInstance(this.config);
  }

  public element(): SysElementService {
    return SysElementService.getInstance(this.config);
  }

  public securityAttribute(): SysSecurityAttributeService {
    return SysSecurityAttributeService.getInstance(this.config);
  }

  public role(): SysRoleService {
    return SysRoleService.getInstance(this.config);
  }

  public user(): SysUserService {
    return SysUserService.getInstance(this.config);
  }
}

const createApi = (project: string, clientId: string, clientSecret: string, http: Axios): ApiResources => {
  const config = new ApiConfig(project, clientId, clientSecret, http);
  return ApiResources.getInstance(config);
};

export * from './declarations';
export * from './enums';
export * from './lib';

export { createApi };
