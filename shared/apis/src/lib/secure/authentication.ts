import type { AxiosHttpResult, SocialSource, AccessPrincipal, OAuth2Token } from '@/declarations';

import { HttpConfig, Base64 } from '../base';
import { ContentTypeEnum } from '@/enums';

class OAuth2ApiService {
  private static instance: OAuth2ApiService;
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

  private getBasicHeader(): string {
    return (
      'Basic ' + Base64.encode(this.config.getClientId() + ':' + this.config.getClientSecret())
    );
  }

  public signOut(token: string): Promise<AxiosHttpResult<string>> {
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
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public revoke(token: string): Promise<AxiosHttpResult> {
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
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public refreshTokenFlow(
    refreshToken: string,
    oidc = false,
  ): Promise<AxiosHttpResult<OAuth2Token>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? { refresh_token: refreshToken, grant_type: 'refresh_token', scope: 'openid' }
        : { refresh_token: refreshToken, grant_type: 'refresh_token' },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public passwordFlow(
    username: string,
    password: string,
    oidc = false,
  ): Promise<AxiosHttpResult<OAuth2Token>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? { username: username, password: password, grant_type: 'password', scope: 'openid' }
        : { username: username, password: password, grant_type: 'password' },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public authorizationCodeFlow(
    code: string,
    redirect_uri: string,
    state = '',
    oidc = false,
  ): Promise<AxiosHttpResult<OAuth2Token>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? {
            code: code,
            state: state,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            scope: 'openid',
          }
        : {
            code: code,
            state: state,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
          },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public socialCredentialsFlowBySms(
    mobile: string,
    code: string,
    oidc = false,
  ): Promise<AxiosHttpResult<OAuth2Token>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? { mobile, code, grant_type: 'social_credentials', source: 'SMS', scope: 'openid' }
        : { mobile, code, grant_type: 'social_credentials', source: 'SMS' },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }

  public socialCredentialsFlowByJustAuth(
    source: SocialSource,
    accessPrincipal: AccessPrincipal,
    oidc = false,
  ): Promise<AxiosHttpResult<OAuth2Token>> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc
        ? { ...accessPrincipal, grant_type: 'social_credentials', source: source, scope: 'openid' }
        : { ...accessPrincipal, grant_type: 'social_credentials', source: source },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
      {
        headers: {
          Authorization: this.getBasicHeader(),
        },
      },
    );
  }
}

export { OAuth2ApiService };
