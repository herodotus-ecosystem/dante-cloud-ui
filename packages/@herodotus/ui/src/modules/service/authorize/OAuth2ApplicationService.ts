import { Singleton } from 'typescript-ioc';
import { OAuth2Scope } from './OAuth2ScopeService';
import { BaseSysEntity, BaseService, _constants } from '@/lib/declarations';

export interface OAuth2Application extends BaseSysEntity {
    applicationId: string;
    applicationName: string;
    abbreviation: string;
    logo: string;
    homepage: string;
    applicationType: number | EmptyObject;
    clientId: string;
    clientSecret: string;
    redirectUris: string;
    authorizationGrantTypes: string;
    clientAuthenticationMethods: string;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
    jwkSetUrl: string;
    accessTokenValidity: string;
    reuseRefreshTokens: boolean;
    refreshTokenValidity: string;
    signature: number | EmptyObject;
    clientSecretExpiresAt: string;
    scopes: string[];
}

@Singleton
export class OAuth2ApplicationService extends BaseService<OAuth2Application> {
    public getBaseAddress(): string {
        return _constants.UAA_ADDRESS + '/authorize/application';
    }
}
