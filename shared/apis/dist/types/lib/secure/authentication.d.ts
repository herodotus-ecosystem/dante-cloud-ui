import { AxiosHttpResult, SocialSource, AccessPrincipal, AccessTokenResponse } from '../../declarations';
import { HttpConfig } from '../base';
declare class OAuth2ApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApiService;
    private getOAuth2TokenAddress;
    private getOAuth2RevokeAddress;
    private getOAuth2SignOutAddress;
    private getBasicHeader;
    signOut(token: string): Promise<AxiosHttpResult<string>>;
    revoke(token: string): Promise<AxiosHttpResult>;
    refreshTokenFlow(refreshToken: string, oidc?: boolean): Promise<AxiosHttpResult<AccessTokenResponse>>;
    passwordFlow(username: string, password: string, oidc?: boolean): Promise<AxiosHttpResult<AccessTokenResponse>>;
    authorizationCodeFlow(code: string, redirect_uri: string, state?: string, oidc?: boolean): Promise<AxiosHttpResult<AccessTokenResponse>>;
    socialCredentialsFlowBySms(mobile: string, code: string, oidc?: boolean): Promise<AxiosHttpResult<AccessTokenResponse>>;
    socialCredentialsFlowByJustAuth(source: SocialSource, accessPrincipal: AccessPrincipal, oidc?: boolean): Promise<AxiosHttpResult<AccessTokenResponse>>;
}
export { OAuth2ApiService };
