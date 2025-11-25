import type { App } from 'vue';

import './static/styles/index.scss';

import { HBpmnDesigner, HBpmnDiagramViewer, HBpmnCodePreviewer } from '@/components';

const components = [HBpmnDesigner, HBpmnDiagramViewer, HBpmnCodePreviewer];

const install = (app: App) => {
  components.map((component) => app.component(component.name as string, component));
};

export { HBpmnDesigner, HBpmnDiagramViewer, HBpmnCodePreviewer };

export * from './declarations';
export * from './lib/core';
export * from './lib/logic';
export * from './lib/utils';

export default { install };
