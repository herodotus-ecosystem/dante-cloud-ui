import type { App } from 'vue';

import HBpmnDesigner from './HBpmnDesigner.vue';

HBpmnDesigner.install = (app: App): void => {
  app.component(HBpmnDesigner.name, HBpmnDesigner);
};

export { HBpmnDesigner };
