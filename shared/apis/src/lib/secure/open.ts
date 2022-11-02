import type { AxiosHttpResult, CaptchaResource, CaptchaData, Verification, Coordinate } from '/@/declarations';
import { HttpConfig } from '../base';
import { ContentTypeEnum, CaptchaCategoryEnum } from '/@/enums';

class OpenApiService {
  private static instance: OpenApiService;
  private config = {} as HttpConfig;

  private constructor(config: HttpConfig) {
    this.config = config;
  }

  public static getInstance(config: HttpConfig): OpenApiService {
    if (this.instance == null) {
      this.instance = new OpenApiService(config);
    }
    return this.instance;
  }

  public createSession(sessionId = ''): Promise<AxiosHttpResult> {
    const SECURE_SESSION = this.config.getUaa() + '/open/identity/session';
    return this.config.getHttp().post(SECURE_SESSION, {
      clientId: this.config.getClientId(),
      clientSecret: this.config.getClientSecret(),
      sessionId: sessionId
    });
  }

  public exchange(sessionId = '', confidential: string): Promise<AxiosHttpResult> {
    const SECURE_EXCHANGE = this.config.getUaa() + '/open/identity/exchange';
    return this.config.getHttp().post(SECURE_EXCHANGE, {
      confidential: confidential,
      sessionId: sessionId
    });
  }

  public getPrompt(username: string): Promise<AxiosHttpResult> {
    const SECURE_PROMPT = this.config.getUaa() + '/open/identity/prompt';
    return this.config.getHttp().post(SECURE_PROMPT, {
      username: username
    });
  }

  public createCaptcha(sessionId: string, type: string): Promise<AxiosHttpResult<CaptchaResource>> {
    const SECURE_CAPTCHA = this.config.getUaa() + '/open/captcha';
    return this.config.getHttp().get(SECURE_CAPTCHA, {
      identity: sessionId,
      category: type
    });
  }

  public verifyCaptcha(identity: string, category: string, data: CaptchaData): Promise<AxiosHttpResult<boolean>> {
    const SECURE_CAPTCHA = this.config.getUaa() + '/open/captcha';
    const verify: Verification = {
      identity: identity,
      category: category,
      coordinate: { x: 0, y: 0 },
      coordinates: [],
      characters: ''
    };

    if (category === CaptchaCategoryEnum.WORD_CLICK) {
      verify.coordinates = data as Array<Coordinate>;
    } else if (category === CaptchaCategoryEnum.JIGSAW) {
      verify.coordinate = data as Coordinate;
    } else {
      verify.characters = data as string;
    }

    return this.config.getHttp().post(SECURE_CAPTCHA, verify);
  }

  public createVerificationCode(mobile: string): Promise<AxiosHttpResult<string>> {
    const SECURE_VERIFICATION_CODE = this.config.getUpms() + '/open/identity/verification-code';
    return this.config.getHttp().post(
      SECURE_VERIFICATION_CODE,
      {
        mobile: mobile
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }

  public getSocialList(): Promise<AxiosHttpResult<Record<string, string>>> {
    const SECURE_SOCIAL_LIST = this.config.getUpms() + '/open/identity/sources';
    return this.config.getHttp().get(SECURE_SOCIAL_LIST);
  }
}

export { OpenApiService };
