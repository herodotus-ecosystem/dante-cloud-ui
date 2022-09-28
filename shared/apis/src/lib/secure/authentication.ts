import type { AxiosHttpResult, SocialSource, AccessPrincipal } from '/@/declarations';

import { ApiConfig, Base64 } from '../base';
import { ContentTypeEnum } from '/@/enums';

class OAuth2ApiService {
  private static instance: OAuth2ApiService;
  private config = {} as ApiConfig;

  private constructor(config: ApiConfig) {
    this.config = config;
  }

  public static getInstance(config: ApiConfig): OAuth2ApiService {
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
    return 'Basic ' + Base64.encode(this.config.getClientId() + ':' + this.config.getClientSecret());
  }

  public signOut(token: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }

  public revoke(token: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token: token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }

  public refreshTokenFlow(refreshToken: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      {
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }

  public passwordFlow(username: string, password: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      {
        username: username,
        password: password,
        grant_type: 'password'
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }

  public socialCredentialsFlowBySms(mobile: string, code: string): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      {
        mobile,
        code,
        grant_type: 'social_credentials',
        source: 'SMS'
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }

  public socialCredentialsFlowByJustAuth(
    source: SocialSource,
    accessPrincipal: AccessPrincipal
  ): Promise<AxiosHttpResult> {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      {
        ...accessPrincipal,
        grant_type: 'social_credentials',
        source: source
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
}

export { OAuth2ApiService };
