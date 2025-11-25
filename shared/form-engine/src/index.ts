import type { App } from 'vue';

import { HRendererEngine, HRendererForm } from './components';
import { QIcon, QList, QItem, QItemSection, QInput } from 'quasar';

const quasarComponents = [QIcon, QList, QItem, QItemSection, QInput];

const components = [HRendererEngine, HRendererForm];

const install = (app: App) => {
  components.map(component => app.component(component.name as string, component));
  quasarComponents.map(component => app.component(component.name as string, component));
};

export { HRendererEngine, HRendererForm };

export * from './declarations';
export * from './lib';

export default {
  install
};
