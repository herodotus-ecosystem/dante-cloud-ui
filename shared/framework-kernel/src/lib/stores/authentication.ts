import { defineStore } from 'pinia';

import type { AccessTokenResponse, OidcIdTokenResponse } from '@herodotus-cloud/core';

import type {
  SignInErrorStatus,
  WebAuthnAuthenticate,
  SocialSource,
  AccessPrincipal,
} from '@/declarations';

import { moment, AuthorizationTokenEnum } from '@herodotus-cloud/core';
import { jwtDecode } from 'jwt-decode';
import { useCryptoStore } from './crypto';
import { OptionsUtilities } from '../utilities';
import { SecurityApiResources } from '../api';

export const useAuthenticationStore = defineStore('Authentication', {
  state: () => ({
    access_token: '',
    expires_in: 0,
    refresh_token: '',
    license: '',
    openid: '',
    idToken: '',
    scope: '',
    token_type: '',
    errorTimes: 0,
    remainTimes: 0,
    locked: false,
    userId: '',
    username: '',
    employeeId: '',
    avatar: '',
    roles: [] as Array<string>,
  }),

  getters: {
    isNotExpired: (state) => {
      const expires = moment().add(state.expires_in, 'seconds').valueOf();
      const flag = moment(expires).add(1, 'seconds').diff(moment(), 'seconds');
      return flag !== 0;
    },
    token(): string {
      if (OptionsUtilities.isAutoRefreshToken()) {
        return this.access_token;
      } else {
        if (this.isNotExpired) {
          return this.access_token;
        } else {
          return '';
        }
      }
    },
  },

  actions: {
    getBearerToken(): string {
      return AuthorizationTokenEnum.BEARER + this.token;
    },

    getAuthorizationHeader(): Record<string, string> {
      return { Authorization: this.getBearerToken(), 'X-Herodotus-Open-Id': this.userId };
    },

    saveAccessToken(data: AccessTokenResponse): void {
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.refresh_token = data.refresh_token ? data.refresh_token : '';
      this.license = data.refresh_token ? data.refresh_token : '';
      this.scope = data.scope;
      this.token_type = data.token_type;
      if (data.id_token) {
        this.idToken = data.id_token;
        const jwt: OidcIdTokenResponse = jwtDecode(this.idToken);
        this.userId = jwt.openid as string;
        this.username = jwt.sub;
        this.avatar = jwt.avatar;
        this.employeeId = jwt.employeeId;
        this.roles = jwt.roles;
      } else if (data.openid) {
        const crypto = useCryptoStore();
        this.openid = data.openid;
        const openid = crypto.decrypt(this.openid);
        const details = JSON.parse(openid);
        this.userId = details.userId;
        this.username = details.username;
        this.roles = details.roles;
        this.avatar = details.avatar;
        this.employeeId = details.employeeId;
      } else {
        console.warn('There is no id token or openid in the data.');
      }
    },

    setUserErrorStatus(data: SignInErrorStatus): void {
      this.remainTimes = data.remainTimes;
      this.errorTimes = data.errorTimes;
      this.locked = data.locked;
    },

    /**
     * 判断是否是以非弹窗的形式显示的信息。
     *
     * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
     * @param error
     * @returns
     */
    isAlertMessage(error: any): boolean {
      return error.code && [40106, 40111].includes(error.code);
    },

    setErrorPrompt(error: any, principal: string): void {
      if (this.isAlertMessage(error)) {
        SecurityApiResources.getInstance()
          .open()
          .getPrompt(principal)
          .then((result) => {
            this.setUserErrorStatus(result.data as SignInErrorStatus);
          });
      }
    },

    signIn(username: string, password: string) {
      const crypto = useCryptoStore();
      if (OptionsUtilities.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .passwordFlow(username, password, OptionsUtilities.isUseCrypto())
          .then((response) => {
            if (response) {
              const data = response as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            this.setErrorPrompt(error, username);
            reject(error);
          });
      });
    },

    refreshToken() {
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .refreshTokenFlow(this.refresh_token, OptionsUtilities.isUseCrypto())
          .then((response) => {
            if (response) {
              const data = response as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    signOut() {
      if (this.access_token) {
        SecurityApiResources.getInstance()
          .oauth2()
          .signOut(this.access_token)
          .then(() => {
            console.log('Server side sign out successfully.');
          })
          .catch((error) => {
            console.log('Server side sign out has error.', error);
          });
      }
    },

    authorizationCode(code: string, state = '') {
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .authorizationCodeFlow(
            code,
            OptionsUtilities.getRedirectUri(),
            state,
            OptionsUtilities.isUseCrypto(),
          )
          .then((response) => {
            if (response) {
              const data = response as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    smsSignIn(mobile: string, code: string) {
      const crypto = useCryptoStore();
      if (OptionsUtilities.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .socialCredentialsFlowBySms(mobile, code, OptionsUtilities.isUseCrypto())
          .then((response) => {
            if (response) {
              const data = response as unknown as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            this.setErrorPrompt(error, mobile);
            reject(error);
          });
      });
    },

    socialSignIn(source: SocialSource, accessPrincipal: AccessPrincipal) {
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities.isUseCrypto())
          .then((response) => {
            if (response) {
              const data = response as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            if (error.code && [40106, 40111].includes(error.code)) reject(error);
          });
      });
    },

    passkey(publicKey: WebAuthnAuthenticate) {
      return new Promise<boolean>((resolve, reject) => {
        SecurityApiResources.getInstance()
          .oauth2()
          .webAuthnCredentialsFlow(publicKey, OptionsUtilities.isUseCrypto())
          .then((response) => {
            if (response) {
              const data = response as AccessTokenResponse;
              this.saveAccessToken(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch((error) => {
            if (error.code && [40106, 40111].includes(error.code)) reject(error);
          });
      });
    },
  },
  persist: true,
});
