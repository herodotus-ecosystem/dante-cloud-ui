import { OAuth2ApplicationEntity, OAuth2ScopeEntity, OAuth2AuthorizationEntity, OAuth2CredentialRecordEntity, OAuth2UserLoggingEntity, OAuth2InterfaceAuditEntity, OAuth2ScopeAssignedBody, AxiosHttpResult } from '../../declarations';
import { HttpConfig, AbstractService } from '../base';
declare class OAuth2ApplicationService extends AbstractService<OAuth2ApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends AbstractService<OAuth2ScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getScopeCodePath(scopeCode: string): string;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
    assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
}
declare class OAuth2AuthorizationService extends AbstractService<OAuth2AuthorizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2UserLoggingService extends AbstractService<OAuth2UserLoggingEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2UserLoggingService;
    getBaseAddress(): string;
}
declare class OAuth2InterfaceAuditService extends AbstractService<OAuth2InterfaceAuditEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2InterfaceAuditService;
    getBaseAddress(): string;
}
declare class OAuth2CredentialRecordService extends AbstractService<OAuth2CredentialRecordEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2CredentialRecordService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2UserLoggingService, OAuth2InterfaceAuditService, OAuth2CredentialRecordService, };
