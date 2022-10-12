import type { Session } from '/@/lib/declarations';
import { defineStore } from 'pinia';

import { SM2Utils, SM4Utils, api } from '/@/lib/utils';

const SECRET_KEY: string = import.meta.env.VITE_SECRET_KEY;

export const useCryptoStore = defineStore('Crypto', {
  state: () => ({
    sessionId: '',
    key: '',
    state: ''
  }),

  actions: {
    setSessinId(sessionId: string) {
      this.sessionId = sessionId;
    },

    setKey(key: string) {
      this.key = SM4Utils.encrypt(key, SECRET_KEY);
    },

    getKey() {
      return SM4Utils.decrypt(this.key, SECRET_KEY);
    },

    encrypt(content: string) {
      const key = this.getKey();
      return SM4Utils.encrypt(content, key);
    },

    decrypt(content: string) {
      const key = this.getKey();
      return SM4Utils.decrypt(content, key);
    },

    exchange(identity = ''): Promise<string> {
      return new Promise<string>((resolve, reject) => {
        api
          .open()
          .createSession(identity)
          .then(response => {
            const data = response.data as unknown as Session;
            if (data) {
              const sessionId = data.sessionId;
              const backendPublicKey = data.publicKey;
              this.state = data.state;
              const pair = SM2Utils.createKeyPair();
              const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
              api
                .open()
                .exchange(sessionId, encryptData)
                .then(response => {
                  const confidential = response.data as unknown as string;
                  const key = SM2Utils.decrypt(confidential, pair.privateKey);
                  this.setSessinId(sessionId);
                  this.setKey(key);
                  resolve(key);
                });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  persist: {
    storage: sessionStorage
  }
});
