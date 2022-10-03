import { defineStore } from 'pinia';
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
    token(state) {
      if (variables.getAutoRefreshToken()) {
        return state.access_token;
      } else {
        if (this.isNotExpired) {
          return state.access_token;
        } else {
          return '';
        }
      }
    }
  },

  actions: {
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
              const data = response as unknown as OAuth2Token;

              this.access_token = data.access_token;
              this.expires_in = data.expires_in;
              this.refresh_token = data.refresh_token;
              this.license = data.license;
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                if (openid) {
                  const details = JSON.parse(openid);
                  this.userId = details.userId;
                  this.userName = details.userName;
                  this.roles = details.roles;
                }
              }
              this.scope = data.scope;
              this.token_type = data.token_type;
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            if (error.code && [40106, 40111].includes(error.code))
              api
                .open()
                .getPrompt(username)
                .then(result => {
                  const data = result.data as UserErrorStatus;
                  this.remainTimes = data.remainTimes;
                  this.errorTimes = data.errorTimes;
                  this.locked = data.locked;
                });
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
              const data = response as unknown as OAuth2Token;
              this.access_token = data.access_token;
              this.expires_in = data.expires_in;
              this.refresh_token = data.refresh_token;
              this.license = data.license;
              this.scope = data.scope;
              this.token_type = data.token_type;
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

              this.access_token = data.access_token;
              this.expires_in = data.expires_in;
              this.refresh_token = data.refresh_token;
              this.license = data.license;
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                if (openid) {
                  const details = JSON.parse(openid);
                  this.userId = details.userId;
                  this.userName = details.userName;
                  this.roles = details.roles;
                }
              }
              this.scope = data.scope;
              this.token_type = data.token_type;
            }

            if (this.access_token) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            if (error.code && [40106, 40111].includes(error.code))
              api
                .open()
                .getPrompt(mobile)
                .then(result => {
                  const data = result.data as UserErrorStatus;
                  this.remainTimes = data.remainTimes;
                  this.errorTimes = data.errorTimes;
                  this.locked = data.locked;
                });
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
              const data = response as unknown as OAuth2Token;

              this.access_token = data.access_token;
              this.expires_in = data.expires_in;
              this.refresh_token = data.refresh_token;
              this.license = data.license;
              if (data.openid) {
                const openid = crypto.decrypt(data.openid);
                if (openid) {
                  const details = JSON.parse(openid);
                  this.userId = details.userId;
                  this.userName = details.userName;
                  this.roles = details.roles;
                }
              }
              this.scope = data.scope;
              this.token_type = data.token_type;
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
