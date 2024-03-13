import type { App } from 'vue';

import { HBpmnDesigner, HBpmnViewer } from '/@/components';

const components = [HBpmnDesigner, HBpmnViewer];

const install = (app: App) => {
  components.map(component => app.component(component.name as string, component));
};

export * from './declarations';
export * from './lib';

export default { install };
