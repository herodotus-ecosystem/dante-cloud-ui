import { HttpConfig, AxiosHttpResult, Service } from '@herodotus-cloud/core';
import { WebAuthnRegister, WebAuthnAuthenticate } from '../../declarations';
export declare class PasskeyApiService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PasskeyApiService;
    getBaseAddress(): string;
    private getPublicKeyCredentialCreationOptionsAddress;
    private getWebAuthnAuthenticateAddress;
    private getPublicKeyCredentialRequestOptionsAddress;
    protected getIdPath(id: string): string;
    getPublicKeyCredentialCreationOptions(): Promise<AxiosHttpResult<PublicKeyCredentialCreationOptionsJSON>>;
    webAuthnRegister(request: WebAuthnRegister): Promise<AxiosHttpResult<boolean>>;
    getPublicKeyCredentialRequestOptions(): Promise<AxiosHttpResult<PublicKeyCredentialRequestOptionsJSON>>;
    webAuthnAuthenticate(request: WebAuthnAuthenticate): Promise<AxiosHttpResult<boolean>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
}
