import type {
  OAuth2ApplicationEntity,
  OAuth2ScopeEntity,
  OAuth2AuthorizationEntity,
  OAuth2ComplianceEntity,
  OAuth2ProductEntity,
  OAuth2DeviceEntity,
  OAuth2ScopeAssignedBody,
  AxiosHttpResult,
} from '@/declarations';

import { HttpConfig, BaseService } from '../base';

class OAuth2ApplicationService extends BaseService<OAuth2ApplicationEntity> {
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

class OAuth2ScopeService extends BaseService<OAuth2ScopeEntity> {
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

  public fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig()
      .getHttp()
      .get<OAuth2ScopeEntity, string>(this.getScopeCodePath(scopeCode));
  }

  public assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
}

class OAuth2AuthorizationService extends BaseService<OAuth2AuthorizationEntity> {
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

class OAuth2ComplianceService extends BaseService<OAuth2ComplianceEntity> {
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

class OAuth2ProductService extends BaseService<OAuth2ProductEntity> {
  private static instance: OAuth2ProductService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ProductService {
    if (this.instance == null) {
      this.instance = new OAuth2ProductService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/product';
  }
}

class OAuth2DeviceService extends BaseService<OAuth2DeviceEntity> {
  private static instance: OAuth2DeviceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2DeviceService {
    if (this.instance == null) {
      this.instance = new OAuth2DeviceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/authorize/device';
  }
}

export {
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2AuthorizationService,
  OAuth2ComplianceService,
  OAuth2ProductService,
  OAuth2DeviceService,
};
