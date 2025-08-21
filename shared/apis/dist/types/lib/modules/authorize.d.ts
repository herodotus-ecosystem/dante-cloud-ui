import { OAuth2ApplicationEntity, OAuth2ScopeEntity, OAuth2AuthorizationEntity, OAuth2ComplianceEntity, OAuth2ProductEntity, OAuth2DeviceEntity, OAuth2ScopeAssignedBody, AxiosHttpResult } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class OAuth2ApplicationService extends BaseService<OAuth2ApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends BaseService<OAuth2ScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getScopeCodePath(scopeCode: string): string;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
    assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
}
declare class OAuth2AuthorizationService extends BaseService<OAuth2AuthorizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2ComplianceService extends BaseService<OAuth2ComplianceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ComplianceService;
    getBaseAddress(): string;
}
declare class OAuth2ProductService extends BaseService<OAuth2ProductEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ProductService;
    getBaseAddress(): string;
}
declare class OAuth2DeviceService extends BaseService<OAuth2DeviceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2DeviceService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2ComplianceService, OAuth2ProductService, OAuth2DeviceService, };
