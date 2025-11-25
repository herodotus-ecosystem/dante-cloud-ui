import { defineStore } from 'pinia';

import type { Session } from '@/declarations';

import { SM2Utils, SM4Utils } from '@herodotus-cloud/core';

import { OptionsUtilities } from '../utilities';
import { SecurityApiResources } from '../api';

export const useCryptoStore = defineStore('Crypto', {
  state: () => ({
    sessionId: '',
    key: '',
    state: '',
  }),

  actions: {
    setSessionId(sessionId: string) {
      this.sessionId = sessionId;
    },

    setKey(key: string) {
      this.key = SM4Utils.encrypt(key, OptionsUtilities.getSecurityKey());
    },

    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities.getSecurityKey());
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
        SecurityApiResources.getInstance()
          .open()
          .createSession(identity)
          .then((response) => {
            const data = response.data as unknown as Session;
            if (data) {
              const sessionId = data.sessionId;
              const backendPublicKey = data.publicKey;
              this.state = data.state;
              const pair = SM2Utils.createKeyPair();
              const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
              SecurityApiResources.getInstance()
                .open()
                .exchange(sessionId, encryptData)
                .then((response) => {
                  const confidential = response.data as unknown as string;
                  const key = SM2Utils.decrypt(confidential, pair.privateKey);
                  this.setSessionId(sessionId);
                  this.setKey(key);
                  resolve(key);
                });
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
