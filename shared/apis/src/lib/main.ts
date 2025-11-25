import type { HttpClientOptions } from '@/declarations';

import { Axios, HttpConfig } from './base';
import {
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2AuthorizationService,
  OAuth2CredentialRecordService,
  OAuth2UserLoggingService,
  OAuth2InterfaceAuditService,
  SysOrganizationService,
  SysDepartmentService,
  SysEmployeeService,
  SysEmployeeAllocatableService,
  SysPermissionService,
  SysRoleService,
  SysUserService,
  SysAttributeService,
  SysDefaultRoleService,
  SysElementService,
  SysTenantDataSourceService,
  SysDictionaryService,
  SocialBindingService,
  ExtendedTaskService,
  MgtCertificateService,
} from './modules';

import {
  DialogueContactService,
  DialogueDetailService,
  NotificationService,
  WebSocketMessageService,
} from './settings';

export class ApiResources {
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

  public oauth2Application(): OAuth2ApplicationService {
    return OAuth2ApplicationService.getInstance(this.config);
  }

  public oauth2Scope(): OAuth2ScopeService {
    return OAuth2ScopeService.getInstance(this.config);
  }

  public oauth2Authorization(): OAuth2AuthorizationService {
    return OAuth2AuthorizationService.getInstance(this.config);
  }

  public oauth2CredentialRecord(): OAuth2CredentialRecordService {
    return OAuth2CredentialRecordService.getInstance(this.config);
  }

  public oauth2UserLogging(): OAuth2UserLoggingService {
    return OAuth2UserLoggingService.getInstance(this.config);
  }

  public oauth2InterfaceAudit(): OAuth2InterfaceAuditService {
    return OAuth2InterfaceAuditService.getInstance(this.config);
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
  public sysPermission(): SysPermissionService {
    return SysPermissionService.getInstance(this.config);
  }

  public sysRole(): SysRoleService {
    return SysRoleService.getInstance(this.config);
  }

  public sysUser(): SysUserService {
    return SysUserService.getInstance(this.config);
  }

  public sysAttribute(): SysAttributeService {
    return SysAttributeService.getInstance(this.config);
  }

  public sysDefaultRole(): SysDefaultRoleService {
    return SysDefaultRoleService.getInstance(this.config);
  }

  public sysElement(): SysElementService {
    return SysElementService.getInstance(this.config);
  }

  public sysDictionary(): SysDictionaryService {
    return SysDictionaryService.getInstance(this.config);
  }

  public sysTenantDataSource(): SysTenantDataSourceService {
    return SysTenantDataSourceService.getInstance(this.config);
  }

  public socialBinding(): SocialBindingService {
    return SocialBindingService.getInstance(this.config);
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

  public mgtCertificate(): MgtCertificateService {
    return MgtCertificateService.getInstance(this.config);
  }
}

const createApi = (http: Axios, options: HttpClientOptions): ApiResources => {
  const config = new HttpConfig(http, options);
  return ApiResources.getInstance(config);
};

export { createApi };
