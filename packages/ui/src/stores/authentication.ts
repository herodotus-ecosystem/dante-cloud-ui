import { defineStore, Store } from 'pinia';
import type { UserErrorStatus, AxiosHttpResult, SocialSource, AccessPrincipal, OAuth2Token } from '/@/lib/declarations';

import { useCryptoStore } from '/@/stores';
import { variables, moment, api } from '/@/lib/utils';

export const useAuthenticationStore = defineStore('Authentication', {
  state: () => ({
    access_token: '',
    expires_in: 0,
    refresh_token: '',
    license: '',
    openid: '',
    scope: '',
    token_type: '',
    errorTimes: 0,
    remainTimes: 0,
    locked: false,
    userId: '',
    userName: '',
    roles: []
  }),

  getters: {
    isNotExpired: state => {
      const expires = moment().add(state.expires_in, 'seconds').valueOf();
      const flag = moment(expires).add(1, 'seconds').diff(moment(), 'seconds');
      return flag !== 0;
    },
    token(): string {
      if (variables.getAutoRefreshToken()) {
        return this.access_token;
      } else {
        if (this.isNotExpired) {
          return this.access_token;
        } else {
          return '';
        }
      }
    }
  },

  actions: {
    setTokenInfo(data: OAuth2Token): void {
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.refresh_token = data.refresh_token;
      this.license = data.license;
      this.scope = data.scope;
      this.token_type = data.token_type;
    },

    setUserInfo(openid: string): void {
      if (openid) {
        const details = JSON.parse(openid);
        this.userId = details.userId;
        this.userName = details.userName;
        this.roles = details.roles;
      }
    },

    setUserErrorStatus(data: UserErrorStatus): void {
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
        api
          .open()
          .getPrompt(principal)
          .then(result => {
            this.setUserErrorStatus(result.data as UserErrorStatus);
          });
      }
    },

    signIn(username: string, password: string) {
      const crypto = useCryptoStore();
      if (variables.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise<boolean>((resolve, reject) => {
        api
          .oauth2()
          .passwordFlow(username, password)
          .then(response => {
            if (response) {
              const data = response as OAuth2Token;
              this.setTokenInfo(data);
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                this.setUserInfo(openid);
              }
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            this.setErrorPrompt(error, username);
            reject(error);
          });
      });
    },
    refreshToken() {
      return new Promise<boolean>((resolve, reject) => {
        api
          .oauth2()
          .refreshTokenFlow(this.refresh_token)
          .then(response => {
            if (response) {
              const data = response as OAuth2Token;
              this.setTokenInfo(data);
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    authorizationCode(code: string, state = '') {
      const crypto = useCryptoStore();
      return new Promise<boolean>((resolve, reject) => {
        api
          .oauth2()
          .authorizationCodeFlow(code, variables.getRedirectUri(), state)
          .then(response => {
            if (response) {
              const data = response as OAuth2Token;
              this.setTokenInfo(data);
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                this.setUserInfo(openid);
              }
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    signOut(accessToken = '') {
      const token = accessToken ? accessToken : this.access_token;
      return new Promise<AxiosHttpResult>((resolve, reject) => {
        api
          .oauth2()
          .signOut(token)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    smsSignIn(mobile: string, code: string) {
      const crypto = useCryptoStore();
      if (variables.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise<boolean>((resolve, reject) => {
        api
          .oauth2()
          .socialCredentialsFlowBySms(mobile, code)
          .then(response => {
            if (response) {
              const data = response as unknown as OAuth2Token;

              this.setTokenInfo(data);
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                this.setUserInfo(openid);
              }
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            this.setErrorPrompt(error, mobile);
            reject(error);
          });
      });
    },

    socialSignIn(source: SocialSource, accessPrincipal: AccessPrincipal) {
      const crypto = useCryptoStore();
      return new Promise<boolean>((resolve, reject) => {
        api
          .oauth2()
          .socialCredentialsFlowByJustAuth(source, accessPrincipal)
          .then(response => {
            if (response) {
              const data = response as OAuth2Token;

              this.setTokenInfo(data);
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                this.setUserInfo(openid);
              }
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            if (error.code && [40106, 40111].includes(error.code)) reject(error);
          });
      });
    }
  },
  persist: true
});
