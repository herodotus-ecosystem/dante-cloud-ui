import { defineStore } from 'pinia';

import type { Dictionary, SysDictionaryEntity } from '@/lib/declarations';

import { find, concat, difference, orderBy, assign, isEmpty } from 'lodash-es';
import { API } from '@/configurations';

export const useDictionaryStore = defineStore('Dictionary', {
  state: () => ({
    dictionaries: {} as Record<string, Dictionary[]>,
  }),

  getters: {
    getDictionary(state) {
      return (key: string): Dictionary[] | undefined => (key ? state.dictionaries[key] : []);
    },

    getDictionaryItem() {
      return (key: string, value: string): Dictionary => {
        const items: Dictionary[] | undefined = this.getDictionary(key);

        if (items) {
          const item = find(items, { value: value });
          console.log('---key---', item);
          return item as Dictionary;
        } else {
          return {} as Dictionary;
        }
      };
    },
    getDictionaryItemDisplay() {
      return (key: string, value: string): string => {
        const items: Dictionary[] | undefined = this.getDictionary(key);

        if (items) {
          const item = find(items, { value: value });
          return item ? item.label : value;
        }
        return '';
      };
    },
    getNotExist(state) {
      return (category: string, ...others: string[]): Array<string> => {
        const categories = concat(others, category);
        return difference(categories, Object.keys(state.dictionaries));
      };
    },
  },

  actions: {
    toDictionary(item: SysDictionaryEntity): Dictionary {
      const result: Dictionary = {
        ordinal: item.ordinal,
        name: item.name,
        value: item.value,
        label: item.label,
      };
      return result;
    },

    convertCategory(items: Array<SysDictionaryEntity> | undefined): Array<Dictionary> {
      if (items) {
        return orderBy(
          items.map((item) => this.toDictionary(item)),
          ['ordinal'],
          ['asc'],
        );
      } else {
        return [];
      }
    },

    convertCategories(
      categories: Record<string, Array<SysDictionaryEntity>>,
    ): Record<string, Array<Dictionary>> {
      const result: Record<string, Array<Dictionary>> = {};
      Object.keys(categories).map((key) => {
        const category = this.convertCategory(categories[key]);
        result[key] = category;
      });
      return result;
    },

    store(category: string, data: Array<Dictionary>): void {
      this.dictionaries[category] = data;
    },

    storeAll(categories: Record<string, Array<Dictionary>>): void {
      assign(this.dictionaries, categories);
    },

    fetchByCategory(category: string): Promise<Array<Dictionary>> {
      return new Promise((resolve, reject) => {
        const items = this.getDictionary(category);
        if (!isEmpty(items)) {
          reject(items);
        } else {
          API.core
            .sysDictionary()
            .fetchByCategory(category)
            .then((response) => {
              const data = response.data;
              const items = this.convertCategory(data);
              this.store(category, items);
              resolve(items);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    fetchCategory(
      category: string,
      ...others: string[]
    ): Promise<Record<string, Array<Dictionary>>> {
      return new Promise((resolve, reject) => {
        const keys = this.getNotExist(category, ...others);
        if (isEmpty(keys)) {
          resolve(this.dictionaries);
        } else {
          API.core
            .sysDictionary()
            .fetchCategories(keys.join(','))
            .then((response) => {
              const data = response.data;
              const items = this.convertCategories(data);
              this.storeAll(items);
              resolve(items);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
  },

  persist: true,
});
