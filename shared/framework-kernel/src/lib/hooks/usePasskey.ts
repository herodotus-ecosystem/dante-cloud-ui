import { useAuthenticationStore } from '../stores';
import { SecurityApiResources } from '../api';

export default function usePasskey() {
  const authenticationStore = useAuthenticationStore();

  // AbortController 实例
  let abortController: AbortController | null = null;

  // 清理函数
  const cleanup = () => {
    if (abortController) {
      abortController = null;
    }
  };

  // Availability of `window.PublicKeyCredential` means WebAuthn is usable.
  // `isUserVerifyingPlatformAuthenticatorAvailable` means the feature detection is usable.
  // `isConditionalMediationAvailable` means the feature detection is usable.
  const isSupported = async (): Promise<boolean> => {
    if (
      window.PublicKeyCredential &&
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      PublicKeyCredential.isConditionalMediationAvailable
    ) {
      // Check if user verifying platform authenticator is available.
      const results = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable(),
      ]);
      if (results.every((r) => r === true)) {
        return true;
      }
    }
    return false;
  };

  const registration = (label: string): Promise<boolean> => {
    abortController = new AbortController();
    return new Promise<boolean>((resolve, reject) => {
      SecurityApiResources.getInstance()
        .passkey()
        .getPublicKeyCredentialCreationOptions()
        .then((response) => {
          const options = PublicKeyCredential.parseCreationOptionsFromJSON(
            response as PublicKeyCredentialCreationOptionsJSON,
          );
          return navigator.credentials.create({ publicKey: options });
        })
        .then((credential) => {
          const request = {
            publicKey: { label: label, credential: credential },
          };
          return SecurityApiResources.getInstance().passkey().webAuthnRegister(request);
        })
        .then((result) => {
          resolve(result as boolean);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          cleanup();
        });
    });
  };

  const authenticator = (): Promise<boolean> => {
    abortController = new AbortController();

    return new Promise<boolean>((resolve, reject) => {
      SecurityApiResources.getInstance()
        .passkey()
        .getPublicKeyCredentialRequestOptions()
        .then((response) => {
          const options = PublicKeyCredential.parseRequestOptionsFromJSON(
            response as PublicKeyCredentialRequestOptionsJSON,
          ) as PublicKeyCredentialRequestOptions;
          return navigator.credentials.get({ publicKey: options, signal: abortController?.signal });
        })
        .then((authentication) => {
          if (abortController?.signal.aborted) {
            return false;
          }
          if (authentication) {
            const request = authentication as PublicKeyCredential;
            return authenticationStore.passkey(request.toJSON());
          }
          return false;
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          cleanup();
        });
    });
  };

  return {
    isSupported,
    registration,
    authenticator,
  };
}
