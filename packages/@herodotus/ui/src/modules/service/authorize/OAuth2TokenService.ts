import { Singleton } from 'typescript-ioc';
import { Entity, BaseService, _constants } from '@/lib/declarations';

export interface OAuth2Token extends Entity {
    id: string;
    registeredClientId: string;
    principalName: string;
    authorizationGrantType: string;
    attributes: string;
    state: string;
    authorizationCode: string;
    authorizationCodeIssuedAt: string;
    authorizationCodeExpiresAt: string;
    authorizationCodeMetadata: string;
    accessToken: string;
    accessTokenIssuedAt: string;
    accessTokenExpiresAt: string;
    accessTokenMetadata: string;
    accessTokenType: string;
    accessTokenScopes: string;
    oidcIdToken: string;
    oidcIdTokenIssuedAt: string;
    oidcIdTokenExpiresAt: string;
    oidcIdTokenMetadata: string;
    oidcIdTokenClaims: string;
    refreshToken: string;
    refreshTokenIssuedAt: string;
    refreshTokenExpiresAt: string;
    refreshTokenMetadata: string;
}

@Singleton
export class OAuth2TokenService extends BaseService<OAuth2Token> {
    public getBaseAddress(): string {
        return _constants.UAA_ADDRESS + '/authorize/authorization';
    }
}
