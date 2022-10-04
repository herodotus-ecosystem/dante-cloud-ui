import type { App } from 'vue';

import { HBpmnDesigner } from '/@/components';

export * from '/@/lib/declarations';
export * from '/@/lib/plugins';
export * from '/@/lib/utils';

const components = [HBpmnDesigner];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export default { install };
