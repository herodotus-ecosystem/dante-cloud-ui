import { HttpConfig, AxiosHttpResult, AccessTokenResponse, DeviceAuthorizationResponse, BuildInScopeEnum } from '@herodotus-cloud/core';
import { SocialSource, AccessPrincipal } from '../../declarations';
export declare class OAuth2ApiService {
    private static instance;
    private config;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApiService;
    private getOAuth2TokenAddress;
    private getOAuth2RevokeAddress;
    private getOAuth2SignOutAddress;
    private getOAuth2DeviceAuthorizationAddress;
    private getOIDCConnectRegisterAddress;
    private createBasicHeader;
    private createClientData;
    private createOAuth2Data;
    signOut(token: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<string>>;
    revoke(token: string, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult>;
    refreshTokenFlow(refreshToken: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    passwordFlow(username: string, password: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    /**
     * 授权码模式
     * @param code 授权码
     * @param redirect_uri 重定向地址
     * @param state 状态
     * @param oidc 是否开启 OIDC
     * @param clientId 客户端 ID
     * @param clientSecret 客户端密钥
     * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
     * @description 授权码模式是 OAuth 2.0 的核心授权流程，用户通过授权服务器获取授权码，然后使用该授权码获取访问令牌。
     * 这种模式适用于需要用户交互的场景，例如 Web 应用程序和移动应用程序。
     * 用户在授权服务器上登录并授权应用程序访问其资源，
     * 授权服务器返回授权码，应用程序使用该授权码向令牌端点请求访问令牌。
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2
     * @see https
     */
    authorizationCodeFlow(code: string, redirect_uri: string, state?: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    /**
     * 客户端凭据模式
     * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
     * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
     * @param scope 范围(optional)
     * @description 客户端凭据模式是 OAuth 2.0 的一种授权流程，允许客户端应用程序使用其自身的凭据（而不是用户的凭据）
     * 来获取访问令牌。这种模式适用于服务器到服务器的通信场景，例如微服务之间的通信或后台任务。
     * 客户端应用程序通过向令
     * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.3
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.1
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.4
     * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.5
     * @see https://datatracker.interface
     */
    clientCredentialsFlow(clientId?: string, clientSecret?: string, scope?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    /**
     * 设备授权模式。获取访问令牌。
     * @param deviceCode 设备码
     * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
     * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
     * @param scope 范围 (optional)
     * @description 设备授权模式允许用户在一个设备上获取授权码，然后在另一个设备上使用该授权码获取访问令牌。
     * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
     * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
     * @see https://datatracker.ietf.org/doc/html/rfc8628
     * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
     */
    deviceCodeFlow(deviceCode: string, clientId?: string, clientSecret?: string, scope?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    /**
     * 设备授权流程。获取设备码和用户码。
     * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
     * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
     * @param scope 范围 (optional)
     * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
     * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
     * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
     * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
     * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
     */
    deviceAuthorizationFlow(clientId?: string, clientSecret?: string, scope?: BuildInScopeEnum): Promise<AxiosHttpResult<DeviceAuthorizationResponse>>;
    socialCredentialsFlowBySms(mobile: string, code: string, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
    socialCredentialsFlowByJustAuth(source: SocialSource, accessPrincipal: AccessPrincipal, oidc?: boolean, clientId?: string, clientSecret?: string): Promise<AxiosHttpResult<AccessTokenResponse>>;
}
