import type { App } from 'vue';

import { HBpmnDesigner } from '/@/components';

const components = [HBpmnDesigner];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export * from './declarations';
export * from './lib';

export default { install };
