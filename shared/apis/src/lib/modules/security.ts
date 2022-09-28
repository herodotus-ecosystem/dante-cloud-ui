import type {
  SysAuthority,
  SysDefaultRole,
  SysRole,
  SysSecurityAttribute,
  SysUser,
  SysElement,
  AxiosHttpResult,
  Dictionary
} from '/@/declarations';

import { ContentTypeEnum } from '/@/enums';

import { ApiConfig, BaseService } from '../base';

class SysAuthorityService extends BaseService<SysAuthority> {
  private static instance: SysAuthorityService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysAuthorityService {
    if (this.instance == null) {
      this.instance = new SysAuthorityService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/authority';
  }
}

class SysDefaultRoleService extends BaseService<SysDefaultRole> {
  private static instance: SysDefaultRoleService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysDefaultRoleService {
    if (this.instance == null) {
      this.instance = new SysDefaultRoleService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/default-role';
  }
}

class SysRoleService extends BaseService<SysRole> {
  private static instance: SysRoleService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysRoleService {
    if (this.instance == null) {
      this.instance = new SysRoleService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/role';
  }

  public getRoleCodePath(roleCode: string): string {
    return this.getParamPath(this.getBaseAddress(), roleCode);
  }

  public fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRole>> {
    return this.getConfig().getHttp().get<SysRole, string>(this.getRoleCodePath(roleCode));
  }
}

class SysSecurityAttributeService extends BaseService<SysSecurityAttribute> {
  private static instance: SysSecurityAttributeService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysSecurityAttributeService {
    if (this.instance == null) {
      this.instance = new SysSecurityAttributeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security-attribute';
  }
}

class SysUserService extends BaseService<SysUser> {
  private static instance: SysUserService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysUserService {
    if (this.instance == null) {
      this.instance = new SysUserService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/user';
  }

  public getUsernameAddress(): string {
    return this.getBaseAddress() + '/sign-in';
  }

  public getChangePasswordAddress(): string {
    return this.getBaseAddress() + '/change-password';
  }

  public getUsernamePath(username: string): string {
    return this.getParamPath(this.getUsernameAddress(), username);
  }

  public fetchByUsername(username: string): Promise<AxiosHttpResult<SysUser>> {
    return this.getConfig().getHttp().get<SysUser, string>(this.getUsernamePath(username));
  }

  public changePassword(userId: string, password: string): Promise<AxiosHttpResult<SysUser>> {
    return this.getConfig().getHttp().put<SysUser, Dictionary<string>>(
      this.getChangePasswordAddress(),
      { userId, password },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
}

class SysElementService extends BaseService<SysElement> {
  private static instance: SysElementService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): SysElementService {
    if (this.instance == null) {
      this.instance = new SysElementService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/element';
  }

  public fetchById(id: string): Promise<AxiosHttpResult<SysElement>> {
    return this.getConfig().getHttp().get<SysElement, string>(this.getIdPath(id));
  }
}

export {
  SysAuthorityService,
  SysDefaultRoleService,
  SysElementService,
  SysSecurityAttributeService,
  SysRoleService,
  SysUserService
};
