import type { App } from 'vue';

import HBpmnDesigner from './HBpmnDesigner.vue';
import HBpmnViewer from './HBpmnViewer.vue';

HBpmnDesigner.install = (app: App): void => {
  app.component(HBpmnDesigner.name as string, HBpmnDesigner);
};

HBpmnViewer.install = (app: App): void => {
  app.component(HBpmnViewer.name as string, HBpmnViewer);
};

export { HBpmnDesigner, HBpmnViewer };
