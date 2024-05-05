import type { App } from 'vue';

import { HDynamicForms } from './components';

const components = [HDynamicForms];

const install = (app: App) => {
  components.map(component => app.component(component.name as string, component));
};

export { HDynamicForms };

export * from './lib';
export * from './declarations';

export default {
  install
};
