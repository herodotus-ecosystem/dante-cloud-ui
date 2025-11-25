interface WebAuthnRegisterPublicKey {
  credential: Credential | null;
  label: string;
}

export interface WebAuthnRegister {
  publicKey: WebAuthnRegisterPublicKey;
}

export type WebAuthnAuthenticate = Credential | null;
