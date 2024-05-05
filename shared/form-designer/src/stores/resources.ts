import { defineStore } from 'pinia';

import type { FormDesignerResources } from '/@/declarations';

export const useFormResourceStore = defineStore('FormDesignerResources', {
  state: () => ({
    resources: {} as FormDesignerResources
  }),

  getters: {
    dynamicForm: state => state.resources.dynamicForm()
  },

  actions: {
    init(instance: FormDesignerResources): void {
      this.resources = instance;
    }
  }
});
