import { defineStore } from 'pinia';

import type { BpmnDesignerResources } from '/@/declarations';

export const useResourceStore = defineStore('BpmnDesignerResources', {
  state: () => ({
    resources: {} as BpmnDesignerResources
  }),

  getters: {
    userService: state => state.resources.user(),
    groupService: state => state.resources.group(),
    deploymentService: state => state.resources.deployment(),
    dynamicFormService: state => state.resources.dynamicForm()
  },

  actions: {
    init(instance: BpmnDesignerResources): void {
      this.resources = instance;
    }
  }
});
