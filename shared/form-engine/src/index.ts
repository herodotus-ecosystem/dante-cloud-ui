import type { App } from 'vue';

import { HRendererEngine, HRendererForm } from './components';

const components = [HRendererEngine, HRendererForm];

const install = (app: App) => {
  components.map(component => app.component(component.name, component));
};

export * from './declarations';
export * from './lib';

export { HRendererEngine, HRendererForm };

export default {
  install
};
