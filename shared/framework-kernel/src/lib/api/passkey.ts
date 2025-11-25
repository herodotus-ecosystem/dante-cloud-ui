import type { HttpConfig, AxiosHttpResult } from '@herodotus-cloud/core';

import type { WebAuthnRegister, WebAuthnAuthenticate } from '@/declarations';

import { Service } from '@herodotus-cloud/core';

export class PasskeyApiService extends Service {
  // 静态私有实例引用
  private static instance: PasskeyApiService | null = null;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): PasskeyApiService {
    if (this.instance == null) {
      this.instance = new PasskeyApiService(config);
    }

    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/webauthn/register';
  }

  private getPublicKeyCredentialCreationOptionsAddress(): string {
    return this.getBaseAddress() + '/options';
  }

  private getWebAuthnAuthenticateAddress(): string {
    return this.getConfig().getUaa() + '/login/webauthn';
  }

  private getPublicKeyCredentialRequestOptionsAddress(): string {
    return this.getConfig().getUaa() + '/webauthn/authenticate/options';
  }

  protected getIdPath(id: string): string {
    return this.getParamPath(this.getBaseAddress(), id);
  }

  public getPublicKeyCredentialCreationOptions(): Promise<
    AxiosHttpResult<PublicKeyCredentialCreationOptionsJSON>
  > {
    return this.getConfig()
      .getHttp()
      .post<
        PublicKeyCredentialCreationOptionsJSON,
        string
      >(this.getPublicKeyCredentialCreationOptionsAddress(), '');
  }

  public webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .post<boolean, WebAuthnRegister>(this.getBaseAddress(), request);
  }

  public getPublicKeyCredentialRequestOptions(): Promise<
    AxiosHttpResult<PublicKeyCredentialRequestOptionsJSON>
  > {
    return this.getConfig()
      .getHttp()
      .post<
        PublicKeyCredentialRequestOptionsJSON,
        string
      >(this.getPublicKeyCredentialRequestOptionsAddress(), '');
  }

  public webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>> {
    return this.getConfig()
      .getHttp()
      .post<boolean, WebAuthnAuthenticate>(this.getWebAuthnAuthenticateAddress(), request);
  }

  public delete(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getIdPath(id));
  }
}
