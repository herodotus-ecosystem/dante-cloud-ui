import type { AxiosHttpResult, SocialSource, AccessPrincipal } from '../../declarations';
import { ApiConfig } from '../base';
declare class OAuth2ApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: ApiConfig): OAuth2ApiService;
    private getOAuth2TokenAddress;
    private getOAuth2RevokeAddress;
    private getOAuth2SignOutAddress;
    private getBasicHeader;
    signOut(token: string): Promise<AxiosHttpResult>;
    revoke(token: string): Promise<AxiosHttpResult>;
    refreshTokenFlow(refreshToken: string): Promise<AxiosHttpResult>;
    passwordFlow(username: string, password: string): Promise<AxiosHttpResult>;
    socialCredentialsFlowBySms(mobile: string, code: string): Promise<AxiosHttpResult>;
    socialCredentialsFlowByJustAuth(source: SocialSource, accessPrincipal: AccessPrincipal): Promise<AxiosHttpResult>;
}
export { OAuth2ApiService };
