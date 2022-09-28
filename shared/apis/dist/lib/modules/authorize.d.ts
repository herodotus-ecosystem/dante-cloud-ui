import { OAuth2Application, OAuth2Scope, OAuth2Token, OAuth2Compliance, OAuth2ScopeAssigned, AxiosHttpResult } from '../../declarations';
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
declare class OAuth2TokenService extends BaseService<OAuth2Token> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2TokenService;
    getBaseAddress(): string;
}
declare class OAuth2ComplianceService extends BaseService<OAuth2Compliance> {
    private static instance;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2ComplianceService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2TokenService, OAuth2ComplianceService };
