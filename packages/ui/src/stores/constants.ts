import { defineStore } from 'pinia';
import type { AxiosHttpResult, ConstantDictionary } from '/@/lib/declarations';

import { lodash, api } from '/@/lib/utils';

export const useConstantsStore = defineStore('Constants', {
  state: () => ({
    enums: {} as Dictionary<ConstantDictionary[]>
  }),

  getters: {
    getDictionary(state) {
      return (key: string): ConstantDictionary[] => (key ? state.enums[key] : []);
    },

    getDictionaryItem(state) {
      return (key: string, index: number): ConstantDictionary => {
        const items: ConstantDictionary[] = state.enums[key];
        return items ? items[index] : ({} as ConstantDictionary);
      };
    }
  },

  actions: {
    fetch() {
      api
        .uaaConstant()
        .fetch()
        .then(response => {
          this.append(response);
          api
            .upmsConstant()
            .fetch()
            .then(response => {
              this.append(response);
              api
                .ossConstant()
                .fetch()
                .then(response => {
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
    }
  },
  persist: true
});
