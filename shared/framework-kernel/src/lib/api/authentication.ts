import type {
  HttpConfig,
  AxiosHttpResult,
  AccessTokenResponse,
  DeviceAuthorizationResponse,
} from '@herodotus-cloud/core';
import type { SocialSource, AccessPrincipal, WebAuthnAuthenticate } from '@/declarations';

import {
  Base64,
  lodash,
  ContentTypeEnum,
  AuthorizationGrantTypeEnum,
  AuthorizationTokenEnum,
  BuildInScopeEnum,
  ClientAuthenticationMethodEnum,
} from '@herodotus-cloud/core';

import { SocialSourceEnum } from '@/declarations';

export class OAuth2ApiService {
  // 静态私有实例引用
  private static instance: OAuth2ApiService | null = null;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): OAuth2ApiService {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService(config);
    }

    return this.instance;
  }

  private getOAuth2TokenAddress(): string {
    return this.config.getUaa() + '/oauth2/token';
  }

  private getOAuth2RevokeAddress(): string {
    return this.config.getUaa() + '/oauth2/revoke';
  }

  private getOAuth2SignOutAddress(): string {
    return this.config.getUaa() + '/oauth2/sign-out';
  }

  private getOAuth2DeviceAuthorizationAddress(): string {
    return this.config.getUaa() + '/oauth2/device_authorization';
  }

  private getOIDCConnectRegisterAddress(): string {
    return this.config.getUaa() + '/connect/register';
  }

  private createBasicHeader(clientId = '', clientSecret = ''): string {
    let data = this.config.getClientId() + ':' + this.config.getClientSecret();
    if (clientId && clientSecret) {
      data = clientId + ':' + clientSecret;
    }

    return AuthorizationTokenEnum.BASIC + Base64.encode(data);
  }

  private createClientData(clientId = '', clientSecret = '', scope = ''): Record<string, string> {
    const data = {
      client_id: '',
      client_secret: '',
    };

    if (clientId && clientSecret) {
      data.client_id = clientId;
      data.client_secret = clientSecret;
    } else {
      data.client_id = this.config.getClientId();
      data.client_secret = this.config.getClientSecret();
    }

    if (scope) {
      lodash.merge(data, { scope: scope });
    }

    return data;
  }

  private createOAuth2Data(
    grantType: AuthorizationGrantTypeEnum,
    params: Record<string, unknown>,
    oidc = false,
  ): Record<string, unknown> {
    const data = {
      grant_type: grantType,
    };

    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }

    if (oidc) {
      lodash.merge(data, { scope: 'openid' });
    }

    return data;
  }

  public signOut(
    token: string,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<string>> {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: token,
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public revoke(token: string, clientId = '', clientSecret = ''): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token: token,
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public refreshTokenFlow(
    refreshToken: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        { refresh_token: refreshToken },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public passwordFlow(
    username: string,
    password: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.PASSWORD,
        { username: username, password: password },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

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
  public authorizationCodeFlow(
    code: string,
    redirect_uri: string,
    state = '',
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        { code: code, state: state, redirect_uri: redirect_uri },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

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
  public clientCredentialsFlow(
    clientId = '',
    clientSecret = '',
    scope = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(clientId, clientSecret, scope),
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
    );
  }

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
  public deviceCodeFlow(
    deviceCode: string,
    clientId = '',
    clientSecret = '',
    scope = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(clientId, clientSecret, scope),
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
        
      },
    );
  }

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
  public deviceAuthorizationFlow(
    clientId = '',
    clientSecret = '',
    scope = BuildInScopeEnum.EMAIL,
  ): Promise<AxiosHttpResult<DeviceAuthorizationResponse>> {
    return this.config
      .getHttp()
      .post(
        this.getOAuth2DeviceAuthorizationAddress(),
        this.createClientData(clientId, clientSecret, scope),
        {
          contentType: ContentTypeEnum.URL_ENCODED,
        },
      );
  }

  public socialCredentialsFlowBySms(
    mobile: string,
    code: string,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { mobile, code, source: SocialSourceEnum.SMS },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public socialCredentialsFlowByJustAuth(
    source: SocialSource,
    accessPrincipal: AccessPrincipal,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { ...accessPrincipal, source: source },
        oidc,
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public webAuthnCredentialsFlow(
    publicKey: WebAuthnAuthenticate,
    oidc = false,
    clientId = '',
    clientSecret = '',
  ): Promise<AxiosHttpResult<AccessTokenResponse>> {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, {}, oidc),
      { ...publicKey },
      {
        contentType: ContentTypeEnum.JSON,
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret),
        },
      },
    );
  }

  public oidcClientRegistrationFlow(
    productKey: string,
    clientName: string,
  ): Promise<AxiosHttpResult<any>> {
    return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE,
      ],
      redirect_uris: ['http://192.168.101.10:3000'],
      client_name: clientName,
      // client_secret: '123456',
      scope: [BuildInScopeEnum.OPENID, BuildInScopeEnum.EMAIL, BuildInScopeEnum.PROFILE].join(' '),
      // 如果 response_types 包含 code 则会添加 authorization_code 授权模式
      // token 是 OAuth2.0 规范中隐式模式的值，但是在 OAuth2.1 中隐式模式被取消。目前临时使用一下
      // 可以考虑使用 id_token
      // "response_types": [
      //   "code",                // 允许：标准授权码流程
      //   "code id_token",       // 允许：OIDC 混合流程（仅返回 code + id_token）
      //   "id_token"             // 允许但不推荐：纯 OIDC 流程（无访问令牌）
      // ],
      response_types: ['token'],
      token_endpoint_auth_method: ClientAuthenticationMethodEnum.CLIENT_SECRET_POST,
    });
  }
}
