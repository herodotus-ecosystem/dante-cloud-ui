import {
  OAuth2Application,
  OAuth2Scope,
  OAuth2Token,
  OAuth2Compliance,
  OAuth2ScopeAssigned,
  AxiosHttpResult
} from '/@/declarations';

import { ApiConfig, BaseService } from '../base';

class OAuth2ApplicationService extends BaseService<OAuth2Application> {
  private static instance: OAuth2ApplicationService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): OAuth2ApplicationService {
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

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): OAuth2ScopeService {
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

class OAuth2TokenService extends BaseService<OAuth2Token> {
  private static instance: OAuth2TokenService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): OAuth2TokenService {
    if (this.instance == null) {
      this.instance = new OAuth2TokenService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/authorization';
  }
}

class OAuth2ComplianceService extends BaseService<OAuth2Compliance> {
  private static instance: OAuth2ComplianceService;

  private constructor(config: ApiConfig) {
    super(config);
  }

  public static getInstance(config: ApiConfig): OAuth2ComplianceService {
    if (this.instance == null) {
      this.instance = new OAuth2ComplianceService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/compliance';
  }
}

export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2TokenService, OAuth2ComplianceService };
