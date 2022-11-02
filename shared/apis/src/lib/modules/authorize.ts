import {
  OAuth2Application,
  OAuth2Scope,
  OAuth2Authorization,
  OAuth2Compliance,
  OAuth2ScopeAssigned,
  AxiosHttpResult
} from '/@/declarations';

import { HttpConfig, BaseService } from '../base';

class OAuth2ApplicationService extends BaseService<OAuth2Application> {
  private static instance: OAuth2ApplicationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ApplicationService {
    if (this.instance == null) {
      this.instance = new OAuth2ApplicationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/application';
  }
}

class OAuth2ScopeService extends BaseService<OAuth2Scope> {
  private static instance: OAuth2ScopeService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ScopeService {
    if (this.instance == null) {
      this.instance = new OAuth2ScopeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/scope';
  }

  public getAssignedAddress(): string {
    return this.getBaseAddress() + '/assigned';
  }

  public getScopeCodePath(scopeCode: string): string {
    return this.getParamPath(this.getBaseAddress(), scopeCode);
  }

  public fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2Scope>> {
    return this.getConfig().getHttp().get<OAuth2Scope, string>(this.getScopeCodePath(scopeCode));
  }

  public assigned(data: OAuth2ScopeAssigned): Promise<AxiosHttpResult<OAuth2Scope>> {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
}

class OAuth2AuthorizationService extends BaseService<OAuth2Authorization> {
  private static instance: OAuth2AuthorizationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2AuthorizationService {
    if (this.instance == null) {
      this.instance = new OAuth2AuthorizationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/authorization';
  }
}

class OAuth2ComplianceService extends BaseService<OAuth2Compliance> {
  private static instance: OAuth2ComplianceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ComplianceService {
    if (this.instance == null) {
      this.instance = new OAuth2ComplianceService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/compliance';
  }
}

export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2ComplianceService };
