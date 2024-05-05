import type { App } from 'vue';

import HBpmnDiagramViewer from './HBpmnDiagramViewer.vue';
import HBpmnCodePreviewer from './HBpmnCodePreviewer.vue';

HBpmnDiagramViewer.install = (app: App): void => {
  app.component(HBpmnDiagramViewer.name as string, HBpmnDiagramViewer);
};

HBpmnCodePreviewer.install = (app: App): void => {
  app.component(HBpmnCodePreviewer.name as string, HBpmnCodePreviewer);
};

export { HBpmnDiagramViewer, HBpmnCodePreviewer };
