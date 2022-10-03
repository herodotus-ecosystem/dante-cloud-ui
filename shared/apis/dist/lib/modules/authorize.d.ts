import { OAuth2Application, OAuth2Scope, OAuth2Authorization, OAuth2Compliance, OAuth2ScopeAssigned, AxiosHttpResult } from '../../declarations';
import { ApiConfig, BaseService } from '../base';
declare class OAuth2ApplicationService extends BaseService<OAuth2Application> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends BaseService<OAuth2Scope> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getScopeCodePath(scopeCode: string): string;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2Scope>>;
    assigned(data: OAuth2ScopeAssigned): Promise<AxiosHttpResult<OAuth2Scope>>;
}
declare class OAuth2AuthorizationService extends BaseService<OAuth2Authorization> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2ComplianceService extends BaseService<OAuth2Compliance> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2ComplianceService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2ComplianceService };
