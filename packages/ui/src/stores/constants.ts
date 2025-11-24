import { defineStore } from 'pinia';
import type { AxiosHttpResult, Dictionary } from '@/lib/declarations';

import { lodash, api, ossApi } from '@/lib/utils';

export const useConstantsStore = defineStore('Constants', {
  state: () => ({
    enums: {} as Record<string, Dictionary[]>,
  }),

  getters: {
    getDictionary(state) {
      return (key: string): Dictionary[] => (key ? state.enums[key] : []);
    },

    getDictionaryItem(state) {
      return (key: string, index: number): Dictionary => {
        const items: Dictionary[] = state.enums[key];
        return items ? items[index] : ({} as Dictionary);
      };
    },
  },

  actions: {
    fetch() {
      api
        .uaaConstant()
        .fetch()
        .then((response) => {
          this.append(response);
          api
            .upmsConstant()
            .fetch()
            .then((response) => {
              this.append(response);
              ossApi
                .constant()
                .fetch()
                .then((response) => {
                  this.append(response);
                });
            });
        });
    },

    refresh() {
      this.fetch();
    },

    init() {
      if (lodash.isEmpty(this.enums)) {
        this.fetch();
      }
    },

    append(response: AxiosHttpResult) {
      const data = response.data;
      if (!lodash.isEmpty(data)) {
        this.enums = Object.assign(this.enums, data);
      }
    },
  },
  persist: true,
});
