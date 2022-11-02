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

import { HttpConfig, BaseService } from '../base';

class SysAuthorityService extends BaseService<SysAuthority> {
  private static instance: SysAuthorityService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysAuthorityService {
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

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysDefaultRoleService {
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

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysRoleService {
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

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysSecurityAttributeService {
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

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysUserService {
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

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysElementService {
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
